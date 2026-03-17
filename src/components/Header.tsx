import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Phone, MapPin, ChevronDown, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';

export default function Header() {
  const { cartCount, setIsCartOpen, wishlist, setIsSearchOpen, searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#1E3D1A] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> +91 98765 43210</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin size={12} /> Chennai, Tamil Nadu</span>
          </div>
          <div className="flex items-center gap-1 text-[#E8C678]">
            <Truck size={12} />
            <span>Free shipping on orders above ₹499</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2D5A27] to-[#5C6B3C] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg font-[Playfair_Display]">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#2D5A27] font-[Playfair_Display] leading-tight">Velchekku</h1>
                <p className="text-[8px] text-[#5C6B3C] tracking-[0.2em] uppercase">Traditional & Organic</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for spices, oils, millets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full py-2.5 pl-4 pr-12 border-2 border-[#2D5A27]/20 rounded-full text-sm focus:outline-none focus:border-[#2D5A27] transition-colors bg-[#FAF3E8]/50"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#2D5A27] text-white p-2 rounded-full hover:bg-[#1E3D1A] transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 text-[#2D5A27] hover:bg-[#FAF3E8] rounded-full transition-colors">
                <Search size={20} />
              </button>
              <button className="hidden sm:flex items-center gap-1 p-2 text-[#2D5A27] hover:bg-[#FAF3E8] rounded-full transition-colors relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C44B2B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button className="hidden sm:flex items-center gap-1 p-2 text-[#2D5A27] hover:bg-[#FAF3E8] rounded-full transition-colors">
                <User size={20} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 bg-[#2D5A27] text-white px-3 py-2 rounded-full hover:bg-[#1E3D1A] transition-colors relative"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-[#C44B2B] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold absolute -top-1.5 -right-1.5">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#2D5A27]">
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="hidden lg:block border-t border-gray-100 bg-[#FAF3E8]/50">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-0">
              <div
                className="relative"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <button className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-[#2D5A27] hover:bg-[#2D5A27] hover:text-white transition-colors rounded-t-lg">
                  <Menu size={16} /> All Categories <ChevronDown size={14} />
                </button>
                {showCategories && (
                  <div className="absolute top-full left-0 bg-white shadow-xl rounded-b-xl border border-gray-100 w-64 z-50 animate-slideDown">
                    {categories.map(cat => (
                      <a key={cat.id} href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAF3E8] transition-colors group">
                        <div className="w-8 h-8 rounded-lg overflow-hidden">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-[#2D5A27] font-medium">{cat.name}</span>
                        <span className="ml-auto text-xs text-gray-400">({cat.count})</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {['Home', 'New Arrivals', 'Best Sellers', 'Organic', 'Offers', 'About Us'].map(item => (
                <a key={item} href="#" className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-[#2D5A27] hover:bg-white transition-colors">
                  {item}
                </a>
              ))}
              <a href="#" className="px-4 py-3 text-sm font-bold text-[#C44B2B] hover:bg-white transition-colors flex items-center gap-1">
                🔥 Sale
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg animate-slideDown">
          <div className="px-4 py-2">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2D5A27]"
              />
            </div>
            {['Home', 'All Categories', 'New Arrivals', 'Best Sellers', 'Organic', 'Offers', 'About Us', 'My Account', 'Wishlist'].map(item => (
              <a key={item} href="#" className="block py-3 px-2 text-sm font-medium text-gray-700 border-b border-gray-50 hover:text-[#2D5A27]">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
