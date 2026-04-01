import Link from 'next/link';
import { Pill, Home, Search, ArrowLeft, ShieldAlert } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      <PublicNavbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[10rem] z-0" />
        <div className="absolute top-1/4 right-1/4 w-[20vw] h-[20vw] bg-rose-500/5 rounded-full blur-[8rem] z-0" />
        
        <div className="relative z-10 max-w-lg w-full text-center animate-in fade-in zoom-in duration-700">
          <div className="mb-8 relative inline-block">
             <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-200 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-center mx-auto transform -rotate-6">
                <ShieldAlert className="w-12 h-12 md:w-16 md:h-16 text-rose-500 stroke-[1.5]" />
             </div>
             {/* Floating Pill decoration */}
             <div className="absolute -top-4 -right-4 p-3 bg-indigo-600 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                <Pill className="w-6 h-6 text-white" />
             </div>
          </div>

          <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400 mb-4 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-full w-fit mx-auto border border-indigo-100/50 dark:border-indigo-900/30">
            Diagnosis: 404 Error
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Reference Not Found
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-sm mx-auto">
            The medicine record or clinical page you are looking for has been moved or does not exist in our index.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/medicines" 
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" /> Medicine Directory
            </Link>
            
            <Link 
              href="/" 
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Go Home
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-8 opacity-40">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> System Online
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Database Active
             </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
