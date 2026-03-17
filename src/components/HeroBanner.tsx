import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Leaf, Truck } from 'lucide-react';
import { banners } from '../data/products';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[current];

  return (
    <section>
      <div className="relative overflow-hidden bg-gradient-to-r ${banner.bg}" style={{ minHeight: '480px' }}>
        <div className={`absolute inset-0 bg-gradient-to-r ${banner.bg} transition-all duration-700`} />
        <div className="absolute inset-0 opacity-20">
          <img src={banner.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 flex items-center min-h-[480px]">
          <div className="max-w-xl animate-fadeIn" key={current}>
            <span className="inline-block bg-[#D4A853] text-[#1E3D1A] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              {banner.title}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-[Playfair_Display] leading-tight">
              {banner.subtitle}
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              {banner.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#D4A853] hover:bg-[#E8C678] text-[#1E3D1A] font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-[#D4A853]/30 text-sm uppercase tracking-wider">
                {banner.cta} →
              </button>
              <button className="border-2 border-white/40 text-white px-8 py-3.5 rounded-full hover:bg-white/10 transition-all text-sm font-medium">
                Learn More
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 bottom-8">
            <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img src={banner.image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <button onClick={() => setCurrent(p => (p - 1 + banners.length) % banners.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => setCurrent(p => (p + 1) % banners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all">
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-[#D4A853]' : 'w-2 bg-white/50 hover:bg-white/70'}`} />
          ))}
        </div>
      </div>

      {/* USP Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <Truck className="text-[#2D5A27]" size={24} />, title: "Free Delivery", desc: "On orders above ₹499" },
            { icon: <ShieldCheck className="text-[#2D5A27]" size={24} />, title: "Quality Assured", desc: "100% authentic products" },
            { icon: <Leaf className="text-[#2D5A27]" size={24} />, title: "100% Organic", desc: "Chemical-free & natural" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 justify-center p-2">
              <div className="bg-[#FAF3E8] p-3 rounded-xl">{item.icon}</div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
