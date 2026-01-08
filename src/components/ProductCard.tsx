"use client"
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useUser } from "@clerk/clerk-react";
import synctoDB from "../helper/synctodb";
import { toast } from "react-toastify";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {


  const { user } = useUser();
  const userId = user?.id;

  const addtoCart = useCartStore((state) => state.addToCart);
  const [isadded, setisadded] = useState(false);

  function handleadd() {
    toast.success("Product added to cart!");
    setisadded(true);
    const updated = addtoCart(product);
    if(userId)
    synctoDB(userId, updated);
  }

return (
  <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-1">
    
    {/* Image */}
    <div className="aspect-[3/4] overflow-hidden relative bg-slate-100">
      <img
        src={product?.img_url}
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Badges */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-1 sm:gap-2">
        <span className="bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
          {product.size}
        </span>
        <span className="bg-pop-yellow text-slate-900 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Add to cart */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
        <button
          onClick={handleadd}
          className={`w-full ${
            isadded ? "bg-pop-pink" : "bg-white hover:bg-slate-50 active:scale-95"
          } text-slate-900 font-bold py-2.5 sm:py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all`}
        >
          <ShoppingBag size={16} className="sm:hidden" />
          <ShoppingBag size={18} className="hidden sm:block" />
          {isadded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="p-3 sm:p-5">
      
      {/* Title + Price */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 md:mb-2 gap-1">
        <h3 className="font-serif font-bold text-base md:text-lg text-slate-900 leading-snug group-hover:text-pop-pink transition-colors line-clamp-2">
          {product.title}
        </h3>
        <span className="font-black text-base md:text-lg text-slate-900">
          ₹{product.price}
        </span>
      </div>

      {/* Brand & Condition */}
      <div className="text-xs md:text-sm text-slate-500 mb-2">
        {/* Mobile: merged */}
        <div className="md:hidden">
          {product.brand && product.condition && (
            <span>
              {product.brand} • {product.condition}
            </span>
          )}
        </div>

        {/* Desktop: original */}
        <div className="hidden md:flex">
          {product.brand && (
            <span className="mr-4">
              Brand: <strong>{product.brand}</strong>
            </span>
          )}
          {product.condition && (
            <span>
              Condition: <strong>{product.condition}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
        {/* Mobile: 2 tags */}
        <div className="flex gap-1 md:hidden">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md uppercase tracking-wide"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Desktop: 3 tags */}
        <div className="hidden md:flex gap-1 flex-wrap">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-wide"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};
