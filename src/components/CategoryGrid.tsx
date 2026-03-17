import { categories } from '../data/products';

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-[#D4A853] text-sm font-semibold uppercase tracking-widest">Browse</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1 font-[Playfair_Display]">Shop by Category</h2>
        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 rounded-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, index) => (
          <a
            key={cat.id}
            href="#"
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-sm md:text-base">{cat.name}</h3>
              <p className="text-white/70 text-xs mt-0.5">{cat.count} Products</p>
              <div className="mt-2 flex items-center gap-1 text-[#E8C678] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now →
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
