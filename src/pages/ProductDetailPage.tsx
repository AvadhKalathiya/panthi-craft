import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products, openInstagramDM } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "sonner";
import { Package, Share2 } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-h2 text-foreground mb-4">Product Not Found</h1>
          <Link to="/collection" className="font-sans text-gold hover:underline">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleOrder = () => {
    openInstagramDM(product.name, String(product.price));
    toast("✓ Message copied! Paste it in Instagram DM");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const specs = [
    { label: "Material", value: product.material },
    { label: "Dimensions", value: product.dimensions },
    { label: "Closure", value: product.closure },
    { label: "Strap", value: product.strap },
    { label: "Colors", value: product.colors.join(", ") },
  ];

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="px-[clamp(1.5rem,5vw,4rem)] max-w-[1340px] mx-auto mb-8">
        <div className="font-sans text-xs text-muted">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/collection" className="hover:text-gold transition-colors">Collection</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <div className="px-[clamp(1.5rem,5vw,4rem)] max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <div>
            <div className="img-portrait group cursor-zoom-in">
              <img
                src={product.image}
                alt={product.name}
                className="group-hover:scale-[1.08] transition-transform duration-[800ms]"
                style={{ transitionTimingFunction: "var(--ease-image)" }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="py-4">
            <span className="eyebrow block mb-3">{product.category}</span>
            <h1 className="font-serif text-h1 text-foreground leading-[1.1] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans font-bold text-3xl text-gold">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-sans font-light text-lg text-muted line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-gold text-primary-foreground font-sans text-[0.65rem] font-medium uppercase tracking-wide px-2 py-0.5">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-sand my-6" />

            <p className="font-sans font-light leading-[1.9] text-charcoal mb-6">
              {product.description}
            </p>

            {/* Specs */}
            <div className="border border-sand mb-6">
              {specs.map((s, i) => (
                <div
                  key={i}
                  className={`flex py-3 px-4 ${i < specs.length - 1 ? "border-b border-sand" : ""}`}
                >
                  <span className="w-[40%] font-sans font-medium text-xs uppercase tracking-[0.1em] text-muted">
                    {s.label}
                  </span>
                  <span className="w-[60%] font-sans font-light text-sm text-foreground">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-3 bg-beige px-4 py-3 mb-6">
              <Package size={18} className="text-gold flex-shrink-0" />
              <span className="font-sans text-sm">Ships within 2–3 days across Gujarat</span>
            </div>

            {/* Buttons */}
            <button
              onClick={handleOrder}
              className="w-full bg-dark text-primary-foreground font-sans font-semibold text-sm uppercase tracking-[0.15em] py-4 hover:bg-gold hover:-translate-y-0.5 transition-all mb-3"
            >
              Order This Purse on Instagram
            </button>
            <button
              onClick={handleOrder}
              className="w-full border-[1.5px] border-sand text-charcoal font-sans text-sm uppercase tracking-[0.12em] py-4 hover:border-gold hover:text-gold transition-all mb-6"
            >
              💬 Ask a Question on Instagram
            </button>

            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="font-sans text-xs text-muted uppercase tracking-wide">Share:</span>
              <button
                onClick={handleShare}
                className="w-9 h-9 border border-sand flex items-center justify-center hover:border-gold hover:text-gold transition-all"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="py-16 px-[clamp(1.5rem,5vw,4rem)] bg-beige mt-16">
        <div className="max-w-[1340px] mx-auto">
          <h3 className="font-serif text-h3 text-foreground text-center mb-10">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
