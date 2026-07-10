'use client';

import { motion } from "framer-motion";
import { Download, ExternalLink, Scissors, Activity, Smile, Wrench, Zap, Eye, Footprints, Shield, Stethoscope, Wind, Lock, Package, type LucideIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VetCategory {
  id: number;
  title: string;
  icon: LucideIcon;
  subcategories: string[];
  catalogUrl: string;
}

const vetCategories: VetCategory[] = [
  {
    id: 1,
    title: "General Surgery",
    icon: Scissors,
    subcategories: [
      "Scalpels & Blades",
      "Surgical Scissors",
      "Hemostatic Forceps",
      "Tissue Forceps",
      "Needle Holders",
      "Retractors",
      "Clamps, Graspers & Accessories",
      "Minor Instruments",
      "Tungsten Carbide Instruments",
    ],
    catalogUrl: "https://drive.google.com/file/d/1Vfm_i3PxzdXGGdKYCElD53c6eAWyS5ZF/view?usp=sharing",
  },
  {
    id: 2,
    title: "Spay / Soft Tissue Surgery",
    icon: Activity,
    subcategories: [
      "Essential Instruments",
      "Soft Tissue Handling",
      "Vascular & Specialty Instruments",
      "Self-Retaining Retractors",
      "Major Surgical Retraction",
      "Specialty Soft Tissue Tools",
    ],
    catalogUrl: "https://drive.google.com/file/d/196tS5xOCmCKj3Te8TLLbUWZdJEE7at3o/view?usp=sharing",
  },
  {
    id: 3,
    title: "Dental Instruments",
    icon: Smile,
    subcategories: [
      "Diagnostic Instruments",
      "Scaling & Curettage",
      "Elevators",
      "Extraction & Luxation",
      "Auxiliary Instruments",
      "Rotary / Prophy",
      "Operative & Endodontic",
    ],
    catalogUrl: "https://drive.google.com/file/d/1X4LnDb-t05yQw1y6DZudi7s7atdDSmxF/view?usp=sharing",
  },
  {
    id: 4,
    title: "Orthopedic Instruments",
    icon: Wrench,
    subcategories: [
      "Elevators & Retractors",
      "Cutting & Shaping Instruments",
      "Clamps & Reduction Tools",
      "Bone Handling & Cutting",
      "Wire Instruments",
      "Measurement & Fixation",
      "Drilling & Osteosynthesis",
      "TPLO / TTA Systems",
    ],
    catalogUrl: "https://drive.google.com/file/d/1B9PQQgpdknKjtDR2ZV24sBfNNuaKRdxv/view?usp=sharing",
  },
  {
    id: 5,
    title: "Neurological / Microsurgery",
    icon: Zap,
    subcategories: [
      "Micro Scissors",
      "Micro Forceps",
      "Micro Needle Holders",
      "Micro Suction",
      "Neuro Retractors & Systems",
      "Hooks & Dissectors",
    ],
    catalogUrl: "https://drive.google.com/file/d/12z3iKUtwuAIcqjmZ1GVp9bkr25D2KuZe/view?usp=sharing",
  },
  {
    id: 6,
    title: "Ophthalmic Instruments",
    icon: Eye,
    subcategories: [
      "Retractors & Specula",
      "Ophthalmic Scissors",
      "Knives & Corneal Instruments",
      "Ophthalmic Forceps",
      "Probes & Cannulas",
    ],
    catalogUrl: "https://drive.google.com/file/d/1bQHQ3S-pKvFjQs3Nwmopu4XCQgRXt-Yv/view?usp=sharing",
  },
  {
    id: 7,
    title: "Large Animal Instruments",
    icon: Footprints,
    subcategories: [
      "Obstetrical",
      "Fetotomy",
      "Gynecological",
      "Castration",
      "Hoof Care",
      "Field & Farm Tools",
    ],
    catalogUrl: "https://drive.google.com/file/d/1JcI4XuAhen36XPvUDUO-mSyygJy2Pp2p/view?usp=sharing",
  },
  {
    id: 8,
    title: "Sterilization & Instrument Care",
    icon: Shield,
    subcategories: [
      "Instrument Organization & Storage",
      "Cleaning & Decontamination",
      "Packaging & Indicators",
      "Sterilization Accessories",
    ],
    catalogUrl: "https://drive.google.com/file/d/1H5CkSjPrAfHH0s1xZSUcmfMl7dTUv2ac/view?usp=sharing",
  },
  {
    id: 9,
    title: "Diagnostic Instruments",
    icon: Stethoscope,
    subcategories: [
      "General Examination",
      "Otic & Ophthalmic Diagnostics",
      "Monitoring & Vital Signs",
      "Point-of-Care Testing",
      "Clinic Utility Instruments",
    ],
    catalogUrl: "https://drive.google.com/file/d/1ARRtJfxHPNqV_OG5q32QqKV3alU3Fjtr/view?usp=sharing",
  },
  {
    id: 10,
    title: "Anesthesia & Airway Management",
    icon: Wind,
    subcategories: [
      "Airway Management",
      "Breathing Circuits & Accessories",
      "Monitoring & Delivery",
      "Injection & Infusion Support",
      "Anesthesia Accessories",
    ],
    catalogUrl: "https://drive.google.com/file/d/1f5APdHCMtIfmlI55YsXVW4_QZcL4m4wm/view?usp=sharing",
  },
  {
    id: 11,
    title: "Patient Restraint & Positioning",
    icon: Lock,
    subcategories: [
      "Patient Restraint",
      "Recovery & Protective Restraint",
      "Table & Positioning Support",
    ],
    catalogUrl: "https://drive.google.com/file/d/1jALuOwu5YGZUey-gUYBRiHALttWH9mP-/view?usp=sharing",
  },
  {
    id: 12,
    title: "Specialty Kits",
    icon: Package,
    subcategories: [
      "Surgical Kits",
      "Spay / Neuter Kits",
      "Dental Kits",
      "Orthopedic Kits",
      "Large Animal & Field Kits",
      "Starter & Training Kits",
    ],
    catalogUrl: "https://drive.google.com/file/d/18sWa6EdMT4We3Lkjiq8PA-GetxTQDm51/view?usp=sharing",
  },
];

const CATALOG_PDF_URL = "https://drive.google.com/file/d/1fqifzgvKpocvD6P3g7ZyqPo5iKm5xXEV/view?usp=sharing";
const GROOMING_PRODUCTS_PATH = "/grooming-products";

const VetProductsClient = memo(function VetProductsClient() {
  const router = useRouter();
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);

  const handleCategoryClick = (catalogUrl: string) => {
    window.open(catalogUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadCatalog = () => {
    window.open(CATALOG_PDF_URL, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    router.prefetch(GROOMING_PRODUCTS_PATH);
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
      animate={isSwitchingCategory ? { x: "100%", opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full bg-white min-h-screen pt-24 md:pt-20"
    >
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-blue-50 to-white py-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={GROOMING_PRODUCTS_PATH}
                onMouseEnter={() => router.prefetch(GROOMING_PRODUCTS_PATH)}
                onClick={(event) => {
                  event.preventDefault();
                  handleSwitchCategory(GROOMING_PRODUCTS_PATH);
                }}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide min-w-72"
              >
                View Grooming Products
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              Veterinary Products
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional veterinary instruments and medical supplies for comprehensive animal healthcare
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative w-full bg-white py-16">
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {vetCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * index }}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
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
                      className="flex-shrink-0 ml-3 p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
                        <span className="text-blue-500 mr-2 mt-0.5">•</span>
                        <span className="flex-1">{subcategory}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View Catalog Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(category.catalogUrl)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-2"
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
                ✨ {vetCategories.length} Complete Product Categories
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
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
              className="px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide flex items-center gap-3"
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
            Professional veterinary instruments for exceptional animal care
          </motion.p>
        </div>
      </section>
    </motion.main>
  );
});

export default VetProductsClient;
