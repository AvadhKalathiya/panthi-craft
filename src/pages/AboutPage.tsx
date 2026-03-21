import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero.jpg";
import product1 from "@/assets/product-1.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const pillars = [
  { num: "01", title: "Handcrafted", text: "Every piece is made by hand with meticulous attention to detail, ensuring uniqueness in every stitch." },
  { num: "02", title: "Premium", text: "We select only the finest materials that meet our exacting standards for quality and durability." },
  { num: "03", title: "Indian Heritage", text: "Celebrating the rich tradition of Indian craftsmanship, modernized for today's discerning woman." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <img src={aboutHero} alt="About" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 text-center">
          <span className="eyebrow block mb-3">Our Story</span>
          <h1 className="font-serif text-display text-primary-foreground italic">
            Crafted with Love. Born in India.
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-[7.5rem] max-md:py-[4.5rem] px-[clamp(1.5rem,5vw,4rem)]">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="eyebrow block mb-4">About Us</span>
            <h2 className="font-serif text-h2 italic text-foreground mb-6">
              The Panthi First Choice Story
            </h2>
            <p className="font-serif italic text-xl text-gold mb-8 leading-snug">
              &ldquo;Every purse is more than a bag — it&rsquo;s a piece of art.&rdquo;
            </p>
            <div className="font-sans font-light text-charcoal leading-[1.9] space-y-4">
              <p>
                Panthi First Choice was born from a deep passion for Indian craftsmanship and a belief that luxury should be accessible to every woman. What started as a dream to celebrate handmade artistry has grown into a brand trusted by hundreds of women across Gujarat.
              </p>
              <p>
                We work directly with skilled artisans who pour their expertise into every stitch, every cut, and every detail. Our commitment to quality means we never compromise — from selecting premium materials to the final inspection of each finished piece.
              </p>
              <p>
                Our mission is simple: to bring the elegance of luxury handmade purses to the modern Indian woman, at a price that respects her intelligence. Every Panthi purse is a testament to what happens when tradition meets contemporary design.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="img-portrait">
              <img src={product1} alt="Artisan craftsmanship" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-[7.5rem] max-md:py-[4.5rem] px-[clamp(1.5rem,5vw,4rem)] bg-dark">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {pillars.map((p, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <span className="font-serif text-[6rem] font-light text-gold/30 leading-none block mb-4">
                {p.num}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-4">
                {p.title}
              </h3>
              <p className="font-sans font-light text-primary-foreground/65 leading-[1.8]">
                {p.text}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-cream">
        <ScrollReveal>
          <h2 className="font-serif text-h2 italic text-foreground mb-6">
            Start Your Collection Today
          </h2>
          <Link
            to="/collection"
            className="inline-block bg-gold text-primary-foreground font-sans font-semibold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-deep hover:-translate-y-0.5 transition-all"
          >
            Shop Collection
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
