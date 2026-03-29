import { medicineService } from '@/services/medicineService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Pill, ArrowLeft, ShieldAlert, PlusCircle, Factory, Info, FileText } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { typography } from '@/config/typography';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const medicine = await medicineService.getMedicineBySlug(slug);
  return { 
    title: medicine ? `${medicine.name} | DevPharma` : 'Medicine Not Found',
    description: medicine ? medicine.description : 'Open medicine directory'
  };
}

export default async function MedicineDetail({ params }) {
  const { slug } = await params;
  const medicine = await medicineService.getMedicineBySlug(slug);
  
  if (!medicine) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0a0a0a] font-sans text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div>
          <Link href="/medicines" className="inline-flex items-center gap-2 group text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 duration-300" />
             <span>Back to Directory</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-[#111111] rounded-[2rem] shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-800 p-8 md:p-12 mb-8 relative overflow-hidden">
           {/* Decorative abstract shape */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50/50 to-transparent dark:from-indigo-900/10 rounded-bl-full z-0" />
           
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
             {medicine.imageUrl ? (
               <img src={medicine.imageUrl} alt={medicine.name} className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800" />
             ) : (
               <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/30">
                 <Pill className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400 opacity-80 stroke-1" />
               </div>
             )}
             
             <div className="flex-1">
               <div className="inline-flex items-center justify-center py-1 px-3 mb-4 bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-semibold text-xs uppercase tracking-widest rounded-full">
                 Clinical Reference View
               </div>
               <h1 className={`${typography.h2} mb-3 text-gray-900 dark:text-white`}>{medicine.name}</h1>
               <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6 mb-6">
                  {medicine.genericName && (
                    <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/20 py-1.5 px-3 rounded-lg ring-1 ring-inset ring-gray-200/50 dark:ring-gray-800">
                      <FileText className="w-4 h-4" /> INN: {medicine.genericName}
                    </span>
                  )}
                  {medicine.manufacturer && (
                    <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/20 py-1.5 px-3 rounded-lg ring-1 ring-inset ring-gray-200/50 dark:ring-gray-800">
                      <Factory className="w-4 h-4" /> Mfr: {medicine.manufacturer}
                    </span>
                  )}
               </div>
               
               <div className="prose prose-indigo dark:prose-invert max-w-none">
                 <p className={`${typography.pLarge} text-gray-600 dark:text-gray-300`}>
                   {medicine.description || 'No detailed clinical description available for this record.'}
                 </p>
               </div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Dosages */}
           <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 ring-1 ring-gray-200/50 dark:ring-gray-800 shadow-sm relative overflow-hidden group">
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                 <PlusCircle className="w-6 h-6" />
               </div>
               <h2 className={`${typography.h3} text-gray-900 dark:text-white`}>Available Dosages</h2>
             </div>
             <ul className="space-y-3 relative z-10">
               {medicine.dosages && medicine.dosages.length > 0 ? (
                 medicine.dosages.map((dosage, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                     {dosage}
                   </li>
                 ))
               ) : (
                 <li className="text-gray-500 dark:text-gray-400 italic font-medium">No dosage information listed.</li>
               )}
             </ul>
           </div>

           {/* Side Effects */}
           <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 ring-1 ring-gray-200/50 dark:ring-gray-800 shadow-sm relative overflow-hidden group">
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-xl">
                 <Info className="w-6 h-6" />
               </div>
               <h2 className={`${typography.h3} text-gray-900 dark:text-white`}>Common Side Effects</h2>
             </div>
             <ul className="space-y-3 relative z-10">
               {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
                 medicine.sideEffects.map((effect, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                     {effect}
                   </li>
                 ))
               ) : (
                 <li className="text-gray-500 dark:text-gray-400 italic font-medium">No side effects listed.</li>
               )}
             </ul>
           </div>

           {/* Precautions */}
           <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-900/10 rounded-3xl p-8 ring-1 ring-red-100 dark:ring-red-900/30 shadow-sm relative overflow-hidden h-full">
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="p-2.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl">
                 <ShieldAlert className="w-6 h-6" />
               </div>
               <h2 className={`${typography.h3} text-red-900 dark:text-red-200`}>Clinical Warnings & Precautions</h2>
             </div>
              <div className="relative z-10 p-6 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-2xl ring-1 ring-white/50 dark:ring-white/5 mt-4">
                 <p className={`${typography.pLarge} text-red-800 dark:text-red-300/90`}>
                   {medicine.precautions || 'No specific precautions are registered for this drug. Consult a physician.'}
                 </p>
             </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
