import "./globals.css";
import Navbar from "./(components)/NavigationComponents/navbar";
import Footer from "./(components)/NavigationComponents/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Sterivio - Precision Surgical Instruments</title>
        <meta
          name="description"
          content="ISO, CE Certified Manufacturer of High-Quality Surgical Instruments. Explore Our Extensive Range of Precision Tools for Medical Professionals Worldwide."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
