import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2D5A27] to-[#5C6B3C] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg font-[Playfair_Display]">V</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg font-[Playfair_Display]">Velchekku</h3>
                <p className="text-[8px] text-gray-500 tracking-[0.2em] uppercase">Traditional & Organic</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Bringing you the finest traditional Indian groceries, spices, and organic products directly from farm to your doorstep. Quality you can trust.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2D5A27] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Shop All', 'New Arrivals', 'Best Sellers', 'Organic Products', 'Offers & Deals', 'Blog & Recipes'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#D4A853] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2.5">
              {['My Account', 'Order Tracking', 'Shipping Policy', 'Return & Refund', 'Privacy Policy', 'Terms & Conditions', 'FAQ'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#D4A853] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-start gap-3 text-sm text-gray-400 hover:text-[#D4A853] transition-colors">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>123, Anna Nagar, Chennai - 600040, Tamil Nadu, India</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#D4A853] transition-colors">
                <Phone size={16} className="flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@velchekku.in" className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#D4A853] transition-colors">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@velchekku.in</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Clock size={16} className="flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Secure Payment</p>
              <div className="flex gap-2">
                {['Visa', 'MC', 'UPI', 'GPay'].map(method => (
                  <div key={method} className="bg-white/10 px-3 py-1.5 rounded text-xs font-medium text-gray-400">{method}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2024 Velchekku. All rights reserved. Made with ❤️ in Tamil Nadu</p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Sitemap'].map(link => (
              <a key={link} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
