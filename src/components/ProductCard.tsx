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
    synctoDB(userId, updated);
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden relative bg-slate-100">
        <img
          src={product?.img_url}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
            {product.size}
          </span>
          <span className="bg-pop-yellow text-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
            {product.category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={handleadd}
            className={`w-full ${isadded ? 'bg-pop-pink' : 'bg-white hover:bg-slate-50 active:scale-95'} text-slate-900 font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2  transition-all`}
          >
            <ShoppingBag size={18} />
            {isadded ? "Added to Cart" : "Add to Cart"}

          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight group-hover:text-pop-pink transition-colors">
            {product.title}
          </h3>
          <span className="font-black text-lg text-slate-900">₹{product.price}</span>
        </div>

        <div className="text-sm text-slate-500 mb-2">
          {product.brand && (
            <span className="mr-4">Brand: <strong>{product.brand}</strong></span>
          )}
          {product.condition && (
            <span>Condition: <strong>{product.condition}</strong></span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
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
  );
};
