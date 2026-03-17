import { useState } from 'react';
import ProductCard from './ProductCard';
import QuickView from './QuickView';
import { products, type Product } from '../data/products';

interface ProductSectionProps {
  title: string;
  subtitle: string;
  filter?: (p: Product) => boolean;
  limit?: number;
}

export default function ProductSection({ title, subtitle, filter, limit = 8 }: ProductSectionProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = filter ? products.filter(filter) : products;
  const categoryFilters = ['All', ...new Set(filteredProducts.map(p => p.category))];

  const displayProducts = activeFilter === 'All'
    ? filteredProducts.slice(0, limit)
    : filteredProducts.filter(p => p.category === activeFilter).slice(0, limit);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-6">
        <span className="text-[#D4A853] text-sm font-semibold uppercase tracking-widest">{subtitle}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1 font-[Playfair_Display]">{title}</h2>
        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 rounded-full" />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categoryFilters.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === cat
                ? 'bg-[#2D5A27] text-white shadow-md'
                : 'bg-[#FAF3E8] text-gray-600 hover:bg-[#2D5A27]/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayProducts.map((product, index) => (
          <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${index * 80}ms` }}>
            <ProductCard product={product} onQuickView={setQuickViewProduct} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <button className="border-2 border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27] hover:text-white px-8 py-3 rounded-full font-semibold transition-all text-sm uppercase tracking-wider">
          View All Products
        </button>
      </div>

      {quickViewProduct && (
        <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
}
