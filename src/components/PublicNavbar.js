"use client";

import Link from 'next/link';
import { Pill, Search, Menu, X } from 'lucide-react';
import { typography } from '@/config/typography';
import { useState } from 'react';

export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] relative flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center z-20">
          <Link href="/" className="flex items-center gap-2.5 group transition-transform hover:scale-105 active:scale-95 text-indigo-600 dark:text-indigo-500">
              <Pill className="w-6 h-6 stroke-[2.5]" />
              <span className={`${typography.h5} text-slate-900 dark:text-white hidden sm:block`}>Medicineinfo</span>
          </Link>
        </div>
        
        {/* Center: Search Bar aligned mathematically strict to the true center of the screen on large screens */}
        <div className="flex-1 flex justify-center px-3 sm:px-6 md:absolute md:left-1/2 md:-translate-x-1/2 md:w-[400px] lg:w-[480px] z-10 transition-all">
          <form action="/medicines" method="GET" className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type="text" 
              name="q"
              placeholder="Search databases..." 
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-transparent ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-500 rounded-full text-[0.95rem] outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 text-slate-900 dark:text-slate-100 shadow-sm"
            />
          </form>
        </div>

        {/* Right: Desktop Links & Mobile Menu Toggle */}
        <div className="flex-shrink-0 flex items-center z-20">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className={`${typography.pSmall} text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors`}>About</Link>
            <Link href="/contact" className={`${typography.pSmall} text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors`}>Contact Us</Link>
            <Link href="/medicines" className={`${typography.pSmall} font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors`}>Explore</Link>
          </nav>
          
          <button 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 ml-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-indigo-500"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
      </div>

      {/* Hamburger Menu Dropdown (Mobile Context) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[4.5rem] left-0 w-full bg-white dark:bg-[#030712] border-b border-slate-200 dark:border-slate-800 shadow-2xl py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`${typography.pLarge} font-medium block p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-slate-700 dark:text-slate-200 transition-colors`}>
            About
          </Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`${typography.pLarge} font-medium block p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-slate-700 dark:text-slate-200 transition-colors`}>
            Contact Us
          </Link>
          <hr className="my-2 border-slate-100 dark:border-slate-800" />
          <Link href="/medicines" onClick={() => setIsMenuOpen(false)} className={`${typography.pLarge} font-bold block p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition-colors`}>
            Explore Database
          </Link>
        </div>
      )}
    </header>
  );
}
