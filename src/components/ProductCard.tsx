import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#FAF3E8]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              product.badge === 'Bestseller' ? 'bg-[#C44B2B] text-white' :
              product.badge === 'Premium' ? 'bg-[#D4A853] text-[#1E3D1A]' :
              product.badge === 'New' ? 'bg-[#2D5A27] text-white' :
              'bg-blue-500 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className={`p-2 rounded-full shadow-md transition-all ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'white' : 'none'} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onQuickView(product); }}
            className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-[#2D5A27] hover:text-white transition-all"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="w-full bg-[#2D5A27] hover:bg-[#1E3D1A] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[10px] text-[#5C6B3C] font-medium uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-0.5 line-clamp-2 group-hover:text-[#2D5A27] transition-colors">
          {product.name}
        </h3>
        {product.nameLocal && (
          <p className="text-xs text-gray-400 mb-2">{product.nameLocal}</p>
        )}
        <p className="text-xs text-gray-400 mb-2">{product.weight}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#2D5A27]">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
