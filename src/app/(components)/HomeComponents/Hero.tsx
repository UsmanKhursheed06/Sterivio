'use client';

import Image from "next/image";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";
import { CheckCircle, ClipboardCheck, Globe } from "lucide-react";

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/videos/Hailuo.mp4"
      bgImageSrc="/images/bg-vid2.png"
      textBlend={false}
      title="Precision-Crafted Instruments, Delivered Globally"
      scrollToExpand="Scroll to explore"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome Section */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black">
            Welcome to Sterivio
          </h2>
        </div>

        {/* Features Grid with Glowing Effect */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4">
          <GridItem
            area="md:[grid-area:1/1/2/5]"
            icon={<CheckCircle className="h-4 w-4" />}
            title="Quality Engineering"
            description="Crafted from medical-grade stainless steel, Sterivio's veterinary and grooming instruments deliver precise performance and long-term durability trusted by professionals worldwide."
          />
          <GridItem
            area="md:[grid-area:1/5/2/9]"
            icon={<ClipboardCheck className="h-4 w-4" />}
            title="Precision Assurance"
            description="Each instrument undergoes a multi-stage inspection and quality-control process to ensure accuracy, balance, and consistency before shipment."
          />
          <GridItem
            area="md:[grid-area:1/9/2/13]"
            icon={<Globe className="h-4 w-4" />}
            title="Global Fulfillment"
            description="With U.S.-based distribution and worldwide export capability, Sterivio guarantees reliable delivery and compliance for clinics, hospitals, and grooming facilities."
          />
        </ul>
      </div>
    </ScrollExpandMedia>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[10rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
