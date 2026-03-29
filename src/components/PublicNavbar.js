import Link from 'next/link';
import { Pill } from 'lucide-react';
import { typography } from '@/config/typography';

export default function PublicNavbar() {
  return (
    <header className="bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4rem] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group transition-transform hover:scale-105 active:scale-95 text-indigo-600 dark:text-indigo-500">
            <Pill className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
            <span className={`${typography.h5} text-slate-900 dark:text-white`}>DevPharma</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/medicines" className={`${typography.pSmall} text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors`}>Explore</Link>
        </nav>
      </div>
    </header>
  );
}
