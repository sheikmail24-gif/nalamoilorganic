import { Leaf, Award, Truck, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    { icon: <Leaf size={28} />, title: "100% Organic", desc: "All our products are certified organic, grown without chemicals or pesticides." },
    { icon: <Award size={28} />, title: "Premium Quality", desc: "Hand-picked and quality tested products ensuring the best for your family." },
    { icon: <Truck size={28} />, title: "Fast Delivery", desc: "Same day dispatch and express delivery to your doorstep across India." },
    { icon: <HeartHandshake size={28} />, title: "Farm Direct", desc: "We source directly from farmers, ensuring fair prices and fresh products." },
    { icon: <Sparkles size={28} />, title: "Traditional Methods", desc: "Products made using age-old traditional methods preserving authentic flavors." },
    { icon: <ShieldCheck size={28} />, title: "Quality Assured", desc: "Every product passes through rigorous quality checks before reaching you." },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-[#D4A853] text-sm font-semibold uppercase tracking-widest">Why Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1 font-[Playfair_Display]">Why Choose Velchekku</h2>
          <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-[#2D5A27]/20 hover:shadow-lg hover:bg-[#FAF3E8]/50 transition-all duration-300 text-center animate-fadeIn"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="w-16 h-16 bg-[#FAF3E8] group-hover:bg-[#2D5A27] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#2D5A27] group-hover:text-white transition-all duration-300">
                {feat.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{feat.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
