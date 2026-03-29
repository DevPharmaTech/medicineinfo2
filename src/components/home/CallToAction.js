import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { typography } from '@/config/typography';

export function CallToAction() {
  return (
    <section className="py-24 md:py-32 bg-indigo-600 dark:bg-indigo-950 border-t border-indigo-500/30 dark:border-indigo-800/50 text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwSDBWMGg0MHY0MFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className={`${typography.h2} text-white mb-6 tracking-tight`}>Ready to discover insights?</h2>
        <p className={`${typography.pLarge} text-indigo-100 dark:text-indigo-200/80 max-w-2xl mx-auto mb-10`}>
          Whether you're developing high-end medical software or searching for safety correlations, everything is fully documented and instantly accessible.
        </p>
        <Button size="lg" className="h-[3.5rem] px-8 bg-white text-indigo-600 hover:bg-slate-50 hover:text-indigo-700 rounded-2xl font-bold text-base md:text-lg shadow-[0_0_3rem_-1rem_rgba(255,255,255,0.4)] hover:shadow-[0_0_4rem_-1rem_rgba(255,255,255,0.6)] hover:-translate-y-1 transition-all" asChild>
          <Link href="/medicines">
            Explore Medical Database
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
