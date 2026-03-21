import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reviews = [
  {
    text: "The quality of this purse is absolutely amazing. The stitching is perfect and it looks even better in person! I get compliments every time I carry it.",
    name: "Priya S.",
    location: "Surat",
  },
  {
    text: "I ordered through Instagram and received it in just 2 days. The packaging was so beautiful, felt like opening a luxury gift. Will definitely order again!",
    name: "Meera R.",
    location: "Vadodara",
  },
  {
    text: "So happy with my purchase! The design is unique and the handmade quality is visible in every single detail. Worth every rupee.",
    name: "Anjali P.",
    location: "Ahmedabad",
  },
  {
    text: "Best Indian handmade purse brand I've found online. The craftsmanship is outstanding and customer service through Instagram is excellent!",
    name: "Ritu K.",
    location: "Rajkot",
  },
  {
    text: "Gifted this to my mother and she absolutely loved it. The quality feels premium and the design is elegant. Highly recommend!",
    name: "Sneha M.",
    location: "Surat",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 3 : i - 1));
  const next = () => setIndex((i) => (i >= reviews.length - 3 ? 0 : i + 1));

  return (
    <section className="py-[7.5rem] max-md:py-[4.5rem] px-[clamp(1.5rem,5vw,4rem)] bg-blush">
      <div className="max-w-[1340px] mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="eyebrow block mb-4">Testimonials</span>
          <h2 className="font-serif text-h2 italic text-foreground mb-3">
            Loved by Our Customers
          </h2>
          <p className="font-sans font-light text-muted text-sm">
            Real reviews from real customers across Gujarat
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="font-serif text-[4rem] text-gold leading-none">4.9</span>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <span className="font-sans text-xs text-muted">Based on 200+ orders</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="min-w-[calc(33.333%-1rem)] max-lg:min-w-[calc(50%-0.75rem)] max-sm:min-w-full bg-card p-8 flex-shrink-0"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-serif italic text-charcoal leading-[1.8] text-lg mb-6">
                    <span className="text-gold text-2xl">&ldquo;</span>
                    {r.text}
                  </p>
                  <p className="font-sans font-semibold text-sm uppercase tracking-[0.1em] text-foreground">
                    {r.name}
                  </p>
                  <p className="font-sans font-light text-xs text-muted">{r.location}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-all max-md:hidden"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-all max-md:hidden"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
