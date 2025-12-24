
import React from 'react';
import { ThriftItem, ViewType } from '../types';

interface DashboardProps {
  items: ThriftItem[];
  onNavigate: (view: ViewType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ items, onNavigate }) => {
  const solditem = items?.filter((i)=>i.sold === true).length;
  const stats = [
    { label: 'Live Listings', value: items.length, icon: '🏷️', color: 'bg-blue-500' },
    { label: 'Items Sold', value:solditem , icon: '🤝', color: 'bg-emerald-500' },
    { label: 'Total Views', value: '4.2k', icon: '👁️', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to list something new?</h2>
          <p className="text-gray-500 max-w-md">Your inventory is performing 15% better than last month. Keep the momentum going!</p>
        </div>
        <button
          onClick={() => onNavigate('add-item')}
          className="bg-pop-pink  text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
        >
          <span>+</span> List New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center text-xl shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Recently Added</h3>
          <button onClick={() => onNavigate('inventory')} className="text-sm text-pop-pink font-semibold hover:underline">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors border rounded-lg"
            >
              {/* Left side: image + title */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img_url}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover border"
                />
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.category} • {item.condition}
                  </p>
                </div>
              </div>

              {/* Right side: price */}
              <p className="font-semibold text-gray-900">₹{item.price}</p>

              {/* Sold badge */}
              {item.sold && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sold
                </span>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
