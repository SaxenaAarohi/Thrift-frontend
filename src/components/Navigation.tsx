
import { SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { LogInIcon, LogOut, ShoppingBag, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

export const Navigation = ({
  cartCount,
}) => {

  const naviagte = useNavigate();
  const { isSignedIn, user } = useUser();

  function handlecart() {
    naviagte("/cart");
  }

  const clearcart = useCartStore((s) => s.clearcart);
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div
            onClick={() => naviagte("/")}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-pop-pink to-pop-purple p-2.5 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="font-serif text-3xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              ThriftFlip
            </span>
          </div>

          <div className="flex items-center w-full justify-end gap-3">

            <button onClick={handlecart}
              className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors group"
            >
              <ShoppingBag size={24} className="text-slate-700 group-hover:text-pop-pink transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-pop-pink text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm animate-pulse-fast">
                  {cartCount}
                </span>
              )}
            </button>

            <div className={
              user
                ? "mt-2.5 rounded-full"
                : "hidden"
            }>
              <UserButton/>
               
  
            </div>

            {isSignedIn ? (
              <button
                className="p-2.5 rounded-full hover:bg-slate-100 transition-colors group"
              >
                <SignOutButton >
                  <LogOut
                    size={24} className="text-slate-700 group-hover:text-pop-pink transition-colors" />
                </SignOutButton>
              </button>
            ) :
              (<button onClick={() => naviagte("/login")}
                className="p-2.5 rounded-full hover:bg-slate-100 transition-colors group"
              >
                <LogInIcon size={24} className="text-slate-700 group-hover:text-pop-pink transition-colors" />
              </button>)}
              
          </div>
        </div>
      </div>

    </nav>
  );
};