import { medicineService } from '@/services/medicineService';
import Link from 'next/link';
import { Pill, Stethoscope, Info } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { typography } from '@/config/typography';

export const metadata = { title: "Medicines Directory | DevPharma" };

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
  
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-[#09090b] font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900">
      <PublicNavbar />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 gap-4 sm:gap-0">
             <h2 className={`${typography.h3} text-gray-900 dark:text-white`}>Available References</h2>
             <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold rounded-full w-fit">{medicines.length} results</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {medicines.length === 0 ? (
               <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                 <Info className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Medicines Found</h3>
                 <p className="text-gray-500 dark:text-gray-400 max-w-sm">The database is currently empty. Our clinical team is actively working on populating the reference index.</p>
               </div>
             ) : medicines.map((med, index) => (
               <Link 
                 key={med.id} 
                 href={`/medicines/${med.id}`} 
                 className="group relative bg-white dark:bg-[#111113] rounded-[1.25rem] p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800/80 hover:ring-indigo-500 dark:hover:ring-indigo-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden"
                 style={{ animationDelay: `${index * 50}ms` }}
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 rounded-bl-[100px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-[0.9rem] bg-indigo-50 dark:bg-indigo-950 flex justify-center items-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
                       <Pill className="text-indigo-600 dark:text-indigo-400 group-hover:text-white w-6 h-6 stroke-[2.5]" />
                    </div>
                    
                    <h3 className={`${typography.h5} mb-1 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}>{med.name}</h3>
                    <p className={`${typography.pTiny} text-gray-500 dark:text-gray-400 mb-4`}>{med.genericName || 'No Generic Registered'}</p>
                  </div>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-800/80 flex justify-between items-center text-sm font-semibold relative z-10">
                    <span className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Study details</span>
                    <span className="transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-indigo-600 dark:text-indigo-400">→</span>
                  </div>
               </Link>
             ))}
           </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
