import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { typography } from '@/config/typography';

export function CallToAction() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-5 py-6">

      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-900/60 dark:to-indigo-950/40 text-center px-4 py-6 md:py-8 shadow-md ring-1 ring-indigo-500/20">

        <div className="max-w-2xl mx-auto">

          <h2 className={`${typography.h3} text-white mb-2`}>
            Ready to discover insights?
          </h2>

          <p className={`${typography.pBase} text-indigo-100 mb-4`}>
            Everything is fully documented and instantly accessible.
          </p>

          <Button
            size="sm"
            asChild
            className="h-9 px-4 rounded-lg bg-white text-indigo-600 text-sm font-medium shadow transition hover:bg-slate-50 hover:-translate-y-0.5"
          >
            <Link href="/medicines" className="flex items-center gap-1.5">
              Explore
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>

        </div>

      </section>

    </div>
  );
}