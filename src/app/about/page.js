import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { typography } from '@/config/typography';
import { Shield, BookOpen, Globe2 } from 'lucide-react';

export const metadata = { title: "About Us | Medicineinfo" };

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#060608] font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900">
      <PublicNavbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
        
        <div className="text-center mb-10 md:mb-16 px-4">
          <div className="inline-flex items-center justify-center py-1.5 px-4 mb-6 bg-white dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest rounded-full ring-1 ring-inset ring-slate-200 dark:ring-indigo-500/30 shadow-sm">
            Our Mission
          </div>
          <h1 className={`${typography.h1} text-slate-900 dark:text-white mb-6`}>
            Democratizing Clinical Information
          </h1>
          <p className={`${typography.pLarge} text-slate-600 dark:text-slate-400 max-w-3xl mx-auto`}>
            Medicineinfo was founded on a simple principle: high-quality, evidence-based pharmaceutical data shouldn't be locked behind paywalls or complex academic subscriptions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 pb-12 w-full">
           <div className="bg-white dark:bg-[#0f0f13] p-6 md:p-8 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-[#030712] rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 text-indigo-600 dark:text-indigo-400">
                 <Shield className="w-7 h-7" />
              </div>
              <h3 className={`${typography.h4} text-slate-900 dark:text-white mb-3`}>Built for Safety</h3>
              <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
                 Every dosage, side effect, and interaction warning is strictly formatted to prioritize patient logic and clinical accuracy without jargon overload.
              </p>
           </div>
           
           <div className="bg-white dark:bg-[#0f0f13] p-6 md:p-8 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-cyan-50 dark:bg-[#030712] rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 text-cyan-600 dark:text-cyan-400">
                 <Globe2 className="w-7 h-7" />
              </div>
              <h3 className={`${typography.h4} text-slate-900 dark:text-white mb-3`}>Global Access</h3>
              <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
                 Our database architecture perfectly syncs records worldwide so researchers, doctors, and individuals always have immediate reference availability.
              </p>
           </div>

           <div className="bg-white dark:bg-[#0f0f13] p-6 md:p-8 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-14 h-14 bg-purple-50 dark:bg-[#030712] rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 text-purple-600 dark:text-purple-400">
                 <BookOpen className="w-7 h-7" />
              </div>
              <h3 className={`${typography.h4} text-slate-900 dark:text-white mb-3`}>Open Sourced Data</h3>
              <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
                 We believe in transparency. That's why there are no signups, no marketing funnels, and no gated communities. Just pure information.
              </p>
           </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
