export interface Product {
  id: number;
  name: string;
  nameLocal?: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  weight: string;
  inStock: boolean;
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  color: string;
}

export const categories: Category[] = [
  { id: 1, name: "Spices & Masalas", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop", count: 45, color: "#C44B2B" },
  { id: 2, name: "Cold Pressed Oils", image: "https://images.unsplash.com/photo-1474979266404-7f28db3f3150?w=400&h=400&fit=crop", count: 18, color: "#D4A853" },
  { id: 3, name: "Rice & Millets", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", count: 24, color: "#2D5A27" },
  { id: 4, name: "Jaggery & Sweeteners", image: "https://images.unsplash.com/photo-1604431696980-07e518647610?w=400&h=400&fit=crop", count: 12, color: "#8B4513" },
  { id: 5, name: "Pickles & Chutneys", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=400&fit=crop", count: 30, color: "#5C6B3C" },
  { id: 6, name: "Snacks & Sweets", image: "https://images.unsplash.com/photo-1599490659213-e2b9527571d0?w=400&h=400&fit=crop", count: 22, color: "#B8860B" },
  { id: 7, name: "Health & Wellness", image: "https://images.unsplash.com/photo-1505576399279-0d754c0d7e5e?w=400&h=400&fit=crop", count: 15, color: "#228B22" },
  { id: 8, name: "Flours & Pulses", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop", count: 28, color: "#DAA520" },
];

export const products: Product[] = [
  {
    id: 1, name: "Organic Turmeric Powder", nameLocal: "மஞ்சள் தூள்", category: "Spices & Masalas",
    price: 149, originalPrice: 199, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&h=500&fit=crop",
    rating: 4.8, reviews: 234, badge: "Bestseller", description: "Premium organic turmeric powder sourced from Erode farms. Rich in curcumin content.", weight: "200g", inStock: true, tags: ["organic", "bestseller"]
  },
  {
    id: 2, name: "Cold Pressed Coconut Oil", nameLocal: "தேங்காய் எண்ணெய்", category: "Cold Pressed Oils",
    price: 349, originalPrice: 449, image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&h=500&fit=crop",
    rating: 4.9, reviews: 189, badge: "Premium", description: "100% pure cold pressed virgin coconut oil. No chemicals, no preservatives.", weight: "500ml", inStock: true, tags: ["organic", "premium"]
  },
  {
    id: 3, name: "Traditional Jaggery Block", nameLocal: "வெல்லம்", category: "Jaggery & Sweeteners",
    price: 89, originalPrice: 120, image: "https://images.unsplash.com/photo-1604431696980-07e518647610?w=500&h=500&fit=crop",
    rating: 4.7, reviews: 156, badge: "New", description: "Pure organic jaggery made from fresh sugarcane. Chemical-free traditional process.", weight: "500g", inStock: true, tags: ["organic", "new"]
  },
  {
    id: 4, name: "Red Chilli Powder", nameLocal: "மிளகாய் தூள்", category: "Spices & Masalas",
    price: 129, originalPrice: 169, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop",
    rating: 4.6, reviews: 312, description: "Guntur red chilli powder with perfect heat and vibrant color. Freshly ground.", weight: "250g", inStock: true, tags: ["spicy", "bestseller"]
  },
  {
    id: 5, name: "Barnyard Millet", nameLocal: "குதிரைவாலி", category: "Rice & Millets",
    price: 159, originalPrice: 199, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
    rating: 4.5, reviews: 98, badge: "Healthy", description: "Nutrient-rich barnyard millet. High in fiber and iron. Perfect for healthy meals.", weight: "1kg", inStock: true, tags: ["healthy", "millet"]
  },
  {
    id: 6, name: "Mango Pickle (Avakkai)", nameLocal: "மாங்காய் ஊறுகாய்", category: "Pickles & Chutneys",
    price: 199, originalPrice: 249, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&h=500&fit=crop",
    rating: 4.8, reviews: 445, badge: "Bestseller", description: "Authentic homestyle mango pickle made with traditional recipe. Aged to perfection.", weight: "300g", inStock: true, tags: ["traditional", "bestseller"]
  },
  {
    id: 7, name: "Cold Pressed Sesame Oil", nameLocal: "நல்லெண்ணெய்", category: "Cold Pressed Oils",
    price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1474979266404-7f28db3f3150?w=500&h=500&fit=crop",
    rating: 4.7, reviews: 167, badge: "Premium", description: "Pure cold pressed gingelly/sesame oil. Traditional wood-pressed method.", weight: "500ml", inStock: true, tags: ["organic", "premium"]
  },
  {
    id: 8, name: "Murukku (Traditional Snack)", nameLocal: "முறுக்கு", category: "Snacks & Sweets",
    price: 179, originalPrice: 220, image: "https://images.unsplash.com/photo-1599490659213-e2b9527571d0?w=500&h=500&fit=crop",
    rating: 4.6, reviews: 278, description: "Crispy traditional murukku made with rice flour and urad dal. Perfectly seasoned.", weight: "250g", inStock: true, tags: ["snack", "traditional"]
  },
  {
    id: 9, name: "Organic Black Pepper", nameLocal: "மிளகு", category: "Spices & Masalas",
    price: 249, originalPrice: 320, image: "https://images.unsplash.com/photo-1599909533601-aa8c0ab296f3?w=500&h=500&fit=crop",
    rating: 4.9, reviews: 198, badge: "Premium", description: "Whole black pepper from Wayanad. Rich aroma and bold flavor.", weight: "100g", inStock: true, tags: ["organic", "premium"]
  },
  {
    id: 10, name: "Ragi Flour", nameLocal: "கேழ்வரகு மாவு", category: "Flours & Pulses",
    price: 99, originalPrice: 139, image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&h=500&fit=crop",
    rating: 4.5, reviews: 134, description: "Freshly ground finger millet flour. Rich in calcium. Great for porridge and roti.", weight: "500g", inStock: true, tags: ["healthy", "millet"]
  },
  {
    id: 11, name: "Ashwagandha Powder", nameLocal: "அமுக்கரா", category: "Health & Wellness",
    price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1505576399279-0d754c0d7e5e?w=500&h=500&fit=crop",
    rating: 4.7, reviews: 89, badge: "New", description: "Pure ashwagandha root powder. Supports stress relief and vitality.", weight: "100g", inStock: true, tags: ["ayurvedic", "wellness"]
  },
  {
    id: 12, name: "Ponni Boiled Rice", nameLocal: "புழுங்கல் அரிசி", category: "Rice & Millets",
    price: 599, originalPrice: 699, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
    rating: 4.8, reviews: 567, badge: "Bestseller", description: "Premium quality Ponni boiled rice from Thanjavur. Fluffy and aromatic.", weight: "5kg", inStock: true, tags: ["rice", "bestseller"]
  },
];

export const banners = [
  {
    id: 1,
    title: "Pure & Traditional",
    subtitle: "Farm Fresh Spices & Groceries",
    description: "Discover authentic flavors from the heart of Tamil Nadu. 100% organic, chemical-free products delivered to your doorstep.",
    cta: "Shop Now",
    bg: "from-[#2D5A27] to-[#1E3D1A]",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=500&fit=crop"
  },
  {
    id: 2,
    title: "Cold Pressed Oils",
    subtitle: "Traditional Wood-Pressed Goodness",
    description: "Experience the richness of traditional cold-pressed oils. Made with century-old techniques for maximum nutrition.",
    cta: "Explore Oils",
    bg: "from-[#8B4513] to-[#654321]",
    image: "https://images.unsplash.com/photo-1474979266404-7f28db3f3150?w=800&h=500&fit=crop"
  },
  {
    id: 3,
    title: "Millets & Grains",
    subtitle: "Ancient Grains for Modern Health",
    description: "Rediscover the nutritional powerhouse of traditional millets. High in fiber, protein, and essential minerals.",
    cta: "Shop Millets",
    bg: "from-[#5C6B3C] to-[#3A4425]",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=500&fit=crop"
  }
];

export const testimonials = [
  { id: 1, name: "Priya Sharma", location: "Chennai", text: "The quality of spices is exceptional! The turmeric powder has such a vibrant color and amazing aroma. Will definitely order again.", rating: 5, avatar: "PS" },
  { id: 2, name: "Rajesh Kumar", location: "Bangalore", text: "Best cold-pressed oils I've ever used. You can really taste the difference. My family loves the coconut oil for cooking.", rating: 5, avatar: "RK" },
  { id: 3, name: "Meena Devi", location: "Coimbatore", text: "Finally found authentic traditional products online. The jaggery and pickles remind me of my grandmother's kitchen.", rating: 5, avatar: "MD" },
  { id: 4, name: "Arun Prakash", location: "Mumbai", text: "Fast delivery and excellent packaging. The millets are of premium quality. Great for our health-conscious family.", rating: 4, avatar: "AP" },
];
