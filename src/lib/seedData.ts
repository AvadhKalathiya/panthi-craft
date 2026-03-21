import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const sampleProducts = [
  {
    name: "Regal Quilted Tote",
    category: "Tote Bags",
    price: 1299,
    originalPrice: 1599,
    badge: "Best Seller",
    description: "Inspired by our brand's signature quilted pattern, the Regal Tote combines structured elegance with everyday functionality. Spacious interior with zip pocket and card slots.",
    material: "Premium Vegan Leather",
    dimensions: "35cm × 28cm × 12cm",
    closure: "Magnetic Snap + Interior Zipper",
    strap: "Fixed Top Handles + Detachable Shoulder Strap",
    colors: ["Camel", "Black", "Dusty Rose"],
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600"],
    mainImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    isFeatured: true, isBestSeller: true, isNew: false, isActive: true, order: 1,
  },
  {
    name: "Celestia Sling Bag",
    category: "Sling Bags",
    price: 899,
    originalPrice: 0,
    badge: "New",
    description: "A sleek companion for the modern woman on the move. The Celestia's adjustable crossbody strap and compact silhouette make it perfect for everything from brunch to evening outings.",
    material: "Faux Suede",
    dimensions: "22cm × 16cm × 6cm",
    closure: "Zipper",
    strap: "Adjustable Crossbody Strap",
    colors: ["Olive", "Navy", "Camel"],
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"],
    mainImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    isFeatured: true, isBestSeller: false, isNew: true, isActive: true, order: 2,
  },
  {
    name: "Velvet Evening Clutch",
    category: "Clutches",
    price: 699,
    originalPrice: 899,
    badge: "Best Seller",
    description: "Make a statement at every occasion with this luxurious velvet clutch. The rich jewel-toned fabric and gold metal frame create an unforgettable accessory.",
    material: "Velvet + Metal Frame",
    dimensions: "26cm × 14cm × 5cm",
    closure: "Fold-over Clasp",
    strap: "Detachable Chain Strap",
    colors: ["Emerald", "Burgundy", "Gold"],
    images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600"],
    mainImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600",
    isFeatured: true, isBestSeller: true, isNew: false, isActive: true, order: 3,
  },
  {
    name: "Aurora Shoulder Bag",
    category: "Shoulder Bags",
    price: 1099,
    originalPrice: 1299,
    badge: "",
    description: "Classic sophistication meets modern design. The Aurora features a structured silhouette with a beautiful buckle closure that elevates any outfit.",
    material: "Genuine Leather",
    dimensions: "30cm × 22cm × 10cm",
    closure: "Buckle + Zipper",
    strap: "Adjustable Shoulder Strap",
    colors: ["Tan", "White", "Black"],
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600"],
    mainImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600",
    isFeatured: true, isBestSeller: false, isNew: false, isActive: true, order: 4,
  },
  {
    name: "Lotus Mini Bag",
    category: "Clutches",
    price: 549,
    originalPrice: 0,
    badge: "New",
    description: "Delicate pearl handle and crystal embellishments make this mini bag a true treasure. Perfect for weddings, festivals, and special celebrations.",
    material: "Satin + Crystal Embellishment",
    dimensions: "18cm × 12cm × 4cm",
    closure: "Magnetic Snap",
    strap: "Pearl Handle + Chain Strap",
    colors: ["Pearl White", "Blush Pink"],
    images: ["https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600"],
    mainImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600",
    isFeatured: true, isBestSeller: false, isNew: true, isActive: true, order: 5,
  },
  {
    name: "Classic Work Tote",
    category: "Tote Bags",
    price: 1499,
    originalPrice: 1899,
    badge: "Premium",
    description: "The ultimate professional companion. Full-grain vegan leather, laptop-compatible interior, and timeless design that transitions seamlessly from boardroom to dinner.",
    material: "Full-Grain Vegan Leather",
    dimensions: "38cm × 30cm × 14cm",
    closure: "Zipper",
    strap: "Top Handles + Detachable Long Strap",
    colors: ["Black", "Chocolate Brown", "Navy"],
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600"],
    mainImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
    isFeatured: true, isBestSeller: true, isNew: false, isActive: true, order: 6,
  },
  {
    name: "Pearl Chain Clutch",
    category: "Clutches",
    price: 799,
    originalPrice: 0,
    badge: "New",
    description: "Elegant pearl chain detail elevates this compact clutch into a statement piece. Perfect for special occasions and evening events.",
    material: "Satin + Pearl Chain",
    dimensions: "24cm × 13cm × 4cm",
    closure: "Snap Closure",
    strap: "Pearl Chain Strap",
    colors: ["Ivory", "Champagne", "Black"],
    images: ["https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=600"],
    mainImage: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=600",
    isFeatured: false, isBestSeller: false, isNew: true, isActive: true, order: 7,
  },
  {
    name: "Boho Fringe Sling",
    category: "Sling Bags",
    price: 999,
    originalPrice: 1199,
    badge: "Sale",
    description: "Free-spirited design with handcrafted fringe detailing. The Boho Sling brings artisan flair to your everyday style.",
    material: "Suede + Fringe Detail",
    dimensions: "20cm × 18cm × 8cm",
    closure: "Drawstring + Magnetic",
    strap: "Adjustable Crossbody",
    colors: ["Tan", "Rust", "Sage"],
    images: ["https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    mainImage: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600",
    isFeatured: false, isBestSeller: false, isNew: false, isActive: true, order: 8,
  },
];

export async function seedFirestore(): Promise<number> {
  if (!db) throw new Error('Firebase not configured');
  
  const col = collection(db, 'products');
  let count = 0;
  
  for (const product of sampleProducts) {
    await addDoc(col, {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    count++;
  }
  
  return count;
}

export async function getProductCount(): Promise<number> {
  if (!db) return 0;
  const snap = await getDocs(collection(db, 'products'));
  return snap.size;
}
