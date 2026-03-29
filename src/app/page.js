import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { CallToAction } from '@/components/home/CallToAction';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#030712] font-sans selection:bg-indigo-500/30">
      <PublicNavbar />
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
