import { useState, useEffect } from 'react';
import { X, LayoutDashboard, ShoppingCart, Package, Settings, RefreshCcw, Trash2 } from 'lucide-react';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const endpoint = activeTab === 'orders' ? '/api/get-orders' : '/api/get-products';
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      setData(json);
    } catch (e) { console.error("Sync Error"); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[300] bg-[#F8F9FA] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <div className="flex h-full">
        <aside className="w-64 bg-[#2D5A27] text-white p-6 hidden md:flex flex-col">
          <h1 className="text-xl font-bold mb-10 flex items-center gap-2">
            <LayoutDashboard /> Nalam Admin
          </h1>
          <nav className="space-y-2 flex-1">
            <TabBtn active={activeTab === 'orders'} icon={<ShoppingCart size={18}/>} label="Live Orders" onClick={() => setActiveTab('orders')} />
            <TabBtn active={activeTab === 'products'} icon={<Package size={18}/>} label="Products" onClick={() => setActiveTab('products')} />
            <TabBtn active={activeTab === 'settings'} icon={<Settings size={18}/>} label="Site Settings" onClick={() => setActiveTab('settings')} />
          </nav>
          <button onClick={onClose} className="mt-auto flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <X size={18}/> Exit Dashboard
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 capitalize">{activeTab}</h2>
            <button onClick={fetchData} className="bg-white border p-2 rounded-lg shadow-sm hover:bg-gray-50">
              <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </header>

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">Customer</th>
                    <th className="p-4 font-semibold text-gray-600">Order Details</th>
                    <th className="p-4 font-semibold text-gray-600">Date</th>
                    <th className="p-4 font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{item.customer_name}<br/><span className="text-gray-400 font-normal">{item.phone_number}</span></td>
                      <td className="p-4 text-gray-600">{item.product_details}</td>
                      <td className="p-4 text-sm text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                      <td className="p-4"><button className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'products' && <div className="p-20 text-center text-gray-400">Product Management Module Loading...</div>}
        </main>
      </div>
    </div>
  );
}

function TabBtn({ active, icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-white/20 font-bold' : 'hover:bg-white/10 text-gray-300'}`}>
      {icon} {label}
    </button>
  );
}
