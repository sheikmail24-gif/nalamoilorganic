import { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Minus, Plus, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../data/products';

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#FAF3E8] p-8 flex items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <img src={product.image} alt={product.name} className="w-full max-w-xs rounded-2xl shadow-lg" />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${
                product.badge === 'Bestseller' ? 'bg-[#C44B2B] text-white' :
                product.badge === 'Premium' ? 'bg-[#D4A853] text-[#1E3D1A]' :
                'bg-[#2D5A27] text-white'
              }`}>
                {product.badge}
              </span>
            )}
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            <p className="text-xs text-[#5C6B3C] font-medium uppercase tracking-widest mb-1">{product.category}</p>
            <h2 className="text-2xl font-bold text-gray-800 font-[Playfair_Display] mb-1">{product.name}</h2>
            {product.nameLocal && (
              <p className="text-sm text-gray-400 mb-3">{product.nameLocal}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#2D5A27]">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">-{discount}%</span>
                </>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            <p className="text-sm text-gray-500 mb-6">Weight: <span className="font-medium text-gray-700">{product.weight}</span></p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100 transition-colors">
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-semibold text-sm min-w-[40px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#2D5A27] hover:bg-[#1E3D1A] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border-2 transition-all ${
                  isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              {[
                { icon: <Truck size={16} />, text: "Free delivery on orders above ₹499" },
                { icon: <ShieldCheck size={16} />, text: "100% authentic & quality guaranteed" },
                { icon: <RotateCcw size={16} />, text: "Easy 7-day return policy" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-[#2D5A27]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
