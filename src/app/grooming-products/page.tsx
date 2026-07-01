'use client';

import { motion } from "framer-motion";
import { Download, ExternalLink, Scissors, Zap, Brush, Grip, Footprints, Eye, Droplets, Bath, Shield, Table, Smile, ShirtIcon, Wrench, Package, type LucideIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GroomingCategory {
  id: number;
  title: string;
  icon: LucideIcon;
  subcategories: string[];
  catalogUrl: string;
}

const groomingCategories: GroomingCategory[] = [
  {
    id: 1,
    title: "Grooming Shears & Scissors",
    icon: Scissors,
    subcategories: [
      "Straight Grooming Shears",
      "Curved Grooming Shears",
      "Thinning & Blending Shears",
      "Chunkers & Specialty Shears",
      "Safety & Detail Scissors"
    ],
    catalogUrl: "https://drive.google.com/file/d/16EvcSfA0hc2g3rwLL4NfbyUR-Chs5_dS/view?usp=sharing"
  },
  {
    id: 2,
    title: "Clippers & Trimming Systems",
    icon: Zap,
    subcategories: [
      "Professional Electric Clippers",
      "Mini & Detail Trimmers",
      "Detachable Clipper Blades",
      "Specialty Blades & Guards",
      "Clipper Maintenance"
    ],
    catalogUrl: "https://drive.google.com/file/d/1uoteDfMAFToq4VzCvs4W3gjMQIyLagSL/view?usp=sharing"
  },
  {
    id: 3,
    title: "Brushes & Coat Tools",
    icon: Brush,
    subcategories: [
      "Slicker & Pin Brushes",
      "Bristle & Combination Brushes",
      "Undercoat & Shedding Tools",
      "Specialty Coat Tools"
    ],
    catalogUrl: "https://drive.google.com/file/d/119QeEwMa7M8J6rRxVrrlKcb3j3xo66ia/view?usp=sharing"
  },
  {
    id: 4,
    title: "Combs & Dematting Tools",
    icon: Grip,
    subcategories: [
      "Grooming Combs",
      "Flea & Specialty Combs",
      "Dematting Tools",
      "Hand-Stripping & Heavy Undercoat Tools"
    ],
    catalogUrl: "https://drive.google.com/file/d/1oQGjnlS0vqe38rp1oWW8qz9d8YH1uBVJ/view?usp=sharing"
  },
  {
    id: 5,
    title: "Nail Care Instruments",
    icon: Footprints,
    subcategories: [
      "Nail Clippers",
      "Nail Grinding & Finishing",
      "Hemostasis & Nail Safety"
    ],
    catalogUrl: "https://drive.google.com/file/d/10MV1h8w_ipNuB21dYt4x5wml6mTsOzwY/view?usp=sharing"
  },
  {
    id: 6,
    title: "Ear, Eye & Hygiene Tools",
    icon: Eye,
    subcategories: [
      "Ear Care Instruments",
      "Eye & Facial Hygiene",
      "General Hygiene Tools",
      "Optional Consumables"
    ],
    catalogUrl: "https://drive.google.com/file/d/1JBwW7NsPhMvIfMK40FVQNnIGBu_hCSyW/view?usp=sharing"
  },
  {
    id: 7,
    title: "Bathing & Drying Accessories",
    icon: Droplets,
    subcategories: [
      "Bathing Tools",
      "Drying Equipment",
      "Water Control Accessories"
    ],
    catalogUrl: "https://drive.google.com/file/d/1qa00Xpg9hVAJhZgGzWj_0gR2eEtdTr-g/view?usp=sharing"
  },
  {
    id: 8,
    title: "Bathing Stations & Systems",
    icon: Bath,
    subcategories: [
      "Professional Grooming Tubs"
    ],
    catalogUrl: "https://drive.google.com/file/d/1jf5HIYa_HHNV-2tUGtnYPIdBhvM2_QBq/view?usp=sharing"
  },
  {
    id: 9,
    title: "Grooming Restraint & Safety",
    icon: Shield,
    subcategories: [
      "Grooming Loops & Leads",
      "Table-Mounted Restraint Systems",
      "Muzzles & Harness Restraints"
    ],
    catalogUrl: "https://drive.google.com/file/d/1qkUUc-K31TjwRJFt4NoXrnwWhUh6tlKL/view?usp=sharing"
  },
  {
    id: 10,
    title: "Grooming Tables & Support",
    icon: Table,
    subcategories: [
      "Grooming Tables",
      "Table Accessories"
    ],
    catalogUrl: "https://drive.google.com/file/d/1JcqpidV5TxqYwD3AEU8wNwxNOKbsVSci/view?usp=sharing"
  },
  {
    id: 11,
    title: "Dental & Oral Hygiene (Grooming Level)",
    icon: Smile,
    subcategories: [
      "Oral Care Instruments"
    ],
    catalogUrl: "https://drive.google.com/file/d/1ODswMEj4A2EU3GwGaYG4aL6wDa8vI5Ta/view?usp=sharing"
  },
  {
    id: 12,
    title: "Safety, Apparel & Extras",
    icon: ShirtIcon,
    subcategories: [
      "Groomer Safety & Apparel",
      "Parasite & Safety Tools"
    ],
    catalogUrl: "https://drive.google.com/file/d/1a1UFiOu8LaUAWzIXY4GOmJYWlNblbFPo/view?usp=sharing"
  },
  {
    id: 13,
    title: "Accessories & Tool Maintenance",
    icon: Wrench,
    subcategories: [
      "Tool Care & Maintenance",
      "Storage & Organization",
      "Disinfection & Support"
    ],
    catalogUrl: "https://drive.google.com/file/d/1FN9E9jxHpQM9e_YfGqO0POu_6Qt6JzlL/view?usp=sharing"
  },
  {
    id: 14,
    title: "Grooming Kits",
    icon: Package,
    subcategories: [
      "Core Grooming Kits",
      "Specialty Grooming Kits",
      "Procedure-Specific Kits"
    ],
    catalogUrl: "https://drive.google.com/file/d/1LTBYW04BDv4_iq8hOI8ZA63EWDmEWUmG/view?usp=sharing"
  }
];

const CATALOG_PDF_URL = "https://drive.google.com/file/d/1_bWjxw76NpqFDmHm-VoLRR-2YwcX2-O-/view?usp=sharing";
const VET_PRODUCTS_PATH = "/vet-products";

const GroomingProductsPage = memo(function GroomingProductsPage() {
  const router = useRouter();
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);

  const handleCategoryClick = (catalogUrl: string) => {
    window.open(catalogUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadCatalog = () => {
    window.open(CATALOG_PDF_URL, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    router.prefetch(VET_PRODUCTS_PATH);
  }, [router]);

  const handleSwitchCategory = (targetPath: string) => {
    if (isSwitchingCategory) {
      return;
    }

    router.prefetch(targetPath);
    setIsSwitchingCategory(true);
    setTimeout(() => {
      router.push(targetPath);
    }, 220);
  };

  return (
    <motion.main
      animate={isSwitchingCategory ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full bg-white min-h-screen pt-20 md:pt-20"
    >
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-cyan-50 to-white py-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={VET_PRODUCTS_PATH}
                onMouseEnter={() => router.prefetch(VET_PRODUCTS_PATH)}
                onClick={(event) => {
                  event.preventDefault();
                  handleSwitchCategory(VET_PRODUCTS_PATH);
                }}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide min-w-72"
              >
                View Veterinary Products
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              Grooming Products
            </h1>
            <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional-grade grooming instruments and systems for exceptional pet care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative w-full bg-white py-16">
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {groomingCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * index }}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-cyan-500 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Header with Icon and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-tight mb-2">
                        {category.title}
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryClick(category.catalogUrl)}
                      className="flex-shrink-0 ml-3 p-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      aria-label={`View ${category.title} catalog`}
                      title={`View ${category.title} catalog`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Subcategories List */}
                  <ul className="space-y-1.5 mb-5 flex-grow">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <li 
                        key={subIndex}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span className="text-cyan-500 mr-2 mt-0.5">•</span>
                        <span className="flex-1">{subcategory}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View Catalog Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(category.catalogUrl)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold text-sm rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-2"
                  >
                    <span>View Catalog</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-3 bg-gray-100 border-2 border-gray-200 rounded-full">
              <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                ✨ {groomingCategories.length} Complete Product Categories
              </p>
            </div>
          </motion.div>

          {/* CTA Button - Centered at the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadCatalog}
              className="px-10 py-5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide flex items-center gap-3"
            >
              <Download className="w-6 h-6" />
              <span>Download Complete Catalog</span>
            </motion.button>
          </motion.div>

          {/* Bottom decorative text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-6 text-sm text-gray-600 uppercase tracking-wide font-semibold"
          >
            Explore our complete range of professional grooming instruments
          </motion.p>
        </div>
      </section>
    </motion.main>
  );
});

export default GroomingProductsPage;
