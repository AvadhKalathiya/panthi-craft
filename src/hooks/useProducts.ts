import { useState, useEffect } from 'react';
import { hasConfig } from '@/lib/firebase';
import { getAllProducts, getFeaturedProducts, getBestSellers } from '@/lib/productService';
import { products as staticProducts } from '@/lib/products';
import type { Product as FirebaseProduct } from '@/types/product';
import type { Product as StaticProduct } from '@/lib/products';

// Convert static product to match Firebase shape
function staticToUnified(p: StaticProduct): FirebaseProduct {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice || 0,
    badge: p.badge || '',
    description: p.description,
    material: p.material,
    dimensions: p.dimensions,
    closure: p.closure,
    strap: p.strap,
    colors: p.colors,
    images: [p.image],
    mainImage: p.image,
    isFeatured: p.isFeatured,
    isBestSeller: p.isBestSeller,
    isNew: p.isNew,
    isActive: true,
    order: parseInt(p.id),
  };
}

export function useAllProducts() {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasConfig) {
      getAllProducts().then(setProducts).catch(() => {
        setProducts(staticProducts.map(staticToUnified));
      }).finally(() => setLoading(false));
    } else {
      setProducts(staticProducts.map(staticToUnified));
      setLoading(false);
    }
  }, []);

  return { products, loading };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasConfig) {
      getFeaturedProducts().then(setProducts).catch(() => {
        setProducts(staticProducts.filter(p => p.isFeatured).slice(0, 6).map(staticToUnified));
      }).finally(() => setLoading(false));
    } else {
      setProducts(staticProducts.filter(p => p.isFeatured).slice(0, 6).map(staticToUnified));
      setLoading(false);
    }
  }, []);

  return { products, loading };
}

export function useBestSellers() {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasConfig) {
      getBestSellers().then(setProducts).catch(() => {
        setProducts(staticProducts.filter(p => p.isBestSeller).map(staticToUnified));
      }).finally(() => setLoading(false));
    } else {
      setProducts(staticProducts.filter(p => p.isBestSeller).map(staticToUnified));
      setLoading(false);
    }
  }, []);

  return { products, loading };
}
