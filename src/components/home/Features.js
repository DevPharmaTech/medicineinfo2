import { Search, ShieldAlert, Stethoscope, Zap, BookOpen, Clock } from 'lucide-react';
import { typography } from '@/config/typography';

export function Features() {
  return (
    <section className="py-8 md:py-12 bg-white dark:bg-[#060608] text-slate-900 dark:text-slate-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
          <h2 className={`${typography.h2} mb-4 text-slate-900 dark:text-white`}>Engineered For Clarity</h2>
          <p className={`${typography.pLarge} text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4`}>
            Built for developers and patients alike, our platform delivers structured medicine data instantly with beautiful presentation.
          </p>
        </div>
        
        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="group bg-slate-50 dark:bg-[#0f0f13] rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800/60 md:hover:shadow-xl md:hover:shadow-indigo-500/10 md:hover:border-indigo-500/30 transition-all duration-500 md:hover:-translate-y-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-sm border border-slate-100 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 md:group-hover:scale-110 md:group-hover:bg-indigo-600 md:group-hover:text-white transition-all duration-500 md:delay-75">
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className={`${typography.h5} mb-2 md:mb-3 text-slate-900 dark:text-white`}>Lightning Fast</h3>
            <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
              Find exactly what you're looking for without navigating complex medical jargon. Powered by optimized dynamic server components.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="group bg-slate-50 dark:bg-[#0f0f13] rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800/60 md:hover:shadow-xl md:hover:shadow-cyan-500/10 md:hover:border-cyan-500/30 transition-all duration-500 md:hover:-translate-y-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-sm border border-slate-100 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 md:group-hover:scale-110 md:group-hover:bg-cyan-500 md:group-hover:text-white transition-all duration-500 md:delay-75">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className={`${typography.h5} mb-2 md:mb-3 text-slate-900 dark:text-white`}>Clinical Data</h3>
            <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
              Detailed breakdowns of side-effects, dosages, and interactions curated securely from registered pharmaceutical guidelines.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="group bg-slate-50 dark:bg-[#0f0f13] rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800/60 md:hover:shadow-xl md:hover:shadow-purple-500/10 md:hover:border-purple-500/30 transition-all duration-500 md:hover:-translate-y-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-sm border border-slate-100 dark:border-slate-800 text-purple-600 dark:text-purple-400 md:group-hover:scale-110 md:group-hover:bg-purple-500 md:group-hover:text-white transition-all duration-500 md:delay-75">
              <ShieldAlert className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className={`${typography.h5} mb-2 md:mb-3 text-slate-900 dark:text-white`}>Safety First</h3>
            <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
              Clear indications for contraindications and precautions to ensure maximum patient safety and situational awareness.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-slate-50 dark:bg-[#0f0f13] rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800/60 md:hover:shadow-xl md:hover:shadow-emerald-500/10 md:hover:border-emerald-500/30 transition-all duration-500 md:hover:-translate-y-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-sm border border-slate-100 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 md:group-hover:scale-110 md:group-hover:bg-emerald-500 md:group-hover:text-white transition-all duration-500 md:delay-75">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className={`${typography.h5} mb-2 md:mb-3 text-slate-900 dark:text-white`}>Deep Discovery</h3>
            <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
              Looking for active ingredients instead of brand names? Our architecture guarantees that you find the exact equivalent.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group bg-slate-50 dark:bg-[#0f0f13] rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800/60 md:hover:shadow-xl md:hover:shadow-rose-500/10 md:hover:border-rose-500/30 transition-all duration-500 md:hover:-translate-y-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-sm border border-slate-100 dark:border-slate-800 text-rose-600 dark:text-rose-400 md:group-hover:scale-110 md:group-hover:bg-rose-500 md:group-hover:text-white transition-all duration-500 md:delay-75">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className={`${typography.h4} mb-2 md:mb-3 text-slate-900 dark:text-white`}>Open Access Protocol</h3>
            <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
              No subscriptions or walled gardens. Reliable pharmaceutical information is a fundamental right, available globally instantly.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group bg-slate-50 dark:bg-[#0f0f13] rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800/60 md:hover:shadow-xl md:hover:shadow-amber-500/10 md:hover:border-amber-500/30 transition-all duration-500 md:hover:-translate-y-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-sm border border-slate-100 dark:border-slate-800 text-amber-600 dark:text-amber-400 md:group-hover:scale-110 md:group-hover:bg-amber-500 md:group-hover:text-white transition-all duration-500 md:delay-75">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className={`${typography.h4} mb-2 md:mb-3 text-slate-900 dark:text-white`}>Seamless Sync</h3>
            <p className={`${typography.pSmall} text-slate-600 dark:text-slate-400`}>
              Information updates are synchronized dynamically. If a core clinical rule changes, it flows down to your client immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
