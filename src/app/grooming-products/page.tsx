import type { Metadata } from "next";
import GroomingProductsClient from "./GroomingProductsClient";

export const metadata: Metadata = {
  title: "Professional Grooming Instruments & Tools | Sterivio",
  description: "Browse Sterivio's complete grooming instruments catalog. Premium shears, electric clippers, brushes, combs, dematting tools, nail care, and bathing accessories.",
};

export default function Page() {
  return <GroomingProductsClient />;
}
