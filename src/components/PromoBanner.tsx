import { Timer, Gift } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Deal of the Day */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D5A27] to-[#1E3D1A] p-6 md:p-8 text-white">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Timer size={18} className="text-[#E8C678]" />
              <span className="text-[#E8C678] text-xs font-bold uppercase tracking-widest">Deal of the Day</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-[Playfair_Display] mb-2">Cold Pressed Oils</h3>
            <p className="text-white/70 text-sm mb-4">Get up to 30% off on all cold pressed oils. Limited time offer!</p>
            <div className="flex items-center gap-3 mb-5">
              {['12', '08', '45', '30'].map((time, i) => (
                <div key={i} className="text-center">
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-lg font-bold">{time}</span>
                  </div>
                  <span className="text-[10px] text-white/50 mt-1">{['Days', 'Hrs', 'Min', 'Sec'][i]}</span>
                </div>
              ))}
            </div>
            <button className="bg-[#D4A853] hover:bg-[#E8C678] text-[#1E3D1A] px-6 py-2.5 rounded-full text-sm font-bold transition-colors">
              Shop Now →
            </button>
          </div>
        </div>

        {/* Special Offer */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#B8941F] p-6 md:p-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Gift size={18} className="text-[#1E3D1A]" />
              <span className="text-[#1E3D1A] text-xs font-bold uppercase tracking-widest">Special Offer</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-[Playfair_Display] text-[#1E3D1A] mb-2">First Order Bonus</h3>
            <p className="text-[#1E3D1A]/70 text-sm mb-4">Use code <span className="font-bold bg-white/30 px-2 py-0.5 rounded">WELCOME10</span> for 10% off on your first order!</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 text-center">
                <span className="text-2xl font-bold text-[#1E3D1A]">10%</span>
                <p className="text-xs text-[#1E3D1A]/70">Discount</p>
              </div>
              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 text-center">
                <span className="text-2xl font-bold text-[#1E3D1A]">₹0</span>
                <p className="text-xs text-[#1E3D1A]/70">Delivery</p>
              </div>
              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 text-center">
                <span className="text-2xl font-bold text-[#1E3D1A]">24h</span>
                <p className="text-xs text-[#1E3D1A]/70">Express</p>
              </div>
            </div>
            <button className="bg-[#1E3D1A] hover:bg-[#2D5A27] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors">
              Claim Offer →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
