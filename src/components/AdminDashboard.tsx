import { useEffect, useState } from 'react';
import { X, RefreshCw, Package, User, Trash2, LayoutDashboard, ShoppingBag, Settings, Save, Plus, Phone, Globe, Edit3 } from 'lucide-react';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(false);
  const [siteInfo, setSiteInfo] = useState({ storeName: "Nalam Oil Organic", banner: "Free shipping on orders above ₹499" });

  const fetchData = async () => {
    setLoading(true);
    let endpoint = '/api/get-orders';
    if (activeTab === 'products') endpoint = '/api/get-products';
    
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) { console.error("Sync Error"); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item permanently?")) return;
    const table = activeTab === 'orders' ? 'orders' : 'products';
    await fetch(`/api/delete-item?table=${table}&id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[300] bg-[#F8F9FA] flex flex-col md:flex-row text-gray-800">
      {/* PROFESSIONAL SIDEBAR */}
      <aside className="w-full md:w-72 bg-[#1B3A18] text-white p-6 flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-10 p-2 bg-white/10 rounded-2xl">
          <div className="bg-white p-2 rounded-lg text-[#1B3A18]"><LayoutDashboard size={24} /></div>
          <h1 className="text-xl font-extrabold tracking-tight">NALAM MASTER</h1>
        </div>
        
        <nav className="space-y-3 flex-1">
          <MenuBtn active={activeTab === 'orders'} icon={<ShoppingBag size={20}/>} label="Live Orders" count={activeTab === 'orders' ? data.length : null} onClick={() => setActiveTab('orders')} />
          <MenuBtn active={activeTab === 'products'} icon={<Package size={20}/>} label="Inventory" onClick={() => setActiveTab('products')} />
          <MenuBtn active={activeTab === 'settings'} icon={<Globe size={20}/>} label="Site Customizer" onClick={() => setActiveTab('settings')} />
        </nav>

        <button onClick={onClose} className="mt-auto flex items-center justify-center gap-2 p-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl transition-all font-bold border border-red-500/20">
          <X size={18} /> Logout Session
        </button>
      </aside>

      {/* MAIN COMMAND CENTER */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black text-[#1B3A18] capitalize">{activeTab}</h2>
            <p className="text-gray-400 mt-1">Manage your business real-time</p>
          </div>
          <button onClick={fetchData} className="p-4 bg-white shadow-xl rounded-2xl hover:bg-gray-50 active:scale-95 transition-all">
            <RefreshCw size={24} className={`${loading ? "animate-spin" : ""} text-[#2D5A27]`} />
          </button>
        </header>

        {/* ORDERS VIEW */}
        {activeTab === 'orders' && (
          <div className="grid gap-4">
            {data.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-center">
                  <div className="bg-[#FAF3E8] p-4 rounded-2xl text-[#2D5A27] font-bold">#{order.id.slice(0,4)}</div>
                  <div>
                    <div className="font-bold text-xl">{order.customer_name}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Phone size={14}/> {order.phone_number}</span>
                      <span className="flex items-center gap-1 text-[#2D5A27] font-semibold"><Package size={14}/> {order.product_details}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleDelete(order.id)} className="p-3 text-red-200 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={24}/></button>
              </div>
            ))}
          </div>
        )}

        {/* INVENTORY VIEW */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <button className="bg-[#1B3A18] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-green-900/20 transition-all"><Plus size={20}/> Add New Product</button>
            <div className="grid lg:grid-cols-2 gap-6">
              {data.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex gap-6 items-center">
                  <div className="w-24 h-24 bg-[#FAF3E8] rounded-2xl flex items-center justify-center text-[#2D5A27]"><Package size={40}/></div>
                  <div className="flex-1 space-y-2">
                    <input className="font-bold text-xl block w-full outline-none bg-transparent focus:border-b border-[#2D5A27]" defaultValue={product.name} />
                    <div className="flex items-center text-2xl font-black text-[#2D5A27]">₹<input className="w-24 outline-none bg-transparent" defaultValue={product.price} /></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Save size={20}/></button>
                    <button onClick={() => handleDelete(product.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={20}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SITE SETTINGS VIEW */}
        {activeTab === 'settings' && (
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 max-w-3xl space-y-8">
            <div className="flex items-center gap-3 text-2xl font-bold text-[#1B3A18] mb-4"><Edit3 /> Branding & Banners</div>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Store Title</label>
                <input className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#2D5A27]" value={siteInfo.storeName} onChange={(e)=>setSiteInfo({...siteInfo, storeName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Global Announcement Banner</label>
                <input className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#2D5A27]" value={siteInfo.banner} onChange={(e)=>setSiteInfo({...siteInfo, banner: e.target.value})} />
              </div>
            </div>
            <button className="w-full bg-[#1B3A18] text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all">Save All Site Changes</button>
          </div>
        )}
      </main>
    </div>
  );
}

function MenuBtn({ active, icon, label, onClick, count }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${active ? 'bg-white text-[#1B3A18] shadow-lg font-bold' : 'hover:bg-white/10 text-gray-300'}`}>
      <div className="flex items-center gap-4">{icon} {label}</div>
      {count !== null && <span className={`px-3 py-1 rounded-full text-xs ${active ? 'bg-[#1B3A18] text-white' : 'bg-white/20'}`}>{count}</span>}
    </button>
  );
}
