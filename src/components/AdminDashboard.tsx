import { useEffect, useState } from 'react';
import { X, RefreshCw, Phone, Package, User, Trash2, LayoutDashboard, ShoppingBag, Settings } from 'lucide-react';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/get-orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Sync Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to remove this order?")) return;
    // We'll create this API next if you need it!
    alert("Delete functionality triggered for order ID: " + id);
  };

  useEffect(() => { if(activeTab === 'orders') fetchOrders(); }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[300] bg-[#F8F9FA] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#2D5A27] text-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <LayoutDashboard size={28} />
          <h1 className="text-xl font-bold italic">Nalam Admin</h1>
        </div>
        
        <nav className="space-y-4 flex-1">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <ShoppingBag size={20} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <Settings size={20} /> Settings
          </button>
        </nav>

        <button onClick={onClose} className="mt-auto border border-white/30 p-3 rounded-xl hover:bg-white/10 flex items-center justify-center gap-2">
          <X size={18} /> Close Panel
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#2D5A27] capitalize">{activeTab} Management</h2>
          {activeTab === 'orders' && (
            <button onClick={fetchOrders} className="p-2 bg-white shadow-sm border rounded-full hover:rotate-180 transition-transform duration-500">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          )}
        </header>

        {activeTab === 'orders' ? (
          <div className="grid gap-4">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
                    <User size={18} className="text-[#2D5A27]" /> {order.customer_name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Phone size={16} /> <a href={`tel:${order.phone_number}`} className="hover:underline">{order.phone_number}</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 bg-[#FAF3E8] px-3 py-1 rounded-full text-sm inline-block">
                    <Package size={16} /> {order.product_details}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 font-mono">{new Date(order.created_at).toLocaleString()}</span>
                  <button 
                    onClick={() => deleteOrder(order.id)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {!loading && orders.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400">Waiting for your first order...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Settings size={60} />
            <p className="mt-4 font-bold uppercase tracking-widest text-sm">Module Under Construction</p>
          </div>
        )}
      </main>
    </div>
  );
}
