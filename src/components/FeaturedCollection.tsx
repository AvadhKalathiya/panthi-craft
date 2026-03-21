import { Link } from "react-router-dom";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import ScrollReveal from "./ScrollReveal";

export default function FeaturedCollection() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-[7.5rem] max-md:py-[4.5rem] px-[clamp(1.5rem,5vw,4rem)]">
      <div className="max-w-[1340px] mx-auto">
        <ScrollReveal className="text-center mb-16 max-w-[600px] mx-auto">
          <span className="eyebrow block mb-4">Our Collection</span>
          <h2 className="font-serif text-h2 italic text-foreground mb-4">
            Crafted for the Modern Woman
          </h2>
          <p className="font-sans font-light text-muted leading-relaxed">
            Each purse is individually handcrafted by skilled artisans in India,
            using only the finest materials.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 120}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link
            to="/collection"
            className="font-sans text-gold hover:underline tracking-wide"
          >
            View Full Collection →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
