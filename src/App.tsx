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
import { Settings } from 'lucide-react';

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
            filter={(p) => p.badge === 'New' || p.badge === 'Premium'}
            limit={4}
          />

          <Testimonials />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </StoreProvider>
  );
}
