
import React, { useEffect } from 'react';
import { ViewType } from '../types';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar = ({ currentView, onViewChange }) => {

  const {user} = useUser();
  const [totalearnings, settotalearnings] = React.useState<number>(0);

  useEffect(() => {
    async function gettotal() {
      const data = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/gettotal/${user?.id}`);
      const res = await data.json();
      settotalearnings(res);
    }
    gettotal();
  }, [user]);
  
  const naviagte = useNavigate();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'inventory', label: 'My Inventory', icon: '📦' },
    { id: 'add-item', label: 'List New Item', icon: '✨' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen sticky top-0">

      <div
        onClick={() => naviagte("/seller")}
        className="flex-shrink-0 m-4 flex items-center gap-2 cursor-pointer group"
      >
        <div className="bg-gradient-to-br from-pop-pink to-pop-purple p-2.5 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
          <Sparkles size={20} className="text-white" />
        </div>
        <span className="font-serif text-3xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          ThriftFlip
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 ${currentView === item.id
                ? 'bg-pop-pink text-white font-semibold shadow-sm'
                : 'bg-white text-slate-600  hover:bg-pop-pink/10 hover:text-pop-pink'
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="bg-pop-pink rounded-2xl p-4 text-white">
          <p className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">Total Earnings</p>
          <p className="text-2xl font-bold">₹{totalearnings}</p>
          <div className="mt-3 text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
            +12% this month
          </div>
        </div>
      </div>
    </aside>
  );
};
