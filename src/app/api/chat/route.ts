import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// ── Clients ──────────────────────────────────────────────────────────────────
const pineconeKey = process.env.PINECONE_API_KEY  || '';
const nvidiaKey   = process.env.NVIDIA_API_KEY    || '';
const nvidiaBase  = process.env.NVIDIA_BASE_URL   || 'https://integrate.api.nvidia.com/v1';
const geminiKey   = process.env.GEMINI_API_KEY    || '';
const geminiBase  = 'https://generativelanguage.googleapis.com/v1beta/openai/';

const pc     = new Pinecone({ apiKey: pineconeKey });

// Clients for embeddings and chat completions
const nvidia = new OpenAI({ apiKey: nvidiaKey, baseURL: nvidiaBase });
const gemini = new OpenAI({ apiKey: geminiKey, baseURL: geminiBase });

const INDEX_NAME = 'sterivio-catalog';

// Model stack ordered by priority (Gemini first for extreme speed, NVIDIA Llama as fallback)
const CHAT_MODELS = [
  { client: gemini, name: 'gemini-3.1-flash-lite' },
  { client: gemini, name: 'gemini-3.5-flash' },
  { client: gemini, name: 'gemini-2.5-flash' },
  { client: nvidia, name: 'meta/llama-3.1-8b-instruct' },
  { client: nvidia, name: 'meta/llama-3.3-70b-instruct' },
];

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as { messages?: ChatMessage[] };
    if (!messages?.length) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // Last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) {
      return NextResponse.json({ error: 'No user message found' }, { status: 400 });
    }
    const userQuery: string = lastUserMsg.content;

    // ── STEP 1: Embed query via NVIDIA NIM (~600ms) ───────────────────────────
    const embedRes = await nvidia.embeddings.create({
      model: 'nvidia/nv-embedqa-e5-v5',
      input: userQuery,
      encoding_format: 'float',
      // @ts-expect-error — NVIDIA-specific parameter
      input_type: 'query',
    });
    const queryVector = embedRes.data[0].embedding;

    // ── STEP 2: Pinecone semantic search ──────────────────────────────────────
    const index = pc.index(INDEX_NAME);
    const pineconeRes = await index.query({
      vector: queryVector,
      topK: 3,
      includeMetadata: true,
    });

    // ── STEP 3: Build concise context (max 500 chars per chunk) ───────────────
    const context = (pineconeRes.matches || [])
      .map((m) => {
        const meta = m.metadata as { text?: string; source?: string; pageNumber?: number };
        const src  = meta.source?.includes('Grooming') ? 'Grooming Catalog' : 'Veterinary Catalog';
        return `[${src}, Page ${meta.pageNumber ?? '?'}]\n${(meta.text || '').substring(0, 500)}`;
      })
      .join('\n---\n');

    // ── STEP 4: Build messages ────────────────────────────────────────────────
    const systemMessage = {
      role: 'system' as const,
      content:
        `You are Sterivio's AI catalog assistant for precision surgical, veterinary and grooming instruments. ` +
        `Answer ONLY from the catalog context. Cite catalog name + page for each product. ` +
        `If not found say "I couldn't find that in our catalogs." Be concise.\n\n` +
        `CATALOG CONTEXT:\n${context}`,
    };

    // Valid chat history — must not start with assistant
    const chatHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    for (const m of messages.slice(0, -1)) {
      if (m.role === 'user') {
        chatHistory.push({ role: 'user', content: m.content });
      } else if (m.role === 'assistant' && chatHistory.length > 0) {
        chatHistory.push({ role: 'assistant', content: m.content });
      }
    }

    const openAIMessages = [
      systemMessage,
      ...chatHistory,
      { role: 'user' as const, content: userQuery },
    ];

    // ── STEP 5: Try models in order ───────────────────────────────────────────
    let lastError: unknown = null;

    for (const model of CHAT_MODELS) {
      try {
        const chatStream = await model.client.chat.completions.create({
          model: model.name,
          messages: openAIMessages,
          temperature: 0.4,
          max_tokens: 800,
          stream: true,
        });

        console.log(`[chat] Streaming from: ${model.name}`);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of chatStream) {
                const text = chunk.choices[0]?.delta?.content || '';
                if (text) controller.enqueue(encoder.encode(text));
              }
            } catch {
              controller.enqueue(encoder.encode('\n[Stream error. Please try again.]'));
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'X-Model-Used': model.name,
          },
        });

      } catch (err) {
        const status = (err as { status?: number })?.status;
        if (status === 429 || status === 503 || status === 404 || status === 400) {
          console.warn(`[chat] ${model.name} failed (${status}), trying next…`);
          lastError = err;
          continue;
        }
        throw err;
      }
    }

    const errMsg = lastError instanceof Error ? lastError.message : String(lastError);
    console.error('[chat] All models failed:', errMsg);
    return NextResponse.json(
      { error: 'Service temporarily unavailable. Please try again shortly.' },
      { status: 503 }
    );


  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('[chat] Unhandled error:', errMsg);
    return NextResponse.json(
      { error: errMsg || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
