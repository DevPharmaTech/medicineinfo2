import { medicineService } from '@/services/medicineService';
import Link from 'next/link';
import { Pill, Stethoscope, Info } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { typography } from '@/config/typography';
import { appConfig } from '@/config/appConfig';

export const metadata = { title: `Medicines Directory | ${appConfig.name}` };

export default async function PublicMedicinesList(props) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || '';

  let medicines = await medicineService.getAllMedicines();
  
  if (q) {
    const query = q.toLowerCase();
    medicines = medicines.filter(m => 
      m.name.toLowerCase().includes(query) || 
      (m.genericName && m.genericName.toLowerCase().includes(query)) ||
      (m.description && m.description.toLowerCase().includes(query))
    );
  }

  // Group medicines by category logically mapping the layout request
  const groupedMedicines = medicines.reduce((acc, med) => {
    const cat = med.category || 'General Reference';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(med);
    return acc;
  }, {});

  const categories = Object.keys(groupedMedicines).sort();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-[#09090b] font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900">
      <PublicNavbar />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative p-8 overflow-hidden">
           <div className="absolute inset-0 z-0 pointer-events-none">
               <div className="absolute top-10 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-indigo-500/10 rounded-full blur-[6rem]" />
               <div className="absolute -top-10 left-0 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-cyan-500/10 rounded-full blur-[5rem]" />
           </div>

           <div className="max-w-5xl mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <div className="inline-flex items-center justify-center py-1.5 px-3.5 mb-6 bg-white dark:bg-[#111113] shadow-sm border border-gray-200 dark:border-gray-800 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:shadow-md transition-shadow">
                <Stethoscope className="w-4 h-4 mr-2" /> Free Clinical Access
              </div>
              
              <h1 className={`${typography.h1} mb-6 text-gray-900 dark:text-white`}>
                Open Medicine Directory
              </h1>
              
              <p className={`${typography.pLarge} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10`}>
                Access comprehensive, accurate, and completely free pharmaceutical references. Browse dosages, interactions, and generic information.
              </p>
           </div>
        </section>
        
        {/* Data Grid */}
        <main className="max-w-7xl mx-auto p-8 relative z-10">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 gap-4 sm:gap-0">
             <h2 className={`${typography.h3} text-gray-900 dark:text-white`}>Available References</h2>
             <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold rounded-full w-fit">{medicines.length} results</span>
           </div>
           
           <div className="flex flex-col gap-16 w-full">
             {medicines.length === 0 ? (
               <div className="py-20 flex flex-col items-center justify-center text-center">
                 <Info className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Medicines Found</h3>
                 <p className="text-slate-500 dark:text-slate-400 max-w-sm">The database is currently empty or no results matched your search.</p>
               </div>
             ) : (
               categories.map((category) => (
                 <div key={category} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="mb-8 flex items-center gap-4">
                      <h3 className={`${typography.h4} text-slate-800 dark:text-slate-200 capitalize`}>{category}</h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800/80" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                      {groupedMedicines[category].map((med, index) => (
                        <Link 
                          key={med._id} 
                          href={`/medicines/${med.slug || med._id}`} 
                          className="group relative bg-white dark:bg-[#111113] rounded-[1rem] p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800/80 hover:ring-indigo-500 dark:hover:ring-indigo-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                           <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 rounded-bl-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                           
                           <div className="relative z-10">
                             <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex justify-center items-center mb-3 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
                                <Pill className="text-indigo-600 dark:text-indigo-400 group-hover:text-white w-4 h-4 stroke-[2.5]" />
                             </div>
                             
                             <h3 className={`${typography.pSmall} font-bold mb-0.5 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}>{med.name}</h3>
                             <p className="text-[10px] md:text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-3">{med.genericName || 'No Generic Registered'}</p>
                           </div>
                           
                           <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-xs font-semibold relative z-10">
                             <span className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Study details</span>
                             <span className="transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-indigo-600 dark:text-indigo-400">&rarr;</span>
                           </div>
                        </Link>
                      ))}
                    </div>
                 </div>
               ))
             )}
           </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
