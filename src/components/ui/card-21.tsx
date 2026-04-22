import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { ArrowRight } from "lucide-react";

// Define the props for the DestinationCard component
interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag: string;
  stats: string;
  href: string;
  themeColor: string; // e.g., "150 50% 25%" for a deep green
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  ({ className, imageUrl, location, flag, stats, href, themeColor, ...props }, ref) => {
    const safeImageUrl = encodeURI(imageUrl);
    const themeStyle = { "--theme-color": themeColor } as React.CSSProperties & Record<"--theme-color", string>;

    return (
      // The 'group' class enables hover effects on child elements
      <div
        ref={ref}
        style={themeStyle}
        className={cn("group w-full h-full", className)}
        {...props}
      >
        <Link
          href={href}
          className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out 
                     group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_-12px_hsl(var(--theme-color)/0.45)]"
          aria-label={`Explore details for ${location}`}
          style={{
             boxShadow: `0 0 24px -12px hsl(var(--theme-color) / 0.35)`
          }}
        >
          {/* Optimized image for faster decode and transfer */}
          <Image
            src={safeImageUrl}
            alt={location}
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            quality={65}
            loading="lazy"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />

          {/* Themed Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.9), hsl(var(--theme-color) / 0.6) 30%, transparent 60%)`,
            }}
          />
          
          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-6 text-white">
            <h3 className="text-3xl font-bold tracking-tight">
              {location} <span className="text-2xl ml-1">{flag}</span>
            </h3>
            <p className="text-sm text-white/80 mt-1 font-medium">{stats}</p>

            {/* Explore Button */}
            <div className="mt-8 flex items-center justify-between bg-[hsl(var(--theme-color)/0.22)] backdrop-blur-sm border border-[hsl(var(--theme-color)/0.3)] 
                           rounded-lg px-4 py-3 
                           transition-all duration-300 
                           group-hover:bg-[hsl(var(--theme-color)/0.4)] group-hover:border-[hsl(var(--theme-color)/0.5)]">
              <span className="text-sm font-semibold tracking-wide">Explore Now</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    );
  }
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
