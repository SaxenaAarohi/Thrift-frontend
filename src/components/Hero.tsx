"use client"
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  
  return (
    <section className="relative h-[650px] overflow-hidden">
      <img
        //src="https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
         src="https://www.ashokaonemall.com/images/blog/Summer-Fashion.jpg"
        alt="Vintage store interior"
        className="w-full h-full object-cover filter brightness-100 "
      />

      <div className="absolute inset-0">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-pop-yellow text-slate-900 rounded-full text-sm font-black tracking-widest uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
              Sustainable & Stylish
            </span>

            <h1 className="font-serif text-6xl md:text-8xl font-black leading-tight mb-6 text-white ">
           Future Looks <br />
              <span className="text-sky-500">
                Good on You.
              </span>
            </h1>
       

            <p className="text-2xl text-slate-100 mb-10 max-w-lg leading-relaxed font-medium">
              Curated vintage that pops. Hand-picked pieces, washed, prepped, and ready for their main character moment.
            </p>

    
          </div>
        </div>
      </div>
    </section>
  );
};