import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pop-dark border-t border-white/5 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-medium">© 2024 ThriftFlip. <span className="text-pop-pink">Made with style.</span></p>
        <div className="flex gap-8 font-bold text-slate-300">
          <a href="#" className="hover:text-pop-blue transition-colors">Privacy</a>
          <a href="#" className="hover:text-pop-blue transition-colors">Terms</a>
          <a href="#" className="hover:text-pop-blue transition-colors">Shipping</a>
        </div>
      </div>
    </footer>
  );
};