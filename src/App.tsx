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

// --- Professional Order Form (Connected to Supabase) ---
function QuickOrderForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", product: "Groundnut Oil 1L" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (response.ok) {
        setStatus("✅ Order received! We will call you soon.");
        setFormData({ name: "", phone: "", product: "Groundnut Oil 1L" }); // Reset form
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (error) {
      setStatus("❌ Could not connect to the database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-[#FAF3E8]/50 border-y border-[#2D5A27]/10">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#2D5A27]/5">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#2D5A27] mb-2">Quick Order</h3>
            <p className="text-gray-600 text-sm">Fill in your details and we'll handle the rest.</p>
          </div>

          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Your Name</label>
              <input 
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2D5A27] outline-none transition-all"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Phone Number</label>
              <input 
                type="tel"
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2D5A27] outline-none transition-all"
                placeholder="+91 00000 00000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Select Product</label>
              <select 
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none appearance-none cursor-pointer"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              >
                <option>Groundnut Oil 1L</option>
                <option>Coconut Oil 1L</option>
                <option>Sesame Oil 1L</option>
                <option>Organic Ghee 500ml</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2D5A27] text-white py-4 rounded-xl font-bold hover:bg-[#234a1f] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2D5A27]/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShoppingBag size={20} />}
              {loading ? "Processing..." : "Place Quick Order"}
            </button>
          </form>

          {status && (
            <div className={`mt-6 p-4 rounded-xl text-center font-medium ${status.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return (
      <StoreProvider>
        <AdminDashboard onClose={() => setShowAdmin(false)} />
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

        {/* Admin FAB Button */}
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#2D5A27] text-white rounded-full shadow-2xl hover:bg-[#234a1f] transition-all hover:scale-110 flex items-center justify-center group"
          title="Admin Dashboard"
        >
          <Settings size={22} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Admin Panel
          </span>
        </button>

        <main>
          <HeroBanner />
          <CategoryGrid />
          
          <ProductSection
            title="Featured Products"
            subtitle="Handpicked for You"
            limit={8}
          />

          <PromoBanner />

          <div className="bg-[#FAF3E8]/30">
            <ProductSection
              title="Best Sellers"
              subtitle="Most Popular"
              filter={(p) => p.tags.includes('bestseller') || p.reviews > 200}
              limit={4}
            />
          </div>

          <WhyChooseUs />

          <ProductSection
            title="New Arrivals"
            subtitle="Just Landed"
            filter={(p) => (p.badge === 'New' || p.badge === 'Premium')}
            limit={4}
          />

          {/* Quick Order Form replaces the Backend Test */}
          <QuickOrderForm />

          <Testimonials />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </StoreProvider>
  );
}
