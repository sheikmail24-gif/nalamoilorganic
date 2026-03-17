import { Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Notification() {
  const { notification } = useStore();
  
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] animate-slideDown">
      <div className="bg-[#2D5A27] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium">
        <Check size={16} className="text-[#E8C678]" />
        {notification}
      </div>
    </div>
  );
}
