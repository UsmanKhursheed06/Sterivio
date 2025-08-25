import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/back3.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="ml-15 relative z-10 flex h-full flex-col items-center md:items-start justify-center text-center md:text-left text-white px-6">
        <h1 className="mt-10 text-3xl sm:text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Precision-Crafted Surgical Instruments, Delivered Globally
        </h1>

        <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-200">
          ISO, CE Certified Manufacturer of High-Quality Surgical Instruments.
          Explore Our Extensive Range of Precision Tools for Medical Professionals Worldwide.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
          <button className="rounded-3xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition">
            View Catalog
          </button>
          <button className="rounded-3xl border border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition">
            Request a Quote
          </button>
        </div>

        {/* Icons Row */}
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/iso.png"
              alt="Certified Quality"
              width={50}
              height={50}
              className="mb-2"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/fda2.png"
              alt="Global Reach"
              width={50}
              height={50}
              className="mb-2"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/gmp.png"
              alt="In-House Production"
              width={50}
              height={50}
              className="mb-2"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/ce.png"
              alt="Trusted Worldwide"
              width={50}
              height={50}
              className="mb-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
