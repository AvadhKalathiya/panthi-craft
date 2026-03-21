import { useState, useEffect } from 'react';
import { hasConfig } from '@/lib/firebase';
import { getProductById } from '@/lib/productService';
import { products as staticProducts } from '@/lib/products';
import type { Product } from '@/types/product';

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }

    if (hasConfig) {
      getProductById(id).then((p) => {
        if (p) {
          setProduct(p);
        } else {
          // Fallback to static
          const sp = staticProducts.find(s => s.id === id);
          if (sp) {
            setProduct({
              id: sp.id, name: sp.name, category: sp.category,
              price: sp.price, originalPrice: sp.originalPrice || 0,
              badge: sp.badge || '', description: sp.description,
              material: sp.material, dimensions: sp.dimensions,
              closure: sp.closure, strap: sp.strap, colors: sp.colors,
              images: [sp.image], mainImage: sp.image,
              isFeatured: sp.isFeatured, isBestSeller: sp.isBestSeller,
              isNew: sp.isNew, isActive: true, order: parseInt(sp.id),
            });
          }
        }
      }).catch(() => {
        const sp = staticProducts.find(s => s.id === id);
        if (sp) {
          setProduct({
            id: sp.id, name: sp.name, category: sp.category,
            price: sp.price, originalPrice: sp.originalPrice || 0,
            badge: sp.badge || '', description: sp.description,
            material: sp.material, dimensions: sp.dimensions,
            closure: sp.closure, strap: sp.strap, colors: sp.colors,
            images: [sp.image], mainImage: sp.image,
            isFeatured: sp.isFeatured, isBestSeller: sp.isBestSeller,
            isNew: sp.isNew, isActive: true, order: parseInt(sp.id),
          });
        }
      }).finally(() => setLoading(false));
    } else {
      const sp = staticProducts.find(s => s.id === id);
      if (sp) {
        setProduct({
          id: sp.id, name: sp.name, category: sp.category,
          price: sp.price, originalPrice: sp.originalPrice || 0,
          badge: sp.badge || '', description: sp.description,
          material: sp.material, dimensions: sp.dimensions,
          closure: sp.closure, strap: sp.strap, colors: sp.colors,
          images: [sp.image], mainImage: sp.image,
          isFeatured: sp.isFeatured, isBestSeller: sp.isBestSeller,
          isNew: sp.isNew, isActive: true, order: parseInt(sp.id),
        });
      }
      setLoading(false);
    }
  }, [id]);

  return { product, loading };
}
