import { Link } from "react-router-dom";
import quoteBg from "@/assets/quote-bg.jpg";
import ScrollReveal from "./ScrollReveal";

export default function QuoteBanner() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${quoteBg})` }}
    >
      <div className="absolute inset-0 bg-foreground/55" />
      <ScrollReveal className="relative z-10 text-center max-w-[700px] mx-auto px-6">
        <span className="font-serif text-[8rem] text-gold/40 leading-none select-none block -mb-12">
          &ldquo;
        </span>
        <p className="font-serif italic font-light text-h2 text-primary-foreground text-center leading-snug">
          Every purse tells a story of craft and elegance.
        </p>
        <span className="font-sans font-light text-sm tracking-[0.2em] text-primary-foreground/70 mt-6 block">
          — Panthi First Choice
        </span>
        <Link
          to="/collection"
          className="inline-block mt-10 border-[1.5px] border-primary-foreground text-primary-foreground font-sans text-xs font-medium uppercase tracking-[0.15em] px-8 py-3 hover:bg-primary-foreground hover:text-foreground transition-all"
        >
          Explore Collection
        </Link>
      </ScrollReveal>
    </section>
  );
}
