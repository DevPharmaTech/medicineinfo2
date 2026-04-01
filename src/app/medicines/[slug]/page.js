import { medicineService } from '@/services/medicineService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Pill, ArrowLeft, ShieldAlert, PlusCircle, Factory, Info, 
  FileText, Activity, Beaker, Thermometer, ShieldCheck, 
  HelpCircle, AlertTriangle, Layers, Zap, Clock, Package,
  Stethoscope, CheckCircle2, AlertCircle, Ban
} from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { typography } from '@/config/typography';
import { appConfig } from '@/config/appConfig';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const medicine = await medicineService.getMedicineBySlug(slug);
  return { 
    title: medicine ? `${medicine.name} | ${appConfig.name}` : 'Medicine Not Found',
    description: `Clinical reference for ${medicine?.name || 'medicines'}: Indications, Dosage, and Warnings.`
  };
}

export default async function MedicineDetail({ params }) {
  const { slug } = await params;
  const medicine = await medicineService.getMedicineBySlug(slug);
  
  if (!medicine) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/medicines" className="inline-flex items-center gap-2 group text-xs font-bold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
             <div className="p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 group-hover:shadow-indigo-100 dark:group-hover:shadow-none duration-300">
               <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
             </div>
             <span className="tracking-tight uppercase">Clinical Index</span>
          </Link>
        </div>

        {/* 📌 Header / Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-12">
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full z-0" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="w-32 h-32 bg-indigo-50 dark:bg-indigo-950/40 rounded-3xl flex items-center justify-center flex-shrink-0 border border-indigo-100/50 dark:border-indigo-900/30">
                  {medicine.imageUrl ? (
                    <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-full object-cover rounded-3xl" />
                  ) : (
                    <Pill className="w-12 h-12 text-indigo-600 dark:text-indigo-400 opacity-80 stroke-1" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Report</span>
                    <span className={`inline-flex items-center px-3 py-1 ${medicine.prescriptionRequired ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'} text-[9px] font-black uppercase tracking-widest rounded-full`}>
                      {medicine.prescriptionRequired ? 'RX Only' : 'OTC Available'}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {medicine.name}
                  </h1>
                  <p className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">{medicine.genericName || 'Unregistered Generic'}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] uppercase font-black tracking-widest text-slate-400">
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="mb-1 opacity-60">Category</p>
                      <p className="text-slate-900 dark:text-slate-200">{medicine.category}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="mb-1 opacity-60">Form</p>
                      <p className="text-slate-900 dark:text-slate-200">{medicine.dosageForm || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="mb-1 opacity-60">Strength</p>
                      <p className="text-slate-900 dark:text-slate-200">{medicine.strength || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="mb-1 opacity-60">Manufacturer</p>
                      <p className="text-slate-900 dark:text-slate-200 truncate">{medicine.manufacturer || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            {/* 🩺 Uses / Indications */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Uses / Indications</h2>
               </div>
               <div className="grid grid-cols-1 gap-2">
                  {medicine.indications && medicine.indications.length > 0 ? (
                    medicine.indications.map((use, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50/20 dark:bg-emerald-900/10 border border-emerald-100/30 dark:border-emerald-900/20 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{use}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-xs italic">No specific indications documented.</p>
                  )}
               </div>
            </section>

            {/* ⚙️ Mechanism of Action */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                    <Beaker className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Mechanism</h2>
               </div>
               <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  {medicine.mechanismOfAction || 'Pathway information is currently unavailable.'}
               </p>
            </section>

            {/* 📏 Dosage */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Dosage</h2>
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                     <p className="text-[9px] font-black uppercase text-indigo-600 mb-2">Adult Protocol</p>
                     <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{medicine.dosage?.adults || 'Determined by provider.'}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                     <p className="text-[9px] font-black uppercase text-cyan-600 mb-2">Pediatric Protocol</p>
                     <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{medicine.dosage?.children || 'Consult pediatrician.'}</p>
                  </div>
               </div>
            </section>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            {/* 🚭 Side Effects / Warnings */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
               <div className="flex items-center gap-3 mb-6">
                  <ShieldAlert className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-black tracking-tight">Safety Profile</h3>
               </div>
               <div className="space-y-4">
                 <div className="space-y-2">
                   <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Common Adverse Effects</p>
                   <div className="flex flex-wrap gap-2">
                     {medicine.sideEffects?.map((effect, i) => (
                       <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold">{effect}</span>
                     ))}
                   </div>
                 </div>
                 {medicine.warnings?.length > 0 && (
                   <div className="space-y-2 pt-4 border-t border-white/5">
                     <p className="text-[9px] font-black uppercase text-rose-500 tracking-widest">Critical Warnings</p>
                     <ul className="space-y-1.5">
                       {medicine.warnings.map((warn, i) => (
                         <li key={i} className="flex gap-2 text-[11px] font-bold text-rose-200/80">
                           <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" /> {warn}
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
               </div>
            </div>

            {/* ❄️ Environment */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4">
               <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-2xl">
                  <Thermometer className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-0.5">Storage</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{medicine.storage || 'Protect from light/heat.'}</p>
               </div>
            </div>

            {/* 🔄 Interactions */}
            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-6 border border-amber-100 dark:border-amber-900/30">
               <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-black text-amber-900 dark:text-amber-400 tracking-tight text-[11px] uppercase">Drug Interactions</h3>
               </div>
               <div className="space-y-2">
                 {medicine.drugInteractions?.map((item, i) => (
                   <div key={i} className="p-3 bg-white/60 dark:bg-black/30 rounded-xl text-[10px] font-black text-amber-800 dark:text-amber-200/80 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-amber-500" /> {item}
                   </div>
                 ))}
               </div>
            </div>

            {/* 🔬 Clinical Trials */}
            <div className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldCheck className="w-20 h-20" />
               </div>
               <h3 className="text-xs font-black uppercase tracking-widest mb-3">Clinical Research</h3>
               <p className="text-[11px] font-bold leading-relaxed mb-6 opacity-90">{medicine.clinicalTrials || 'Protocols monitored.'}</p>
               <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20">
                 Safety Verification
               </button>
            </div>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
