import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  description: string;
  material: string;
  dimensions: string;
  closure: string;
  strap: string;
  colors: string[];
  image: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
}

export const products: Product[] = [
  {
    id: "001",
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
    image: product1,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: "002",
    name: "Celestia Sling Bag",
    category: "Sling Bags",
    price: 899,
    originalPrice: null,
    badge: "New",
    description: "A sleek companion for the modern woman on the move. The Celestia's adjustable crossbody strap and compact silhouette make it perfect for everything from brunch to evening outings.",
    material: "Faux Suede",
    dimensions: "22cm × 16cm × 6cm",
    closure: "Zipper",
    strap: "Adjustable Crossbody Strap",
    colors: ["Olive", "Navy", "Camel"],
    image: product2,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: "003",
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
    image: product3,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: "004",
    name: "Aurora Shoulder Bag",
    category: "Shoulder Bags",
    price: 1099,
    originalPrice: 1299,
    badge: null,
    description: "Classic sophistication meets modern design. The Aurora features a structured silhouette with a beautiful buckle closure that elevates any outfit.",
    material: "Genuine Leather",
    dimensions: "30cm × 22cm × 10cm",
    closure: "Buckle + Zipper",
    strap: "Adjustable Shoulder Strap",
    colors: ["Tan", "White", "Black"],
    image: product4,
    isFeatured: true,
    isBestSeller: false,
    isNew: false,
  },
  {
    id: "005",
    name: "Lotus Mini Bag",
    category: "Clutches",
    price: 549,
    originalPrice: null,
    badge: "New",
    description: "Delicate pearl handle and crystal embellishments make this mini bag a true treasure. Perfect for weddings, festivals, and special celebrations.",
    material: "Satin + Crystal Embellishment",
    dimensions: "18cm × 12cm × 4cm",
    closure: "Magnetic Snap",
    strap: "Pearl Handle + Chain Strap",
    colors: ["Pearl White", "Blush Pink"],
    image: product5,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: "006",
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
    image: product6,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: "007",
    name: "Aria Bucket Bag",
    category: "Shoulder Bags",
    price: 999,
    originalPrice: null,
    badge: null,
    description: "A relaxed yet refined bucket silhouette with drawstring closure. The Aria is your go-to for casual elegance.",
    material: "Soft Vegan Leather",
    dimensions: "25cm × 28cm × 15cm",
    closure: "Drawstring",
    strap: "Long Shoulder Strap",
    colors: ["Cream", "Sage", "Terracotta"],
    image: product1,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
  },
  {
    id: "008",
    name: "Priya Embroidered Clutch",
    category: "Clutches",
    price: 799,
    originalPrice: 999,
    badge: null,
    description: "Hand-embroidered with traditional Indian motifs, this clutch celebrates our heritage while embracing contemporary style.",
    material: "Canvas + Thread Embroidery",
    dimensions: "24cm × 13cm × 4cm",
    closure: "Zipper",
    strap: "Wrist Strap",
    colors: ["Multi", "Gold-Red", "Blue-Green"],
    image: product3,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
  },
  {
    id: "009",
    name: "Saffron Crossbody",
    category: "Sling Bags",
    price: 849,
    originalPrice: null,
    badge: "New",
    description: "Named after India's most precious spice, this crossbody captures warmth and richness in every stitch.",
    material: "Premium PU Leather",
    dimensions: "20cm × 15cm × 7cm",
    closure: "Flap + Magnetic Snap",
    strap: "Adjustable Crossbody",
    colors: ["Saffron", "Black", "Ivory"],
    image: product4,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: "010",
    name: "Royal Structured Handbag",
    category: "Shoulder Bags",
    price: 1399,
    originalPrice: 1699,
    badge: "Premium",
    description: "Precision engineering meets artisan craftsmanship. Every angle of the Royal is designed to command attention.",
    material: "Premium Vegan Leather",
    dimensions: "32cm × 24cm × 12cm",
    closure: "Turn-lock",
    strap: "Top Handle + Shoulder Strap",
    colors: ["Burgundy", "Camel", "Black"],
    image: product6,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
  },
  {
    id: "011",
    name: "Diya Evening Pouch",
    category: "Clutches",
    price: 599,
    originalPrice: null,
    badge: null,
    description: "A slim, elegant pouch perfect for evenings out. The Diya slips easily under your arm or into a larger bag.",
    material: "Metallic Faux Leather",
    dimensions: "22cm × 12cm × 3cm",
    closure: "Zipper",
    strap: "None",
    colors: ["Gold", "Silver", "Rose Gold"],
    image: product5,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
  },
  {
    id: "012",
    name: "Indira Travel Tote",
    category: "Tote Bags",
    price: 1699,
    originalPrice: null,
    badge: "Premium",
    description: "Our largest tote, designed for the woman who carries her world with grace. Multiple compartments and premium materials.",
    material: "Full-Grain Vegan Leather",
    dimensions: "42cm × 32cm × 16cm",
    closure: "Top Zipper + Snap",
    strap: "Reinforced Top Handles",
    colors: ["Black", "Tan", "Dark Brown"],
    image: product1,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
  },
];

export const categories = ["All", "Tote Bags", "Clutches", "Sling Bags", "Shoulder Bags"];

export function openInstagramDM(productName = '', price = '') {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const message = productName
    ? `Hello! I want to order this purse.\n\nProduct: ${productName}\nPrice: ₹${price}\nLink: ${currentUrl}\n\nPlease confirm availability and delivery details.`
    : `Hello! I'm interested in ordering a purse from Panthi First Choice. Can you please share available options?`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(message).catch(() => {});
  }

  setTimeout(() => {
    window.open('https://ig.me/m/panthi_first_choice', '_blank');
  }, 300);

  return message;
}
