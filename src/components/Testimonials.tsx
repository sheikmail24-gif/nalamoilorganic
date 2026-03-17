import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section className="bg-[#FAF3E8] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-[#D4A853] text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1 font-[Playfair_Display]">What Our Customers Say</h2>
          <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeIn relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="text-[#2D5A27]/10 absolute top-4 right-4" size={40} />
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 relative">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2D5A27] to-[#5C6B3C] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
