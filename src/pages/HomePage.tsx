import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedCollection from "@/components/FeaturedCollection";
import WhyChoose from "@/components/WhyChoose";
import QuoteBanner from "@/components/QuoteBanner";
import Reviews from "@/components/Reviews";
import InstagramGallery from "@/components/InstagramGallery";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollection />
      <WhyChoose />
      <QuoteBanner />
      <Reviews />
      <InstagramGallery />
      <FinalCTA />
    </>
  );
}
