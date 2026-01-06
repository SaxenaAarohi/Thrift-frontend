"use client"
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  
  return (
  <section className="relative h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden">
  <img
    src="https://www.ashokaonemall.com/images/blog/Summer-Fashion.jpg"
    alt="Vintage store interior"
    className="w-full h-full object-cover filter brightness-90 sm:brightness-100"
  />

  <div className="absolute inset-0">
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-pop-yellow text-slate-900 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase mb-4 sm:mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
          Sustainable & Stylish
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 sm:mb-6 text-white">
          Future Looks <br />
          <span className="text-sky-500">
            Good on You.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-2xl text-slate-100 mb-6 sm:mb-10 max-w-lg leading-relaxed font-medium">
          Curated vintage that pops. Hand-picked pieces, washed, prepped, and ready for their main character moment.
        </p>
      </div>
    </div>
  </div>
</section>

  );
};
