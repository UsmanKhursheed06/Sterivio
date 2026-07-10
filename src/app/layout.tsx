import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./(components)/NavigationComponents/navbar";
import Footer from "./(components)/NavigationComponents/footer";
import LenisProvider from "@/components/providers/LenisProvider";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

export const metadata: Metadata = {
  title: "Sterivio - Precision Surgical Instruments",
  description: "ISO, CE Certified Manufacturer of High-Quality Surgical Instruments. Explore Our Extensive Range of Precision Tools for Medical Professionals Worldwide.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
          <ChatbotWidget />
        </LenisProvider>
      </body>
    </html>
  );
}
