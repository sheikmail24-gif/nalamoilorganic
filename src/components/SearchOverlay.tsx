import { X, Search, TrendingUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, addToCart } = useStore();

  if (!isSearchOpen) return null;

  const results = searchQuery.length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const trending = ['Turmeric', 'Coconut Oil', 'Millets', 'Jaggery', 'Black Pepper', 'Pickles'];

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
      <div className="max-w-2xl mx-auto mt-20 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
          <div className="flex items-center gap-3 p-4 border-b">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              autoFocus
              placeholder="Search for products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm focus:outline-none"
            />
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={18} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto p-4">
            {searchQuery.length < 2 ? (
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3 flex items-center gap-1">
                  <TrendingUp size={14} /> Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {trending.map(term => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-[#FAF3E8] text-sm text-gray-600 rounded-full hover:bg-[#2D5A27] hover:text-white transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">No products found for "{searchQuery}"</p>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-400 mb-2">{results.length} results found</p>
                {results.map(product => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF3E8] transition-colors cursor-pointer">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 truncate">{product.name}</h4>
                      <p className="text-xs text-gray-400">{product.category} • {product.weight}</p>
                      <span className="text-sm font-bold text-[#2D5A27]">₹{product.price}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-xs bg-[#2D5A27] text-white px-3 py-1.5 rounded-full hover:bg-[#1E3D1A] transition-colors flex-shrink-0"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
