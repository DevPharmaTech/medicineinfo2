import Link from 'next/link';
import { Pill } from 'lucide-react';

export default function PublicNavbar() {
  return (
    <header className="bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95 text-indigo-600 dark:text-indigo-500">
            <Pill className="w-6 h-6 stroke-[2.5]" />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">DevPharma Info</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/medicines" className="font-semibold text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Explore</Link>
        </nav>
      </div>
    </header>
  );
}
