import Link from 'next/link';
import { Pill } from 'lucide-react';
import { typography } from '@/config/typography';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-slate-800 py-3">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className={`${typography.h5} text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500`}>
              Medicineinfo
            </span>
          </div>

          {/* Links */}
          <div className={`flex gap-4 ${typography.pSmall} text-slate-500 dark:text-slate-400`}>
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Home
            </Link>
            <Link href="/medicines" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Medicines
            </Link>
          </div>

        </div>

        {/* Bottom Text */}
        <div className={`mt-3 pt-2 border-t border-slate-100 dark:border-slate-900 text-center ${typography.pTiny} text-slate-400`}>
          <p>© {new Date().getFullYear()} Medicineinfo Info. Free & no signup.</p>
          <p className="mt-1">For educational and reference purposes only. Always consult a physician for medical advice.</p>
        </div>

      </div>

    </footer>
  );
}