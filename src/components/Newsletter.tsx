import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#2D5A27] to-[#1E3D1A] py-14">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Mail className="text-[#E8C678]" size={28} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-[Playfair_Display] mb-2">
          Stay Updated with Our Offers
        </h2>
        <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
          Subscribe to our newsletter and get 15% off on your first order. We'll send you the latest deals and recipes.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853] bg-white/95"
            required
          />
          <button
            type="submit"
            className={`px-8 py-3.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              subscribed
                ? 'bg-green-500 text-white'
                : 'bg-[#D4A853] hover:bg-[#E8C678] text-[#1E3D1A]'
            }`}
          >
            {subscribed ? <><Check size={18} /> Subscribed!</> : 'Subscribe'}
          </button>
        </form>
        <p className="text-white/40 text-xs mt-4">No spam, unsubscribe anytime. We respect your privacy.</p>
      </div>
    </section>
  );
}
