import { useState, useCallback, useRef, useEffect } from 'react';
import {
  X, Package, ShoppingCart, Users, IndianRupee,
  Edit, Trash2, Plus, Search,
  BarChart3, ArrowUp, ArrowDown, Bell, LogOut,
  Truck, CheckCircle, Clock, AlertCircle, Star,
  Save, Palette, Mail, Phone,
  ChevronDown, ChevronUp, Send,
  Bot, MessageSquare, Zap, Layers, ShieldCheck, Award, TrendingUp,
  Type, Globe, Image, Hash, Tag, Percent, Layout,
  Facebook, Instagram, Twitter, Youtube,
  Eye, EyeOff, UploadCloud, RefreshCw, Settings2,
  AlignLeft, AlignCenter, Megaphone, MapPin, Link2
} from 'lucide-react';
import { products as initialProducts, categories as initialCategories } from '../data/products';
import type { Product } from '../data/products';

// ─── Types ─────────────────────────────────────────────────────────────────
interface Order {
  id: string; customer: string; items: number; total: number;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Pending' | 'Cancelled';
  date: string; payment: string; email: string; phone: string;
}

interface NavLink { label: string; href: string; bold?: boolean; emoji?: string; }
interface SocialLink { platform: 'facebook' | 'instagram' | 'twitter' | 'youtube'; url: string; active: boolean; }
interface HeroBanner { id: number; title: string; subtitle: string; description: string; cta: string; bgColor: string; imageUrl: string; active: boolean; }
interface PromoCard { id: number; badge: string; title: string; description: string; couponCode?: string; cta: string; bgFrom: string; bgTo: string; active: boolean; }

interface SiteSettings {
  // Brand
  storeName: string; tagline: string; logoUrl: string; logoText: string; faviconEmoji: string;
  // Contact
  phone: string; email: string; address: string; city: string; hours: string;
  // Colors
  primaryColor: string; primaryDark: string; accentColor: string; accentDark: string;
  bgColor: string; textColor: string;
  // Typography
  headingFont: string; bodyFont: string; fontSize: string;
  // Header
  announcementBarText: string; announcementBarActive: boolean; announcementBarColor: string;
  searchPlaceholder: string; navLinks: NavLink[];
  // Hero
  heroBanners: HeroBanner[];
  // Promo
  promoCards: PromoCard[];
  // Footer
  footerAbout: string; socialLinks: SocialLink[]; footerBgColor: string;
  // SEO
  metaTitle: string; metaDescription: string; metaKeywords: string;
  // Shipping & Payment
  freeShippingMin: number; currency: string; enableCOD: boolean; enableUPI: boolean; enableRazorpay: boolean;
  // Business
  gstNumber: string; returnDays: number;
  // Misc
  whatsappNumber: string; instagramHandle: string;
}

interface AIMessage { role: 'user' | 'assistant'; content: string; }

// ─── Initial Data ──────────────────────────────────────────────────────────
const initialOrders: Order[] = [
  { id: 'ORD-10234', customer: 'Priya Sharma', items: 3, total: 1245, status: 'Delivered', date: '2024-01-15', payment: 'Razorpay', email: 'priya@email.com', phone: '+91 98765 43210' },
  { id: 'ORD-10235', customer: 'Rajesh Kumar', items: 5, total: 2890, status: 'Shipped', date: '2024-01-15', payment: 'UPI', email: 'rajesh@email.com', phone: '+91 87654 32109' },
  { id: 'ORD-10236', customer: 'Anita Devi', items: 2, total: 680, status: 'Processing', date: '2024-01-14', payment: 'COD', email: 'anita@email.com', phone: '+91 76543 21098' },
  { id: 'ORD-10237', customer: 'Suresh Patel', items: 1, total: 350, status: 'Pending', date: '2024-01-14', payment: 'Razorpay', email: 'suresh@email.com', phone: '+91 65432 10987' },
  { id: 'ORD-10238', customer: 'Meena Rao', items: 4, total: 1980, status: 'Delivered', date: '2024-01-13', payment: 'UPI', email: 'meena@email.com', phone: '+91 54321 09876' },
  { id: 'ORD-10239', customer: 'Kiran Reddy', items: 2, total: 890, status: 'Cancelled', date: '2024-01-13', payment: 'Razorpay', email: 'kiran@email.com', phone: '+91 43210 98765' },
];

const defaultSettings: SiteSettings = {
  storeName: 'Velchekku', tagline: 'Traditional & Organic',
  logoUrl: '', logoText: 'V', faviconEmoji: '🌿',
  phone: '+91 98765 43210', email: 'hello@velchekku.com',
  address: '42, Anna Salai, T. Nagar', city: 'Chennai, Tamil Nadu 600017',
  hours: 'Mon–Sat: 9 AM – 7 PM',
  primaryColor: '#2D5A27', primaryDark: '#1E3D1A',
  accentColor: '#D4A853', accentDark: '#B8941F',
  bgColor: '#FEFCF9', textColor: '#333333',
  headingFont: 'Playfair Display', bodyFont: 'Inter', fontSize: '16',
  announcementBarText: '🚚 Free shipping on orders above ₹499 | Use WELCOME10 for 10% off your first order!',
  announcementBarActive: true, announcementBarColor: '#1E3D1A',
  searchPlaceholder: 'Search for spices, oils, millets...',
  navLinks: [
    { label: 'Home', href: '#' },
    { label: 'New Arrivals', href: '#' },
    { label: 'Best Sellers', href: '#' },
    { label: 'Organic', href: '#' },
    { label: 'Offers', href: '#' },
    { label: 'About Us', href: '#' },
    { label: '🔥 Sale', href: '#', bold: true },
  ],
  heroBanners: [
    { id: 1, title: 'Pure & Traditional', subtitle: 'Farm Fresh Spices & Groceries', description: 'Discover authentic flavors from the heart of Tamil Nadu. 100% organic, chemical-free products delivered to your doorstep.', cta: 'Shop Now', bgColor: '#2D5A27', imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=500&fit=crop', active: true },
    { id: 2, title: 'Cold Pressed Oils', subtitle: 'Traditional Wood-Pressed Goodness', description: 'Experience the richness of traditional cold-pressed oils. Made with century-old techniques for maximum nutrition.', cta: 'Explore Oils', bgColor: '#8B4513', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7f28db3f3150?w=800&h=500&fit=crop', active: true },
    { id: 3, title: 'Millets & Grains', subtitle: 'Ancient Grains for Modern Health', description: 'Rediscover the nutritional powerhouse of traditional millets. High in fiber, protein, and essential minerals.', cta: 'Shop Millets', bgColor: '#5C6B3C', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=500&fit=crop', active: true },
  ],
  promoCards: [
    { id: 1, badge: 'Deal of the Day', title: 'Cold Pressed Oils', description: 'Get up to 30% off on all cold pressed oils. Limited time offer!', cta: 'Shop Now', bgFrom: '#2D5A27', bgTo: '#1E3D1A', active: true },
    { id: 2, badge: 'Special Offer', title: 'First Order Bonus', description: 'Use code WELCOME10 for 10% off on your first order!', couponCode: 'WELCOME10', cta: 'Claim Offer', bgFrom: '#D4A853', bgTo: '#B8941F', active: true },
  ],
  footerAbout: 'Bringing you the finest traditional Indian groceries, spices, and organic products directly from farm to your doorstep. Quality you can trust.',
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com', active: true },
    { platform: 'instagram', url: 'https://instagram.com', active: true },
    { platform: 'twitter', url: 'https://twitter.com', active: false },
    { platform: 'youtube', url: 'https://youtube.com', active: true },
  ],
  footerBgColor: '#1A1A1A',
  metaTitle: 'Velchekku – Traditional & Organic Indian Groceries',
  metaDescription: 'Buy authentic traditional Indian groceries, spices, cold-pressed oils, millets, jaggery and pickles from Tamil Nadu. 100% organic, chemical-free.',
  metaKeywords: 'organic spices, cold pressed oil, millets, jaggery, Tamil Nadu groceries, traditional food',
  freeShippingMin: 499, currency: '₹',
  enableCOD: true, enableUPI: true, enableRazorpay: true,
  gstNumber: '33AAAAA0000A1Z5', returnDays: 7,
  whatsappNumber: '+919876543210', instagramHandle: '@velchekku',
};

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700', Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700', Pending: 'bg-gray-100 text-gray-700', Cancelled: 'bg-red-100 text-red-700',
};
const statusIcon: Record<string, React.ReactNode> = {
  Delivered: <CheckCircle size={13} />, Shipped: <Truck size={13} />,
  Processing: <Clock size={13} />, Pending: <AlertCircle size={13} />, Cancelled: <X size={13} />,
};

interface Props { onClose: () => void; }
type Tab = 'dashboard' | 'products' | 'orders' | 'customers' | 'customize' | 'ai';
type CustomizeSection = 'brand' | 'colors' | 'typography' | 'header' | 'hero' | 'promo' | 'footer' | 'seo' | 'payments' | 'business';

// ─── Sub-Components ────────────────────────────────────────────────────────
function Toggle({ value, onChange, label, description }: { value: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 gap-4">
      <div className="min-w-0">
        <span className="text-sm text-gray-700 font-medium">{label}</span>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <button onClick={() => onChange(!value)} className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${value ? 'bg-green-500' : 'bg-gray-200'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, hint }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none bg-white" />
      {hint && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent outline-none bg-white resize-none" />
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="flex items-center gap-2.5">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-10 h-9 rounded-lg border-2 cursor-pointer p-0.5 flex-shrink-0" />
        <input value={value} onChange={e => onChange(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-[#2D5A27]" />
        <div className="w-9 h-9 rounded-lg shadow-inner border flex-shrink-0" style={{ backgroundColor: value }} />
      </div>
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center gap-2">
        <span className="text-gray-600">{icon}</span>
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function AdminDashboard({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [activeCustomize, setActiveCustomize] = useState<CustomizeSection>('brand');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [savedSettings, setSavedSettings] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchProducts, setSearchProducts] = useState('');
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    { role: 'assistant', content: 'Hi! I\'m your Velchekku AI assistant powered by Claude.\n\nI can help you:\n• Analyze sales trends and suggest improvements\n• Write product descriptions and marketing copy\n• Create discount and pricing strategies\n• Plan seasonal campaigns (Diwali, Pongal, etc.)\n• Answer any question about your store\n\nWhat would you like help with today?' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name: '', category: 'Spices & Masalas', price: 0, originalPrice: 0, description: '', weight: '', inStock: true, tags: [], rating: 4.5, reviews: 0, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop' });
  const aiEndRef = useRef<HTMLDivElement>(null);

  const showNotif = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(null), 2500); };
  useEffect(() => { aiEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [aiMessages]);

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => setSettings(prev => ({ ...prev, [key]: value }));

  const saveSettings = () => { setSavedSettings(true); showNotif('✅ All settings saved!'); setTimeout(() => setSavedSettings(false), 2500); };

  const saveProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const p: Product = { id: Date.now(), name: newProduct.name!, category: newProduct.category!, price: Number(newProduct.price), originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price), image: newProduct.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop', rating: 4.5, reviews: 0, description: newProduct.description!, weight: newProduct.weight!, inStock: true, tags: [] };
    setProducts(prev => [p, ...prev]);
    setShowAddProduct(false);
    setNewProduct({ name: '', category: 'Spices & Masalas', price: 0, originalPrice: 0, description: '', weight: '', inStock: true, tags: [], rating: 4.5, reviews: 0, image: '' });
    showNotif('✅ Product added!');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => { setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o)); showNotif(`📦 ${id} → ${status}`); setExpandedOrder(null); };

  const sendAiMessage = useCallback(async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = aiInput.trim();
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setAiLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          system: `You are a business consultant for "${settings.storeName}", a traditional Indian grocery e-commerce store in ${settings.city}. Products: ${products.slice(0, 6).map(p => `${p.name} ₹${p.price}`).join(', ')}. Orders: ${orders.length} total, revenue ₹${orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.total, 0).toLocaleString()}. Be concise, practical, use Indian context and ₹ for prices.`,
          messages: [...aiMessages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: userMsg }]
        })
      });
      const data = await res.json();
      setAiMessages(prev => [...prev, { role: 'assistant', content: data.content?.[0]?.text || 'Sorry, could not process that.' }]);
    } catch { setAiMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]); }
    setAiLoading(false);
  }, [aiInput, aiLoading, aiMessages, products, orders, settings]);

  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.total, 0);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchProducts.toLowerCase()));

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={17} /> },
    { key: 'products', label: 'Products', icon: <Package size={17} /> },
    { key: 'orders', label: 'Orders', icon: <ShoppingCart size={17} /> },
    { key: 'customers', label: 'Customers', icon: <Users size={17} /> },
    { key: 'customize', label: 'Customize', icon: <Palette size={17} /> },
    { key: 'ai', label: 'AI Assistant', icon: <Bot size={17} /> },
  ];

  const customizeSections: { key: CustomizeSection; label: string; icon: React.ReactNode }[] = [
    { key: 'brand', label: 'Brand & Logo', icon: <Layers size={15} /> },
    { key: 'colors', label: 'Colors', icon: <Palette size={15} /> },
    { key: 'typography', label: 'Typography', icon: <Type size={15} /> },
    { key: 'header', label: 'Header & Nav', icon: <Layout size={15} /> },
    { key: 'hero', label: 'Hero Banners', icon: <Image size={15} /> },
    { key: 'promo', label: 'Promo Banners', icon: <Megaphone size={15} /> },
    { key: 'footer', label: 'Footer & Social', icon: <AlignLeft size={15} /> },
    { key: 'seo', label: 'SEO & Meta', icon: <Globe size={15} /> },
    { key: 'payments', label: 'Payments', icon: <ShieldCheck size={15} /> },
    { key: 'business', label: 'Business Info', icon: <Settings2 size={15} /> },
  ];

  const socialIcons: Record<string, React.ReactNode> = { facebook: <Facebook size={14} />, instagram: <Instagram size={14} />, twitter: <Twitter size={14} />, youtube: <Youtube size={14} /> };

  return (
    <div className="fixed inset-0 z-[200] bg-gray-50 overflow-auto">
      {notification && <div className="fixed top-4 right-4 z-[300] bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-2xl animate-pulse">{notification}</div>}

      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-3">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="logo" className="w-9 h-9 rounded-xl object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            ) : (
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow" style={{ backgroundColor: settings.primaryColor }}>
                {settings.logoText || settings.storeName[0]}
              </div>
            )}
            <div>
              <h1 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{settings.storeName} Admin</h1>
              <p className="text-[10px] text-gray-400 tracking-wide">{settings.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><Bell size={17} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" /></button>
            <button onClick={onClose} className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"><LogOut size={15} /><span className="hidden md:inline">Back to Store</span></button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-56 bg-white min-h-[calc(100vh-57px)] border-r p-4 sticky top-[57px] self-start h-[calc(100vh-57px)] overflow-y-auto">
          <nav className="space-y-0.5">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                style={activeTab === tab.key ? { backgroundColor: settings.primaryColor } : {}}>
                {tab.icon}{tab.label}
                {tab.key === 'ai' && <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-yellow-400 text-yellow-900 rounded-full font-bold">AI</span>}
                {tab.key === 'customize' && <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">{customizeSections.length}</span>}
              </button>
            ))}
          </nav>
          <div className="mt-5 p-3 rounded-xl text-white text-xs" style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, #1a3517)` }}>
            <p className="font-semibold opacity-90">Quick Stats</p>
            <div className="mt-2 space-y-1 opacity-75">
              <div className="flex justify-between"><span>Products</span><span className="font-bold">{products.length}</span></div>
              <div className="flex justify-between"><span>Orders</span><span className="font-bold">{orders.length}</span></div>
              <div className="flex justify-between"><span>Revenue</span><span className="font-bold">₹{(totalRevenue / 1000).toFixed(1)}k</span></div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10 flex">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 text-[9px] font-medium"
              style={activeTab === tab.key ? { color: settings.primaryColor } : { color: '#9ca3af' }}>
              {tab.icon}{tab.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 pb-24 md:pb-8 min-w-0">

          {/* ── DASHBOARD ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-5">
              <div><h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2><p className="text-sm text-gray-400 mt-0.5">Welcome back! Here's your store at a glance.</p></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: '+12.5%', up: true, icon: <IndianRupee size={18} />, color: 'bg-emerald-500' },
                  { label: 'Total Orders', value: orders.length, change: '+8.2%', up: true, icon: <ShoppingCart size={18} />, color: 'bg-blue-500' },
                  { label: 'Products', value: products.length, change: `+${products.length - initialProducts.length + 3}`, up: true, icon: <Package size={18} />, color: 'bg-violet-500' },
                  { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, change: 'need review', up: false, icon: <Clock size={18} />, color: 'bg-orange-500' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-9 h-9 ${s.color} rounded-lg flex items-center justify-center text-white`}>{s.icon}</div>
                      <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${s.up ? 'text-emerald-600' : 'text-orange-500'}`}>
                        {s.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{s.change}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-gray-800">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800">Revenue Overview</h3><select className="text-xs border rounded-lg px-2 py-1.5 text-gray-500 outline-none"><option>Last 7 days</option><option>Last 30 days</option></select></div>
                  <div className="flex items-end gap-1.5 h-44">
                    {[65, 45, 78, 52, 90, 68, 85].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="w-full rounded-t-md" style={{ height: `${h}%`, backgroundColor: settings.primaryColor }} />
                        <span className="text-[9px] text-gray-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
                  <div className="space-y-3">
                    {['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled'].map(s => {
                      const count = orders.filter(o => o.status === s).length;
                      const cols: Record<string, string> = { Delivered: '#22c55e', Shipped: '#3b82f6', Processing: '#eab308', Pending: '#9ca3af', Cancelled: '#f87171' };
                      return (
                        <div key={s}>
                          <div className="flex justify-between text-xs mb-1"><span className="text-gray-600">{s}</span><span className="font-semibold">{count}</span></div>
                          <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-full rounded-full" style={{ width: `${(count / orders.length) * 100}%`, backgroundColor: cols[s] }} /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800">Recent Orders</h3><button onClick={() => setActiveTab('orders')} className="text-sm font-medium hover:underline" style={{ color: settings.primaryColor }}>View All →</button></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-left text-gray-400 text-xs border-b"><th className="pb-2">Order</th><th className="pb-2">Customer</th><th className="pb-2">Amount</th><th className="pb-2">Status</th></tr></thead>
                    <tbody>{orders.slice(0, 5).map(o => (<tr key={o.id} className="border-b last:border-0 hover:bg-gray-50"><td className="py-2.5 font-medium text-gray-700 text-xs">{o.id}</td><td className="py-2.5 text-gray-600 text-xs">{o.customer}</td><td className="py-2.5 font-semibold text-gray-800 text-xs">₹{o.total.toLocaleString()}</td><td className="py-2.5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[o.status]}`}>{statusIcon[o.status]}{o.status}</span></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div><h2 className="text-xl font-bold text-gray-800">Products</h2><p className="text-sm text-gray-400">{products.length} products in store</p></div>
                <button onClick={() => setShowAddProduct(!showAddProduct)} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium shadow hover:opacity-90" style={{ backgroundColor: settings.primaryColor }}><Plus size={15} /> Add Product</button>
              </div>
              {showAddProduct && (
                <div className="bg-white rounded-xl p-5 shadow-sm border border-dashed border-gray-300">
                  <h3 className="font-semibold text-gray-800 mb-4">New Product</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="Product Name" value={newProduct.name || ''} onChange={v => setNewProduct(p => ({ ...p, name: v }))} placeholder="e.g. Organic Turmeric" />
                    <div><label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Category</label><select value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2D5A27]">{initialCategories.map(c => <option key={c.id}>{c.name}</option>)}</select></div>
                    <Field label="Price (₹)" value={newProduct.price || ''} onChange={v => setNewProduct(p => ({ ...p, price: Number(v) }))} type="number" placeholder="249" />
                    <Field label="Original Price (₹)" value={newProduct.originalPrice || ''} onChange={v => setNewProduct(p => ({ ...p, originalPrice: Number(v) }))} type="number" placeholder="299" />
                    <Field label="Weight / Volume" value={newProduct.weight || ''} onChange={v => setNewProduct(p => ({ ...p, weight: v }))} placeholder="200g" />
                    <Field label="Image URL" value={newProduct.image || ''} onChange={v => setNewProduct(p => ({ ...p, image: v }))} placeholder="https://..." />
                    <div className="md:col-span-2"><label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</label><textarea rows={2} value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} placeholder="Product description..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2D5A27] resize-none" /></div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={saveProduct} className="px-5 py-2 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-90" style={{ backgroundColor: settings.primaryColor }}><Save size={14} /> Save Product</button>
                    <button onClick={() => setShowAddProduct(false)} className="px-5 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                  </div>
                </div>
              )}
              <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={searchProducts} onChange={e => setSearchProducts(e.target.value)} placeholder="Search products..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#2D5A27] bg-white" /></div>
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500"><tr className="text-left"><th className="px-4 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold hidden md:table-cell">Category</th><th className="px-4 py-3 font-semibold">Price</th><th className="px-4 py-3 font-semibold hidden md:table-cell">Stock</th><th className="px-4 py-3 font-semibold hidden lg:table-cell">Rating</th><th className="px-4 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody>
                      {filteredProducts.map(product =>
                        editingProduct?.id === product.id ? (
                          <tr key={product.id} className="border-t bg-amber-50">
                            <td className="px-4 py-3"><input value={editingProduct.name} onChange={e => setEditingProduct(p => p ? { ...p, name: e.target.value } : p)} className="border rounded px-2 py-1 text-xs w-full outline-none focus:ring-1 focus:ring-[#2D5A27]" /></td>
                            <td className="px-4 py-3 hidden md:table-cell"><select value={editingProduct.category} onChange={e => setEditingProduct(p => p ? { ...p, category: e.target.value } : p)} className="border rounded px-2 py-1 text-xs outline-none">{initialCategories.map(c => <option key={c.id}>{c.name}</option>)}</select></td>
                            <td className="px-4 py-3"><input type="number" value={editingProduct.price} onChange={e => setEditingProduct(p => p ? { ...p, price: Number(e.target.value) } : p)} className="border rounded px-2 py-1 text-xs w-20 outline-none" /></td>
                            <td className="px-4 py-3 hidden md:table-cell"><select value={editingProduct.inStock ? 'in' : 'out'} onChange={e => setEditingProduct(p => p ? { ...p, inStock: e.target.value === 'in' } : p)} className="border rounded px-2 py-1 text-xs outline-none"><option value="in">In Stock</option><option value="out">Out of Stock</option></select></td>
                            <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">—</td>
                            <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => { setProducts(prev => prev.map(p => p.id === product.id ? { ...p, name: editingProduct.name, price: editingProduct.price, inStock: editingProduct.inStock, category: editingProduct.category } : p)); setEditingProduct(null); showNotif('✅ Updated!'); }} className="px-2 py-1 bg-green-600 text-white rounded text-xs">Save</button><button onClick={() => setEditingProduct(null)} className="px-2 py-1 border rounded text-xs text-gray-600">Cancel</button></div></td>
                          </tr>
                        ) : (
                          <tr key={product.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3"><div className="flex items-center gap-2.5"><img src={product.image} alt={product.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop'; }} /><div className="min-w-0"><p className="font-medium text-gray-800 text-xs truncate max-w-[140px]">{product.name}</p>{product.badge && <span className="text-[9px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">{product.badge}</span>}</div></div></td>
                            <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{product.category}</td>
                            <td className="px-4 py-3"><div className="text-xs font-semibold text-gray-800">₹{product.price}</div>{product.originalPrice > product.price && <div className="text-[9px] text-gray-400 line-through">₹{product.originalPrice}</div>}</td>
                            <td className="px-4 py-3 hidden md:table-cell"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.inStock ? 'In Stock' : 'Out of Stock'}</span></td>
                            <td className="px-4 py-3 hidden lg:table-cell"><span className="flex items-center gap-1 text-xs text-gray-500"><Star size={11} className="fill-yellow-400 text-yellow-400" />{product.rating} ({product.reviews})</span></td>
                            <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => setEditingProduct(product)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={13} /></button><button onClick={() => { setProducts(prev => prev.filter(p => p.id !== product.id)); showNotif('🗑️ Deleted.'); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={13} /></button></div></td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t text-xs text-gray-400">Showing {filteredProducts.length} of {products.length} products</div>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div><h2 className="text-xl font-bold text-gray-800">Orders</h2><p className="text-sm text-gray-400">Track and manage customer orders</p></div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">{(['All', 'Pending', 'Processing', 'Shipped', 'Delivered'] as const).map(s => { const count = s === 'All' ? orders.length : orders.filter(o => o.status === s).length; return <div key={s} className="bg-white border rounded-xl p-3 text-center shadow-sm"><p className="text-lg font-bold text-gray-800">{count}</p><p className="text-xs text-gray-400">{s}</p></div>; })}</div>
              <div className="space-y-2.5">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: settings.primaryColor }}>{order.customer[0]}</div>
                        <div className="min-w-0"><p className="font-semibold text-gray-800 text-sm">{order.customer}</p><p className="text-xs text-gray-400">{order.id} · {order.date}</p></div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-bold text-gray-800 text-sm hidden sm:block">₹{order.total.toLocaleString()}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[order.status]}`}>{statusIcon[order.status]}{order.status}</span>
                        {expandedOrder === order.id ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                      </div>
                    </div>
                    {expandedOrder === order.id && (
                      <div className="border-t bg-gray-50 px-4 py-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2 text-sm"><div className="flex items-center gap-2 text-gray-600"><Mail size={13} />{order.email}</div><div className="flex items-center gap-2 text-gray-600"><Phone size={13} />{order.phone}</div><div className="flex items-center gap-2 text-gray-600"><ShoppingCart size={13} />{order.items} items · {order.payment}</div></div>
                          <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Update Status</p><div className="flex flex-wrap gap-1.5">{(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map(s => (<button key={s} onClick={() => updateOrderStatus(order.id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${order.status === s ? 'text-white border-transparent' : 'text-gray-600 bg-white hover:bg-gray-100'}`} style={order.status === s ? { backgroundColor: settings.primaryColor } : {}}>{s}</button>))}</div></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div><h2 className="text-xl font-bold text-gray-800">Customers</h2><p className="text-sm text-gray-400">View and manage your customer base</p></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[{ label: 'Total Customers', value: '3,847', icon: <Users size={17} />, color: 'bg-blue-500' }, { label: 'New This Month', value: '234', icon: <TrendingUp size={17} />, color: 'bg-emerald-500' }, { label: 'Repeat Buyers', value: '68%', icon: <Award size={17} />, color: 'bg-violet-500' }].map((s, i) => (
                  <div key={i} className="bg-white border rounded-xl p-4 flex items-center gap-3 shadow-sm"><div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>{s.icon}</div><div><p className="text-xl font-bold text-gray-800">{s.value}</p><p className="text-xs text-gray-400">{s.label}</p></div></div>
                ))}
              </div>
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500"><tr className="text-left"><th className="px-4 py-3 font-semibold">Customer</th><th className="px-4 py-3 font-semibold hidden md:table-cell">Email</th><th className="px-4 py-3 font-semibold">Orders</th><th className="px-4 py-3 font-semibold">Total Spent</th><th className="px-4 py-3 font-semibold hidden lg:table-cell">Last Order</th></tr></thead>
                    <tbody>
                      {[{ name: 'Priya Sharma', email: 'priya@email.com', orders: 12, spent: 8450, last: '2024-01-15' }, { name: 'Rajesh Kumar', email: 'rajesh@email.com', orders: 8, spent: 5670, last: '2024-01-15' }, { name: 'Anita Devi', email: 'anita@email.com', orders: 23, spent: 15890, last: '2024-01-14' }, { name: 'Suresh Patel', email: 'suresh@email.com', orders: 5, spent: 2340, last: '2024-01-14' }, { name: 'Meena Rao', email: 'meena@email.com', orders: 15, spent: 11200, last: '2024-01-13' }, { name: 'Kiran Reddy', email: 'kiran@email.com', orders: 3, spent: 1890, last: '2024-01-13' }].map((c, i) => (
                        <tr key={i} className="border-t hover:bg-gray-50"><td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: settings.primaryColor }}>{c.name.split(' ').map(n => n[0]).join('')}</div><span className="font-medium text-gray-800 text-xs">{c.name}</span></div></td><td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{c.email}</td><td className="px-4 py-3 text-gray-600 text-xs font-medium">{c.orders}</td><td className="px-4 py-3 font-semibold text-gray-800 text-xs">₹{c.spent.toLocaleString()}</td><td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{c.last}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── CUSTOMIZE ── */}
          {activeTab === 'customize' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div><h2 className="text-xl font-bold text-gray-800">Store Customization</h2><p className="text-sm text-gray-400">Complete control over every part of your store</p></div>
                <button onClick={saveSettings} className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-medium shadow transition-all ${savedSettings ? 'bg-green-600' : 'hover:opacity-90'}`} style={!savedSettings ? { backgroundColor: settings.primaryColor } : {}}>{savedSettings ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save All Changes</>}</button>
              </div>

              <div className="flex gap-4">
                {/* Sub-nav */}
                <div className="hidden lg:block w-48 flex-shrink-0">
                  <div className="bg-white rounded-xl border shadow-sm p-2 space-y-0.5 sticky top-[73px]">
                    {customizeSections.map(s => (
                      <button key={s.key} onClick={() => setActiveCustomize(s.key)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeCustomize === s.key ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                        style={activeCustomize === s.key ? { backgroundColor: settings.primaryColor } : {}}>
                        {s.icon}{s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile section picker */}
                <div className="lg:hidden w-full mb-2">
                  <select value={activeCustomize} onChange={e => setActiveCustomize(e.target.value as CustomizeSection)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2D5A27] bg-white">
                    {customizeSections.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                </div>

                {/* Section Content */}
                <div className="flex-1 min-w-0 space-y-4">

                  {/* BRAND & LOGO */}
                  {activeCustomize === 'brand' && (
                    <>
                      <SectionCard title="Store Identity" icon={<Layers size={15} />}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Store Name" value={settings.storeName} onChange={v => set('storeName', v)} />
                          <Field label="Tagline / Slogan" value={settings.tagline} onChange={v => set('tagline', v)} />
                        </div>
                      </SectionCard>

                      <SectionCard title="Logo" icon={<Image size={15} />}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Field label="Logo Image URL" value={settings.logoUrl} onChange={v => set('logoUrl', v)} placeholder="https://your-domain.com/logo.png" hint="Paste an image URL. Leave empty to use text logo." />
                            <Field label="Logo Text / Initials" value={settings.logoText} onChange={v => set('logoText', v)} placeholder="V" hint="Used when no logo image is set." />
                            <Field label="Favicon Emoji" value={settings.faviconEmoji} onChange={v => set('faviconEmoji', v)} placeholder="🌿" hint="Emoji shown as browser tab icon." />
                          </div>
                          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl border p-6 gap-4">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Logo Preview</p>
                            <div className="flex items-center gap-3">
                              {settings.logoUrl ? (
                                <img src={settings.logoUrl} alt="logo preview" className="w-12 h-12 rounded-xl object-cover shadow" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              ) : (
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow" style={{ backgroundColor: settings.primaryColor }}>{settings.logoText || settings.storeName[0]}</div>
                              )}
                              <div>
                                <p className="font-bold text-gray-800 text-lg leading-tight">{settings.storeName}</p>
                                <p className="text-[9px] text-gray-400 tracking-widest uppercase">{settings.tagline}</p>
                              </div>
                            </div>
                            <div className="text-2xl">{settings.faviconEmoji}</div>
                            <p className="text-[10px] text-gray-400">Browser tab favicon</p>
                          </div>
                        </div>
                      </SectionCard>
                    </>
                  )}

                  {/* COLORS */}
                  {activeCustomize === 'colors' && (
                    <>
                      <SectionCard title="Brand Colors" icon={<Palette size={15} />}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ColorField label="Primary Color (Buttons, links, highlights)" value={settings.primaryColor} onChange={v => set('primaryColor', v)} />
                          <ColorField label="Primary Dark (Hover states, header)" value={settings.primaryDark} onChange={v => set('primaryDark', v)} />
                          <ColorField label="Accent Color (Gold/yellow highlights)" value={settings.accentColor} onChange={v => set('accentColor', v)} />
                          <ColorField label="Accent Dark (Hover accent)" value={settings.accentDark} onChange={v => set('accentDark', v)} />
                          <ColorField label="Background Color (Page bg)" value={settings.bgColor} onChange={v => set('bgColor', v)} />
                          <ColorField label="Text Color (Body text)" value={settings.textColor} onChange={v => set('textColor', v)} />
                        </div>
                      </SectionCard>

                      <SectionCard title="Live Preview" icon={<Eye size={15} />}>
                        <div className="p-4 rounded-xl border-2" style={{ backgroundColor: settings.bgColor, borderColor: settings.primaryColor }}>
                          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg" style={{ backgroundColor: settings.primaryDark }}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: settings.primaryColor }}>{settings.logoText || settings.storeName[0]}</div>
                            <span className="font-bold text-white">{settings.storeName}</span>
                            <div className="ml-auto flex gap-2">
                              <div className="px-3 py-1 rounded-full text-xs font-bold text-gray-800" style={{ backgroundColor: settings.accentColor }}>Cart</div>
                            </div>
                          </div>
                          <div className="flex gap-3 mb-3">
                            <div className="px-4 py-2 rounded-full text-white text-xs font-bold" style={{ backgroundColor: settings.primaryColor }}>Shop Now</div>
                            <div className="px-4 py-2 rounded-full text-xs font-bold border-2" style={{ borderColor: settings.primaryColor, color: settings.primaryColor }}>Learn More</div>
                          </div>
                          <p className="text-sm" style={{ color: settings.textColor }}>Sample body text in your brand colors.</p>
                        </div>
                      </SectionCard>
                    </>
                  )}

                  {/* TYPOGRAPHY */}
                  {activeCustomize === 'typography' && (
                    <SectionCard title="Typography" icon={<Type size={15} />}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Heading Font</label>
                          <select value={settings.headingFont} onChange={e => set('headingFont', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2D5A27]">
                            {['Playfair Display', 'Merriweather', 'Lora', 'Crimson Text', 'EB Garamond', 'Libre Baskerville', 'Poppins', 'Raleway', 'Oswald', 'Montserrat'].map(f => <option key={f}>{f}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Body Font</label>
                          <select value={settings.bodyFont} onChange={e => set('bodyFont', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2D5A27]">
                            {['Inter', 'Roboto', 'Open Sans', 'Lato', 'Nunito', 'Source Sans Pro', 'DM Sans', 'Mulish', 'Outfit', 'Plus Jakarta Sans'].map(f => <option key={f}>{f}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Base Font Size (px)</label>
                          <select value={settings.fontSize} onChange={e => set('fontSize', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2D5A27]">
                            {['14', '15', '16', '17', '18'].map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="mt-4 p-4 rounded-xl border bg-gray-50">
                        <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold mb-2">Typography Preview</p>
                        <p className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: `${settings.headingFont}, serif` }}>The Quick Brown Fox Jumps</p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: `${settings.bodyFont}, sans-serif`, fontSize: `${settings.fontSize}px` }}>This is body text in {settings.bodyFont}. Your store content will appear in this font at {settings.fontSize}px size.</p>
                      </div>
                    </SectionCard>
                  )}

                  {/* HEADER & NAV */}
                  {activeCustomize === 'header' && (
                    <>
                      <SectionCard title="Announcement Bar" icon={<Megaphone size={15} />}>
                        <Toggle value={settings.announcementBarActive} onChange={v => set('announcementBarActive', v)} label="Show Announcement Bar" description="The top strip that shows shipping & promo messages" />
                        <Field label="Announcement Text" value={settings.announcementBarText} onChange={v => set('announcementBarText', v)} placeholder="Free shipping on orders above ₹499" />
                        <ColorField label="Bar Background Color" value={settings.announcementBarColor} onChange={v => set('announcementBarColor', v)} />
                        {settings.announcementBarActive && (
                          <div className="p-3 rounded-lg text-white text-xs text-center font-medium" style={{ backgroundColor: settings.announcementBarColor }}>{settings.announcementBarText}</div>
                        )}
                      </SectionCard>

                      <SectionCard title="Search Bar" icon={<Search size={15} />}>
                        <Field label="Search Placeholder Text" value={settings.searchPlaceholder} onChange={v => set('searchPlaceholder', v)} placeholder="Search for products..." />
                      </SectionCard>

                      <SectionCard title="Navigation Links" icon={<Link2 size={15} />}>
                        <p className="text-xs text-gray-400">Manage the links shown in the top navigation bar.</p>
                        <div className="space-y-2">
                          {settings.navLinks.map((link, i) => (
                            <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border">
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <input value={link.label} onChange={e => { const nl = [...settings.navLinks]; nl[i] = { ...nl[i], label: e.target.value }; set('navLinks', nl); }} placeholder="Label" className="border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-[#2D5A27]" />
                                <input value={link.href} onChange={e => { const nl = [...settings.navLinks]; nl[i] = { ...nl[i], href: e.target.value }; set('navLinks', nl); }} placeholder="URL / #section" className="border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-[#2D5A27]" />
                              </div>
                              <button onClick={() => set('navLinks', settings.navLinks.filter((_, idx) => idx !== i))} className="p-1 text-red-400 hover:bg-red-50 rounded"><Trash2 size={13} /></button>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => set('navLinks', [...settings.navLinks, { label: 'New Page', href: '#' }])} className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 border border-dashed rounded-lg text-gray-600 hover:bg-gray-50 w-full justify-center"><Plus size={13} /> Add Nav Link</button>
                      </SectionCard>
                    </>
                  )}

                  {/* HERO BANNERS */}
                  {activeCustomize === 'hero' && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 flex items-start gap-2">
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                        These are the rotating hero banners at the top of your homepage. You can edit titles, descriptions, CTAs, and background images.
                      </div>
                      {settings.heroBanners.map((banner, i) => (
                        <SectionCard key={banner.id} title={`Banner ${i + 1}: ${banner.title}`} icon={<Image size={15} />}>
                          <Toggle value={banner.active} onChange={v => { const b = [...settings.heroBanners]; b[i] = { ...b[i], active: v }; set('heroBanners', b); }} label="Active (show this banner)" />
                          <div className="grid md:grid-cols-2 gap-3">
                            <Field label="Main Title" value={banner.title} onChange={v => { const b = [...settings.heroBanners]; b[i] = { ...b[i], title: v }; set('heroBanners', b); }} />
                            <Field label="Subtitle" value={banner.subtitle} onChange={v => { const b = [...settings.heroBanners]; b[i] = { ...b[i], subtitle: v }; set('heroBanners', b); }} />
                            <div className="md:col-span-2"><TextArea label="Description" value={banner.description} onChange={v => { const b = [...settings.heroBanners]; b[i] = { ...b[i], description: v }; set('heroBanners', b); }} rows={2} /></div>
                            <Field label="CTA Button Text" value={banner.cta} onChange={v => { const b = [...settings.heroBanners]; b[i] = { ...b[i], cta: v }; set('heroBanners', b); }} placeholder="Shop Now" />
                            <div><label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Background Color</label><div className="flex items-center gap-2"><input type="color" value={banner.bgColor} onChange={e => { const b = [...settings.heroBanners]; b[i] = { ...b[i], bgColor: e.target.value }; set('heroBanners', b); }} className="w-10 h-9 rounded-lg border cursor-pointer p-0.5" /><input value={banner.bgColor} onChange={e => { const b = [...settings.heroBanners]; b[i] = { ...b[i], bgColor: e.target.value }; set('heroBanners', b); }} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-[#2D5A27]" /></div></div>
                            <div className="md:col-span-2"><Field label="Background Image URL" value={banner.imageUrl} onChange={v => { const b = [...settings.heroBanners]; b[i] = { ...b[i], imageUrl: v }; set('heroBanners', b); }} placeholder="https://images.unsplash.com/..." hint="Paste an Unsplash or CDN image URL" /></div>
                          </div>
                          {banner.imageUrl && <img src={banner.imageUrl} alt="preview" className="w-full h-28 object-cover rounded-lg mt-2" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                        </SectionCard>
                      ))}
                    </div>
                  )}

                  {/* PROMO BANNERS */}
                  {activeCustomize === 'promo' && (
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 flex items-start gap-2">
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                        These are the two promotional cards shown below the hero section (Deal of the Day and Special Offer).
                      </div>
                      {settings.promoCards.map((card, i) => (
                        <SectionCard key={card.id} title={`Promo Card ${i + 1}: ${card.title}`} icon={<Megaphone size={15} />}>
                          <Toggle value={card.active} onChange={v => { const c = [...settings.promoCards]; c[i] = { ...c[i], active: v }; set('promoCards', c); }} label="Show this promo card" />
                          <div className="grid md:grid-cols-2 gap-3">
                            <Field label="Badge Text" value={card.badge} onChange={v => { const c = [...settings.promoCards]; c[i] = { ...c[i], badge: v }; set('promoCards', c); }} placeholder="Deal of the Day" />
                            <Field label="Title" value={card.title} onChange={v => { const c = [...settings.promoCards]; c[i] = { ...c[i], title: v }; set('promoCards', c); }} />
                            <div className="md:col-span-2"><TextArea label="Description" value={card.description} onChange={v => { const c = [...settings.promoCards]; c[i] = { ...c[i], description: v }; set('promoCards', c); }} rows={2} /></div>
                            <Field label="CTA Button" value={card.cta} onChange={v => { const c = [...settings.promoCards]; c[i] = { ...c[i], cta: v }; set('promoCards', c); }} placeholder="Shop Now" />
                            <Field label="Coupon Code (optional)" value={card.couponCode || ''} onChange={v => { const c = [...settings.promoCards]; c[i] = { ...c[i], couponCode: v }; set('promoCards', c); }} placeholder="WELCOME10" />
                            <div><label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Gradient From</label><div className="flex items-center gap-2"><input type="color" value={card.bgFrom} onChange={e => { const c = [...settings.promoCards]; c[i] = { ...c[i], bgFrom: e.target.value }; set('promoCards', c); }} className="w-10 h-9 rounded-lg border cursor-pointer p-0.5" /><input value={card.bgFrom} onChange={e => { const c = [...settings.promoCards]; c[i] = { ...c[i], bgFrom: e.target.value }; set('promoCards', c); }} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none" /></div></div>
                            <div><label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Gradient To</label><div className="flex items-center gap-2"><input type="color" value={card.bgTo} onChange={e => { const c = [...settings.promoCards]; c[i] = { ...c[i], bgTo: e.target.value }; set('promoCards', c); }} className="w-10 h-9 rounded-lg border cursor-pointer p-0.5" /><input value={card.bgTo} onChange={e => { const c = [...settings.promoCards]; c[i] = { ...c[i], bgTo: e.target.value }; set('promoCards', c); }} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none" /></div></div>
                          </div>
                          <div className="mt-2 p-3 rounded-xl text-white text-xs font-medium" style={{ background: `linear-gradient(135deg, ${card.bgFrom}, ${card.bgTo})` }}>Preview: {card.badge} · {card.title}{card.couponCode ? ` · Code: ${card.couponCode}` : ''}</div>
                        </SectionCard>
                      ))}
                    </div>
                  )}

                  {/* FOOTER & SOCIAL */}
                  {activeCustomize === 'footer' && (
                    <>
                      <SectionCard title="Footer Settings" icon={<AlignLeft size={15} />}>
                        <TextArea label="About Store Text" value={settings.footerAbout} onChange={v => set('footerAbout', v)} rows={3} placeholder="Brief description of your store for the footer..." />
                        <ColorField label="Footer Background Color" value={settings.footerBgColor} onChange={v => set('footerBgColor', v)} />
                      </SectionCard>

                      <SectionCard title="Social Media Links" icon={<Globe size={15} />}>
                        <p className="text-xs text-gray-400">Enable platforms and add your URLs. Disabled platforms won't show in footer.</p>
                        <div className="space-y-3">
                          {settings.socialLinks.map((social, i) => (
                            <div key={social.platform} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border">
                              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">{socialIcons[social.platform]}</div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-700 capitalize mb-1">{social.platform}</p>
                                <input value={social.url} onChange={e => { const sl = [...settings.socialLinks]; sl[i] = { ...sl[i], url: e.target.value }; set('socialLinks', sl); }} placeholder={`https://${social.platform}.com/yourpage`} className="w-full border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-[#2D5A27] bg-white" disabled={!social.active} />
                              </div>
                              <button onClick={() => { const sl = [...settings.socialLinks]; sl[i] = { ...sl[i], active: !social.active }; set('socialLinks', sl); }} className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${social.active ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}>{social.active ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                            </div>
                          ))}
                        </div>
                      </SectionCard>
                    </>
                  )}

                  {/* SEO */}
                  {activeCustomize === 'seo' && (
                    <SectionCard title="SEO & Meta Tags" icon={<Globe size={15} />}>
                      <Field label="Meta Title" value={settings.metaTitle} onChange={v => set('metaTitle', v)} placeholder="Store Name – Tagline" hint={`${settings.metaTitle.length}/60 characters (recommended: under 60)`} />
                      <TextArea label="Meta Description" value={settings.metaDescription} onChange={v => set('metaDescription', v)} rows={3} placeholder="Describe your store in 160 characters..." />
                      <p className="text-[10px] text-gray-400 -mt-2">{settings.metaDescription.length}/160 characters</p>
                      <Field label="Meta Keywords" value={settings.metaKeywords} onChange={v => set('metaKeywords', v)} placeholder="organic spices, cold pressed oil, millets..." hint="Comma-separated keywords" />
                      <div className="mt-2 p-4 bg-white border rounded-xl">
                        <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Google Search Preview</p>
                        <p className="text-blue-600 text-sm font-medium truncate">{settings.metaTitle || settings.storeName}</p>
                        <p className="text-green-700 text-xs">https://www.{settings.storeName.toLowerCase().replace(/\s/g, '')}.com</p>
                        <p className="text-gray-600 text-xs mt-0.5 line-clamp-2">{settings.metaDescription || 'Your store description will appear here...'}</p>
                      </div>
                    </SectionCard>
                  )}

                  {/* PAYMENTS */}
                  {activeCustomize === 'payments' && (
                    <>
                      <SectionCard title="Payment Gateways" icon={<ShieldCheck size={15} />}>
                        <div className="divide-y">
                          <Toggle value={settings.enableRazorpay} onChange={v => set('enableRazorpay', v)} label="Razorpay" description="Cards, Net Banking, EMI, Wallets" />
                          <Toggle value={settings.enableUPI} onChange={v => set('enableUPI', v)} label="UPI" description="Google Pay, PhonePe, BHIM, Paytm" />
                          <Toggle value={settings.enableCOD} onChange={v => set('enableCOD', v)} label="Cash on Delivery (COD)" description="Customer pays on delivery" />
                        </div>
                        <div className="mt-2 p-3 bg-amber-50 rounded-lg text-xs text-amber-700 flex items-start gap-2 border border-amber-200"><AlertCircle size={13} className="flex-shrink-0 mt-0.5" />Disabling all payment methods will prevent checkout. Keep at least one enabled.</div>
                      </SectionCard>

                      <SectionCard title="Shipping & Pricing" icon={<Truck size={15} />}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Free Shipping Minimum (₹)" value={settings.freeShippingMin} onChange={v => set('freeShippingMin', Number(v))} type="number" />
                          <Field label="Currency Symbol" value={settings.currency} onChange={v => set('currency', v)} placeholder="₹" />
                        </div>
                      </SectionCard>
                    </>
                  )}

                  {/* BUSINESS INFO */}
                  {activeCustomize === 'business' && (
                    <>
                      <SectionCard title="Contact & Location" icon={<MapPin size={15} />}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Phone Number" value={settings.phone} onChange={v => set('phone', v)} />
                          <Field label="Email Address" value={settings.email} onChange={v => set('email', v)} />
                          <Field label="Street Address" value={settings.address} onChange={v => set('address', v)} />
                          <Field label="City & State" value={settings.city} onChange={v => set('city', v)} />
                          <Field label="Business Hours" value={settings.hours} onChange={v => set('hours', v)} placeholder="Mon–Sat: 9 AM – 7 PM" />
                          <Field label="WhatsApp Number" value={settings.whatsappNumber} onChange={v => set('whatsappNumber', v)} placeholder="+919876543210" />
                        </div>
                      </SectionCard>

                      <SectionCard title="Legal & Compliance" icon={<ShieldCheck size={15} />}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="GST Number" value={settings.gstNumber} onChange={v => set('gstNumber', v)} />
                          <Field label="Return Policy (days)" value={settings.returnDays} onChange={v => set('returnDays', Number(v))} type="number" hint="Number of days for return/refund" />
                        </div>
                      </SectionCard>

                      <SectionCard title="Social Handles" icon={<Instagram size={15} />}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Instagram Handle" value={settings.instagramHandle} onChange={v => set('instagramHandle', v)} placeholder="@velchekku" />
                          <Field label="WhatsApp Business" value={settings.whatsappNumber} onChange={v => set('whatsappNumber', v)} placeholder="+919876543210" />
                        </div>
                      </SectionCard>
                    </>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* ── AI ASSISTANT ── */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow" style={{ backgroundColor: settings.primaryColor }}><Bot size={20} /></div>
                <div><h2 className="text-xl font-bold text-gray-800">AI Store Assistant</h2><p className="text-sm text-gray-400">Powered by Claude · Knows your store context</p></div>
                <span className="ml-1 text-[10px] px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-200">LIVE AI</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { icon: <TrendingUp size={13} />, label: 'Analyze sales', prompt: 'Analyze my current sales data and give me 3 actionable insights to grow revenue this month.' },
                  { icon: <Tag size={13} />, label: 'Pricing tips', prompt: 'Suggest optimal pricing for my top products to increase both conversion and profit margin.' },
                  { icon: <MessageSquare size={13} />, label: 'Write descriptions', prompt: 'Write compelling product descriptions for my top 3 bestsellers to improve conversion rate.' },
                  { icon: <Zap size={13} />, label: 'Growth ideas', prompt: 'Give me 5 creative marketing ideas for selling traditional Tamil Nadu groceries online.' },
                ].map((q, i) => (
                  <button key={i} onClick={() => setAiInput(q.prompt)} className="flex items-center gap-2 p-3 bg-white rounded-xl border shadow-sm hover:shadow-md text-xs text-gray-600 font-medium text-left transition-all">
                    <span style={{ color: settings.primaryColor }}>{q.icon}</span>{q.label}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl border shadow-sm flex flex-col" style={{ height: '460px' }}>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {aiMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: settings.primaryColor }}><Bot size={15} /></div>}
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`} style={msg.role === 'user' ? { backgroundColor: settings.primaryColor } : {}}>{msg.content}</div>
                      {msg.role === 'user' && <div className="w-8 h-8 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-gray-600">A</div>}
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: settings.primaryColor }}><Bot size={15} /></div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">{[0, 1, 2].map(i => <span key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}</div>
                    </div>
                  )}
                  <div ref={aiEndRef} />
                </div>
                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAiMessage(); } }} placeholder="Ask about sales, products, marketing, strategy..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2D5A27]" />
                    <button onClick={sendAiMessage} disabled={aiLoading || !aiInput.trim()} className="px-4 py-2.5 text-white rounded-xl font-medium text-sm disabled:opacity-40 flex items-center gap-1.5 hover:opacity-90" style={{ backgroundColor: settings.primaryColor }}><Send size={15} /><span className="hidden sm:inline">Send</span></button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 text-center">Claude AI · Your store context is automatically included</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
