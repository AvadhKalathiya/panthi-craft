import { Link } from "react-router-dom";
import { openInstagramDM } from "@/lib/products";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openInstagramDM(product.name, String(product.price));
    toast("✓ Message copied! Paste it in Instagram DM");
  };

  return (
    <Link to={`/product/${product.id}`} className="luxury-card group cursor-pointer block">
      <div className="img-portrait relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-gold text-primary-foreground font-sans text-[0.65rem] font-medium uppercase tracking-[0.1em] px-2.5 py-1">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5 text-center">
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-muted block mb-1.5">
          {product.category}
        </span>
        <h3 className="font-serif text-lg text-foreground gold-underline inline-block">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="font-sans font-semibold text-gold text-lg">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-sans font-light text-muted text-sm line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={handleOrder}
          className="w-full mt-3 bg-dark text-primary-foreground font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] py-3 hover:bg-gold hover:-translate-y-px transition-all"
        >
          Order on Instagram
        </button>
      </div>
    </Link>
  );
}
