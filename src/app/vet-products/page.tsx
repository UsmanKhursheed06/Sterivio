import type { Metadata } from "next";
import VetProductsClient from "./VetProductsClient";

export const metadata: Metadata = {
  title: "Veterinary Surgical Instruments & Tools | Sterivio",
  description: "Explore Sterivio's professional veterinary instruments catalog. Premium quality diagnostic, spay/neuter, dental, orthopedic, ophthalmic, and large animal tools.",
};

export default function Page() {
  return <VetProductsClient />;
}
