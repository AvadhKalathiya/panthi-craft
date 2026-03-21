import { openInstagramDM } from "@/lib/products";
import { toast } from "sonner";
import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  const handleOrder = () => {
    openInstagramDM();
    toast("✓ Message copied! Paste it in Instagram DM");
  };

  return (
    <section className="py-[7.5rem] max-md:py-[4.5rem] px-6 bg-dark text-center">
      <ScrollReveal className="max-w-[500px] mx-auto">
        <span className="eyebrow block mb-4">Order Now</span>
        <h2 className="font-serif text-h2 italic text-primary-foreground mb-6">
          Found Your Perfect Purse?
        </h2>
        <p className="font-sans font-light text-primary-foreground/70 text-lg leading-relaxed mb-8">
          Order directly through Instagram DM. Fast, easy, and personal.
        </p>
        <button
          onClick={handleOrder}
          className="bg-gold text-primary-foreground font-sans font-semibold text-sm uppercase tracking-[0.15em] px-12 py-4 hover:bg-gold-deep hover:-translate-y-0.5 transition-all"
        >
          Order on Instagram
        </button>
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-primary-foreground/60 font-sans text-sm font-light">
          <span>📦 Free shipping in Gujarat</span>
          <span>🤝 Personal service via DM</span>
          <span>✅ 100% handmade</span>
          <span>🇮🇳 Made in India</span>
        </div>
      </ScrollReveal>
    </section>
  );
}
