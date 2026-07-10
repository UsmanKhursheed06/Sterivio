/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs      = require('fs');
const path    = require('path');
const { Pinecone } = require('@pinecone-database/pinecone');
const OpenAI  = require('openai').default;
const pdf     = require('pdf-parse');

// ── Config ────────────────────────────────────────────────────────────────────
function getEnvVal(key) {
  if (process.env[key]) return process.env[key];
  try {
    const envPath = path.join(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(new RegExp(`^${key}\\s*=\\s*["']?(.*?)["']?$`, 'm'));
      return match ? match[1] : null;
    }
  } catch (e) { /* ignore */ }
  return null;
}

const pineconeKey = getEnvVal('PINECONE_API_KEY');
const nvidiaKey   = getEnvVal('NVIDIA_API_KEY');
const nvidiaBase  = getEnvVal('NVIDIA_BASE_URL') || 'https://integrate.api.nvidia.com/v1';

if (!pineconeKey) { console.error('PINECONE_API_KEY missing'); process.exit(1); }
if (!nvidiaKey)   { console.error('NVIDIA_API_KEY missing');   process.exit(1); }

const pc     = new Pinecone({ apiKey: pineconeKey });
const nvidia = new OpenAI({ apiKey: nvidiaKey, baseURL: nvidiaBase });

const INDEX_NAME = 'sterivio-catalog';
const DIMENSION  = 1024;   // nvidia/nv-embedqa-e5-v5 dimension
const BATCH_SIZE = 50;     // NVIDIA NIM supports large batches

// ── Text helpers ──────────────────────────────────────────────────────────────
function chunkText(text, maxSize = 800, overlap = 150) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + maxSize, text.length);
    const chunk = text.substring(start, end).trim();
    if (chunk.length > 10) chunks.push(chunk);
    if (end === text.length) break;
    start += (maxSize - overlap);
  }
  return chunks;
}

async function parsePdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const pages = [];

  const options = {
    pagerender: async function(pageData) {
      const textContent = await pageData.getTextContent();
      let lastY, text = '';
      for (let item of textContent.items) {
        if (lastY == item.transform[5] || !lastY) {
          text += item.str;
        } else {
          text += '\n' + item.str;
        }
        lastY = item.transform[5];
      }
      pages.push({
        pageNumber: pageData.pageIndex + 1,
        text: text
      });
      return text;
    }
  };

  await pdf(dataBuffer, options);
  return pages;
}

// ── NVIDIA embed batch ─────────────────────────────────────────────────────────
async function embedBatch(texts) {
  const res = await nvidia.embeddings.create({
    model: 'nvidia/nv-embedqa-e5-v5',
    input: texts,
    encoding_format: 'float',
    input_type: 'passage',   // 'passage' for document chunks at index time
  });
  return res.data.map(d => d.embedding);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // --- Pinecone index setup ---
  console.log('Checking Pinecone index...');
  const { indexes = [] } = await pc.listIndexes();
  const existing = indexes.find(i => i.name === INDEX_NAME);

  if (existing && existing.dimension !== DIMENSION) {
    console.log(`Dimension mismatch (${existing.dimension} ≠ ${DIMENSION}). Deleting and recreating...`);
    await pc.deleteIndex(INDEX_NAME);
    await new Promise(r => setTimeout(r, 15000));
  } else if (existing) {
    console.log(`Index exists with correct dimension ${DIMENSION}. Proceeding to re-upsert.`);
  }

  if (!existing || existing.dimension !== DIMENSION) {
    console.log(`Creating index "${INDEX_NAME}" (dim=${DIMENSION}, metric=cosine)...`);
    await pc.createIndex({
      name: INDEX_NAME,
      dimension: DIMENSION,
      metric: 'cosine',
      spec: { serverless: { cloud: 'aws', region: 'us-east-1' } }
    });
    console.log('Waiting 20s for index to initialise...');
    await new Promise(r => setTimeout(r, 20000));
  }

  const index = pc.index(INDEX_NAME);

  // --- PDF parsing ---
  const pdfsDir  = path.join(__dirname, '../../public/pdfs');
  const pdfFiles = [
    'Grooming Catalog 2 (1)-1 (1).pdf',
    'veterinary main file (1)-2.pdf'
  ];

  let allChunks = [];
  for (const filename of pdfFiles) {
    const filePath = path.join(pdfsDir, filename);
    if (!fs.existsSync(filePath)) { console.warn(`Not found: ${filePath}`); continue; }
    console.log(`Parsing ${filename}...`);
    const pages = await parsePdf(filePath);
    console.log(`  → ${pages.length} pages`);
    for (const page of pages) {
      chunkText(page.text).forEach((txt, idx) => {
        allChunks.push({
          id: `${filename.replace(/[^a-zA-Z0-9]/g, '_')}_p${page.pageNumber}_c${idx}`,
          text: txt,
          metadata: { source: filename, pageNumber: page.pageNumber, chunkIndex: idx, text: txt }
        });
      });
    }
  }
  console.log(`Total chunks: ${allChunks.length}`);

  // --- Embed + upsert in batches ---
  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(allChunks.length / BATCH_SIZE);
    console.log(`Batch ${batchNum}/${totalBatches}: embedding ${batch.length} chunks...`);

    const embeddings = await embedBatch(batch.map(c => c.text));

    const records = batch.map((chunk, j) => ({
      id:       chunk.id,
      values:   embeddings[j],
      metadata: chunk.metadata
    }));

    await index.upsert({ records });
    console.log(`  ✓ Upserted ${records.length} records`);

    // Small pause between batches to be polite to the API
    if (i + BATCH_SIZE < allChunks.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\n✅ Indexing complete! Pinecone index is ready.');
}

main().catch(e => { console.error('Fatal error:', e); process.exit(1); });
