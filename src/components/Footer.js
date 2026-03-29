import Link from 'next/link';
import { Pill } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Pill className="text-indigo-600 w-6 h-6" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
              DevPharma
            </span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            <Link href="/medicines" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Medicines</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-900 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} DevPharma Info. This database is completely free and requires no signup.</p>
          <p className="mt-1">For educational and reference purposes only. Always consult a physician for medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
