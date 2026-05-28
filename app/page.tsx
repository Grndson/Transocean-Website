import Hero from "@/components/Hero";
import { BrandsBar, ClassificationSocieties } from "@/components/Brands";
import ServicesOverview from "@/components/ServicesOverview";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";

export const revalidate = 0;

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandsBar />
      <ServicesOverview />
      <WhyUs />
      <ClassificationSocieties />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
