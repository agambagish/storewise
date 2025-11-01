import { BrowseByCategory } from "@/modules/home/ui/components/browse-by-category";
import { CTASection } from "@/modules/home/ui/components/cta-section";
import { Hero } from "@/modules/home/ui/components/hero";

export default function () {
  return (
    <>
      <Hero />
      <BrowseByCategory />
      <CTASection />
    </>
  );
}
