import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Problem } from "@/components/sections/Problem";
import { SplitSection } from "@/components/sections/SplitSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureTabs } from "@/components/sections/FeatureTabs";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Testimonials } from "@/components/sections/Testimonials";
import { Security } from "@/components/sections/Security";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BlogPreview } from "@/components/sections/BlogPreview";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: get paid from anywhere, keep more of it` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Problem />
      <SplitSection />
      <HowItWorks />
      <FeatureTabs />
      <WhoItsFor />
      <Testimonials />
      <Security />
      <PricingPreview />
      <BlogPreview index={9} />
      <FAQ index={10} />
      <FinalCTA index={11} />
    </>
  );
}
