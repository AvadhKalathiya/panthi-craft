import { useState } from "react";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import aboutHero from "@/assets/about-hero.jpg";

export default function CollectionPage() {
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);
  const displayed = showAll ? filtered : filtered.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img src={aboutHero} alt="Collection" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative z-10 text-center">
          <span className="eyebrow block mb-3">All Products</span>
          <h1 className="font-serif text-display text-primary-foreground italic">Our Collection</h1>
          <p className="font-serif italic text-primary-foreground/80 text-lg mt-2">
            Every piece, crafted by hand
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-[60px] z-50 bg-card border-b border-sand py-4 px-6">
        <div className="max-w-[1340px] mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setShowAll(false); }}
              className={`font-sans text-[0.75rem] uppercase tracking-[0.1em] px-5 py-2 border transition-all ${
                active === cat
                  ? "bg-gold border-gold text-primary-foreground"
                  : "border-sand text-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-[clamp(1.5rem,5vw,4rem)]">
        <div className="max-w-[1340px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayed.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 80}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          {!showAll && filtered.length > 8 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="border-[1.5px] border-gold text-gold font-sans text-xs uppercase tracking-[0.15em] font-medium px-8 py-3 hover:bg-gold hover:text-primary-foreground transition-all"
              >
                Load More Purses
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-muted italic">No purses found in this category</p>
              <button
                onClick={() => setActive("All")}
                className="font-sans text-gold mt-4 hover:underline"
              >
                View All
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
