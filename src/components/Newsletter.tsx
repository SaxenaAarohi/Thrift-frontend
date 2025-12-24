import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';

export const Newsletter = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-pop-dark py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pop-purple rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pop-blue rounded-full blur-[100px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            {/* <span className="text-pop-lime font-bold tracking-wider uppercase mb-2 block">Club Access</span> */}
            <h2 className="font-serif text-5xl font-black mb-6 text-white leading-tight">
              Don't Miss the <br /><span className="text-pop-pink">Today's Drop.</span>
            </h2>
            <p className="text-slate-300 mb-10 text-lg max-w-md">
              Our best vintage pieces sell out in minutes. Join the club to get the password 1 hour before everyone else.
            </p>
      <div className="flex gap-2 max-w-md p-1.5">
  <div
    className="
      cursor-pointer
      bg-yellow-200
      text-slate-900
      px-6
      py-4
      rounded-sm
      font-bold
      text-lg
      shadow-[4px_4px_0px_rgba(0,0,0,0.25)]
      rotate-[-2deg]
      hover:rotate-0
      hover:shadow-[6px_6px_0px_rgba(0,0,0,0.35)]
      transition-all
      select-none
    "
  >
    JOIN AS A SELLER
  </div>
</div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4 pt-12">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 rotate-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAfNN96SQZA_AUAC0HytuUuqIHIEOcKICnMEeLs83rZqvzvpQYRlU9UTjW84qqDTigMyA&usqp=CAU" className="w-full h-full object-cover" alt="Footer grid 1" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 -rotate-3">
                <img src="https://thumbs.dreamstime.com/b/dressing-closet-pink-clothes-arranged-hangers-shelf-wardrobe-full-all-shades-accessories-close-up-outfit-40192197.jpg" className="w-full h-full object-cover" alt="Footer grid 3" />
              </div>
            </div>

      
          </div>
        </div>
      </div>
    </section>
  );
};