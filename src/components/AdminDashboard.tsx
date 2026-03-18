import { useEffect, useState } from 'react';
import { X, RefreshCw, Phone, Package, User } from 'lucide-react';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/get-orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-[#2D5A27]">Nalam Oil - Order Manager</h2>
          <div className="flex gap-4">
            <button onClick={fetchOrders} className="p-2 hover:bg-gray-100 rounded-full">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading live orders...</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order: any) => (
              <div key={order.id} className="p-5 border rounded-2xl bg-[#FEFCF9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <User size={16} className="text-[#2D5A27]" /> {order.customer_name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Phone size={16} /> {order.phone_number}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Package size={16} /> {order.product_details}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleString()}
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-center text-gray-400">No orders yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
