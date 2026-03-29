import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { typography } from '@/config/typography';

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[45vh] py-4 md:py-8 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 text-center border-b border-gray-200/60 dark:border-gray-800/60 overflow-hidden">
      {/* Animated Background Gradients & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center h-full">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwSDBWMGg0MHY0MFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDQiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwSDBWMGg0MHY0MFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        <div className="absolute top-0 w-[50vw] h-[40vh] md:w-[70vw] md:h-[60vh] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[5rem] md:blur-[8rem] -translate-y-1/2" />
        <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vh] md:w-[40vw] md:h-[40vh] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[5rem] md:blur-[6rem]" />
        <div className="absolute top-[40%] left-[-10%] w-[40vw] h-[40vh] md:w-[50vw] md:h-[50vh] bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[5rem] md:blur-[8rem]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both scale-90 md:scale-100 origin-center">
        <div className="flex flex-col sm:flex-row items-center justify-center py-2 sm:py-1.5 px-4 mb-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-md text-indigo-700 dark:text-indigo-300 font-bold text-[0.65rem] md:text-[0.75rem] uppercase tracking-widest rounded-3xl sm:rounded-full ring-1 ring-inset ring-indigo-200/50 dark:ring-indigo-700/30 shadow-sm transition-colors text-center leading-relaxed">
          <div className="flex items-center mb-1 sm:mb-0">
             <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2 animate-pulse"></span>
             <span>Open Clinical Data Protocol</span>
          </div>
          <span className="hidden sm:inline mx-2 opacity-50">•</span>
          <span className="opacity-90">Curated by Divyanshu Singh, M.Pharm</span>
        </div>

        <h1 className={`${typography.h1} mb-3 text-slate-900 dark:text-white`}>
          The World's Free <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">Medicine</span> Database
        </h1>

        <p className={`${typography.pLarge} text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6 px-2`}>
          Your reliable, open-access directory for dynamic pharmaceutical data.
          <span className="text-slate-900 dark:text-slate-200 block md:inline mt-1 md:mt-0"> No signups. No paywalls. Just trusted references.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0 z-20">
          <Button size="lg" className="h-[2.5rem] px-6 md:px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-[0_0_2rem_-0.5rem_rgba(79,70,229,0.5)] transition-all md:hover:shadow-[0_0_3rem_-1rem_rgba(79,70,229,0.6)] group text-sm md:text-base w-full sm:w-auto" asChild>
            <Link href="/medicines">
              Browse Directory
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[0.7rem] md:text-[0.75rem] font-semibold text-slate-500 dark:text-slate-400 opacity-80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> API Ready
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Free
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Evidence-Based
          </div>
        </div>
      </div>
    </section>
  );
}
