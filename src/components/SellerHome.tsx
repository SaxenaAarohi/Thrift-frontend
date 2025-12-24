"use client"
import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThriftItem, ViewType } from '../types';
import { AddItemForm } from './AddItemForm';
import { Dashboard } from './Dashboard';
import { InventoryList } from './InventoryList';
import { Sidebar } from './Sidebar';

const SellerHome = () => {

  const { user , isLoaded} = useUser();
  const naviagte = useNavigate();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [items, setItems] = useState<ThriftItem[]>([]);

  useEffect(() => {
    if(!isLoaded ) return ;

     async function fetchData() {
      try{
      const response = await fetch(`http://localhost:5000/api/products/getproducts/${user?.id}`);
      const data = await response.json();
      setItems(data);
      }catch(err){
        console.error("Error fetching products:", err);
      }
    }
    if(user.id !== undefined )
   { fetchData();}

  }, [isLoaded,user]);
 

  const handleAddItem = (newItem: Omit<ThriftItem, 'id' | 'createdAt' | 'status'>) => {
    const item: ThriftItem = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setItems(prev => [item, ...prev]);
    setCurrentView('inventory');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard items={items} onNavigate={setCurrentView} />;
      case 'add-item':
        return <AddItemForm onCancel={() => setCurrentView('dashboard')} onSubmit={handleAddItem} />;
      case 'inventory':
        return <InventoryList items={items} />;
      default:
        return <Dashboard items={items} onNavigate={setCurrentView} />;
    }
  };

  return (
     <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 capitalize">
              {currentView.replace('-', ' ')}
            </h1>
            <div className='flex  gap-3'>
              <button onClick={() => naviagte("/")}
                  className="p-2.5 rounded-full hover:bg-slate-100 transition-colors group"
                >
                  <SignOutButton >
                    <LogOut
                    size={24} className="text-slate-700 group-hover:text-pop-pink transition-colors" />
                  </SignOutButton>
                </button>
                <UserButton/>
                </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  )
}

export default SellerHome
