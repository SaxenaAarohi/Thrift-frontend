
import React, { useState, useEffect, useRef } from "react";
import { Filter, Search } from "lucide-react";
import { Hero } from "./Hero";
import { FilterType } from "../types";
import { ProductCard } from "./ProductCard";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import ShimmerCard from "./ShimmerCard";
import { Navigation } from "./Navigation";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
 const [cacheddata, setcacheddata] = useState(localStorage.getItem("product") || null);
  const shopSectionRef = useRef<HTMLDivElement>(null);
 const [isloading, setisloading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${(import.meta as any).env.VITE_API_URL}/product`);
        const data = await res.json();
         setisloading(false);
        setProducts(data);
        setFilteredProducts(data);
         const value = localStorage.setItem("product", JSON.stringify(data));
      } catch (err) {
        console.error("there is eror", err);
      }
    };
       if (cacheddata) {
      const cache = localStorage.getItem("product");
      setisloading(false);

      setProducts(JSON.parse(cache));
      setFilteredProducts(JSON.parse(cache));

    }
    else
      fetchProducts();

  }, []);


  function handlefilter(filter) {
    setActiveFilter(filter);
    let data = products.filter((item) => {
      if (filter === "All") {
        return item;
      } else {
        return item.category.toLowerCase() === filter.toLowerCase();
      }
    });
    setFilteredProducts(data);
  }

  function handlesearch() {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setFilteredProducts(products);
      return;
    }

    const data = products.filter(item => {
      return (item.title ?? "").toLowerCase().includes(q)
        || (item.tags?.some(tag => tag.toLowerCase().includes(q)))
        || (item.category ?? "").toLowerCase().includes(q)
        ;
    });
    setSearchQuery("");
    setFilteredProducts(data);
    shopSectionRef.current?.scrollIntoView({ behavior: 'smooth' });

  }

  function handleenter(e) {
    if (e.key === "Enter") {
      handlesearch();
    }
  }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      <Navigation
        cartCount={0}
        isMobileMenuOpen={false}
        setIsMobileMenuOpen={() => { }}
      />
      <Hero />

      <main className="flex-grow">

        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center ">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 flex-shrink-0">
                  Filter By:
                </span>
                {Object.values(FilterType).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handlefilter(filter)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeFilter === filter
                      ? 'bg-pop-pink text-white shadow-lg shadow-pop-pink/30 scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-pop-pink hover:text-pop-pink'
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="hidden md:flex text-slate-700 items-center mr-2   hover:border-pop-pink hover:text-pop-pink rounded-full px-4 py-2.5 border border-slate-200 focus-within:ring-2 focus-within:ring-pop-pink focus-within:border-pop-pink transition-all group">
                <Search size={18}
                  onClick={handlesearch}
                  className="group-focus-within:text-pop-pink" />
                <input
                  type="text"
                  placeholder="Search vibes..."
                  value={searchQuery}
                  onKeyDown={handleenter}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none ml-2 w-60 text-sm font-medium text-slate-800 placeholder-slate-700 focus:w-64 focus:placeholder-pop-pink group-hover:placeholder-pop-pink  transition-all"
                />
              </div>
            </div>

          </div>

        </div>

        <div ref={shopSectionRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

         <div className="flex flex-col md:flex-row items-start md:items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 relative inline-block">
                Fresh Drops
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-pop-yellow/40 -z-10 rounded-full"></span>
              </h2>
              <p className="text-slate-500 font-medium mt-3 text-lg">
                {filteredProducts.length} unique treasures found
              </p>
            </div>
          </div>
  {
            !isloading ? (<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 
                gap-x-3 gap-y-6 
                sm:gap-x-6 sm:gap-y-10 
                lg:gap-x-8 lg:gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>) : (<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 
                gap-x-3 gap-y-6 
                sm:gap-x-6 sm:gap-y-10 
                lg:gap-x-8 lg:gap-y-12">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <ShimmerCard key={index} />
                ))}
            </div>)
          }
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
