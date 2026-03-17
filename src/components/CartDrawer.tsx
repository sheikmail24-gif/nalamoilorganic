import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();

  if (!isCartOpen) return null;

  const shipping = cartTotal >= 499 ? 0 : 49;
  const total = cartTotal + shipping;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-md bg-white shadow-2xl animate-slideIn flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-[#FAF3E8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#2D5A27]" size={22} />
            <h2 className="text-lg font-bold text-gray-800 font-[Playfair_Display]">Shopping Cart</h2>
            <span className="bg-[#2D5A27] text-white text-xs px-2 py-0.5 rounded-full font-bold">{cartCount}</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-[#FAF3E8] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-[#2D5A27]" size={40} />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-400 mb-6">Add some products to get started</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#2D5A27] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1E3D1A] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF3E8]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-50">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-50">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-[#2D5A27] text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors self-start p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t bg-[#FAF3E8] p-5 space-y-3">
            {cartTotal < 499 && (
              <div className="bg-[#2D5A27]/10 rounded-xl p-3 text-center">
                <p className="text-xs text-[#2D5A27] font-medium">
                  Add ₹{499 - cartTotal} more for <span className="font-bold">FREE delivery!</span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-[#2D5A27] h-1.5 rounded-full transition-all" style={{ width: `${Math.min(100, (cartTotal / 499) * 100)}%` }} />
                </div>
              </div>
            )}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-[#2D5A27]">₹{total}</span>
              </div>
            </div>
            <button className="w-full bg-[#2D5A27] hover:bg-[#1E3D1A] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg">
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            <button onClick={() => setIsCartOpen(false)} className="w-full text-center text-sm text-gray-500 hover:text-[#2D5A27] transition-colors py-1">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
