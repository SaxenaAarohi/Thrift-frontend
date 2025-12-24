import React, { useEffect, useState } from 'react';
import { ThriftItem } from '../types';

interface InventoryListProps {
  items: ThriftItem[];
}

export const InventoryList: React.FC<InventoryListProps> = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All"); // Sold, Not Sold, New, Good
  const [sortValue, setSortValue] = useState(""); // price-asc, price-desc
  const [displayItems, setDisplayItems] = useState(items || []);

  useEffect(() => {
    let filtered = [...items];

    // SEARCH
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // FILTER
    if (filterValue !== "All") {
      if (filterValue === "Sold") {
        filtered = filtered.filter((item) => item.sold === true);
      } else if (filterValue === "Not Sold") {
        filtered = filtered.filter((item) => item.sold !== true);
      } else if (filterValue === "New" || filterValue === "Good") {
        filtered = filtered.filter((item) => item.condition === filterValue);
      }
    }

    // SORT
    if (sortValue === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayItems(filtered);
  }, [items, searchTerm, filterValue, sortValue]);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border">
        <div className="relative rounded-xl flex-1 max-w-md focus-within:ring-2 focus-within:ring-pop-pink focus-within:border-pop-pink transition-all">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 outline-none rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="px-4 py-2 text-sm font-medium text-gray-600 border hover:border-pop-pink rounded-lg  "
          >
            <option>All</option>
            <option>Sold</option>
            <option>Not Sold</option>
            <option>New</option>
            <option>Good</option>
          </select>

          <select
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="px-4 py-2 text-sm font-medium text-gray-600 border hover:border-pop-pink rounded-lg "
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="relative h-56">
              <img src={item.img_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {item.sold && (
                <span className="absolute top-1 left-2 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-md shadow-lg">
                  Sold
                </span>
              )}
              <div className="absolute bottom-4 right-4">
                <p className="bg-pop-pink text-white px-3 py-1 rounded-lg font-bold shadow-lg">
                  ${item.price}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2">
                <h4 className="font-bold text-gray-900 truncate">{item.title}</h4>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                {item.category} • {item.condition}
              </p>
              {/* <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-xs text-gray-400">Listed {item.createdAt}</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete Item">
                    🗑️
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-4xl mb-4">🏜️</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">Time to clear out some closet space and list your first item!</p>
        </div>
      )}
    </div>
  );
};
