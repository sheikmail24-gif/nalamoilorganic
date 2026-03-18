import { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import PromoBanner from './components/PromoBanner';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import Notification from './components/Notification';
import AdminDashboard from './components/AdminDashboard';
import { Settings, ShoppingBag, Loader2 } from 'lucide-react';

// --- Quick Order Form ---
function QuickOrderForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", product: "Groundnut Oil 1L" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("✅ Order received! We will call you soon.");
        setFormData({ name: "", phone: "", product: "Groundnut Oil 1L" });
      } else {
        setStatus("❌ Error saving order.");
      }
    } catch (error) {
      setStatus("❌ Connection Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-[#FAF3E8]/50 border-y border-[#2D5A27]/10">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#2D5A27]/5">
          <h3 className="text-3xl font-bold text-[#2D5A27] mb-6 text-center">Quick Order</h3>
          <form onSubmit={handleOrder} className="space-y-4">
            <input 
              className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-[#2D5A27]"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              type="tel"
              className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-[#2D5A27]"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
            <select 
              className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none"
              value={formData.product}
              onChange={(e) => setFormData({...formData, product: e.target.value})}
            >
              <option>Groundnut Oil 1L</option>
              <option>Coconut Oil 1L</option>
              <option>Sesame Oil 1L</option>
            </select>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2D5A27] text-white py-4 rounded-xl font-bold hover:bg-[#234a1f] transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShoppingBag size={20} />}
              {loading ? "Processing..." : "Place Quick Order"}
            </button>
          </form>
          {status && <div className="mt-4 p-3 text-center rounded-lg bg-gray-50 font-medium">{status}</div>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // --- ACCESS METHOD ---
  const handleAdminAccess = () => {
    const user = prompt("Admin Username:");
    const pass = prompt("Admin Password:");

    // USERNAME: admin | PASSWORD:Sm@2026 
    if (user === "admin" && pass === "Nalam2026") {
      setIsAdminAuthenticated(true);
      setShowAdmin(true);
    } else {
      alert("Invalid Credentials!");
    }
  };

  if (showAdmin && isAdminAuthenticated) {
    return (
      <StoreProvider>
        <AdminDashboard onClose={() => {
          setShowAdmin(false);
          setIsAdminAuthenticated(false);
        }} />
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#FEFCF9]">
        <Header />
        <SearchOverlay />
        <CartDrawer />
        <Notification />

        {/* This is your Access Button */}
        <button
          onClick={handleAdminAccess}
          className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#2D5A27] text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
        >
          <Settings size={22} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <main>
          <HeroBanner />
          <CategoryGrid />
          <ProductSection title="Featured Products" limit={8} />
          <PromoBanner />
          <WhyChooseUs />
          <QuickOrderForm />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}
