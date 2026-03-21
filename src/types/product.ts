export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  badge: string;
  description: string;
  material: string;
  dimensions: string;
  closure: string;
  strap: string;
  colors: string[];
  images: string[];
  mainImage: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isActive: boolean;
  order: number;
  createdAt?: any;
  updatedAt?: any;
}
