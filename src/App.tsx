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
import { Settings, Send } from 'lucide-react';

// --- New Backend Connection Component ---
function BackendTest() {
  const [userName, setUserName] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const callBackend = async () => {
    setLoading(true);
    try {
      // Calls your Vercel Function at /api/greet.js
      const response = await fetch(`/api/greet?name=${userName}`);
      const data = await response.json();
      setServerMessage(data.message);
    } catch (error) {
      setServerMessage("Error: Could not find backend API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-[#2D5A27] mb-2">Backend Connection Test</h3>
        <p className="text-gray-600 mb-6">Enter your name to verify the server is working.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input 
            type="text" 
            className="border-2 border-gray-200 p-3 rounded-xl outline-none focus:border-[#2D5A27] transition-all flex-1"
            placeholder="Your Name..." 
            value={userName}
            onChange={(e) => setUserName(e.target.value)} 
          />
          <button 
            onClick={callBackend}
            disabled={loading}
            className="bg-[#2D5A27] text-white px-8 py-3 rounded-xl hover:bg-[#234a1f] transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
          >
            {loading ? "Connecting..." : <><Send size={18} /> Test Connection</>}
          </button>
        </div>
        
        {serverMessage && (
          <div className="mt-6 p-4 bg-[#FAF3E8] rounded-lg border border-[#2D5A27]/20 text-[#2D5A27] font-medium animate-bounce">
            {serverMessage}
          </div>
        )}
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

          <Testimonials />
          
          {/* We added the Backend Test here */}
          <BackendTest />

          <Newsletter />
        </main>

        <Footer />
      </div>
    </StoreProvider>
  );
}
