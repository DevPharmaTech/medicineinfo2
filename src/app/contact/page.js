import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { typography } from '@/config/typography';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

export const metadata = { title: "Contact Us | Medicineinfo" };

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#060608] font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900">
      <PublicNavbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 md:py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="text-center mb-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white dark:bg-[#111113] rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 text-indigo-600 dark:text-indigo-400">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h1 className={`${typography.h1} text-slate-900 dark:text-white mb-4`}>
                Get in Touch
            </h1>
            <p className={`${typography.pLarge} text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}>
                Whether you have a clinical question, want to submit a data correction, or need details about our APIs, our team is ready to help.
            </p>
        </div>

        <div className="bg-white dark:bg-[#0f0f13] rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-200/60 dark:border-slate-800/80 mb-12">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
               
               {/* Contact Info */}
               <div className="flex flex-col justify-center">
                 <h2 className={`${typography.h3} text-slate-900 dark:text-white mb-4`}>Direct Channels</h2>
                 <p className={`${typography.pBase} text-slate-600 dark:text-slate-400 mb-10`}>
                   We actively monitor our support channels to update the index and address software integration issues globally.
                 </p>
                 
                 <div className="flex items-start gap-4 mb-8">
                    <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`${typography.h5} text-slate-900 dark:text-white mb-1`}>Email Support</h3>
                      <p className={`${typography.pSmall} text-slate-500 dark:text-slate-400 leading-tight`}>support@medicineinfo.com</p>
                      <button className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-2 hover:underline">Send an email &rarr;</button>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`${typography.h5} text-slate-900 dark:text-white mb-1`}>Headquarters</h3>
                      <p className={`${typography.pSmall} text-slate-500 dark:text-slate-400 leading-relaxed`}>
                        100 API Protocol Avenue<br/>Global Cloud Network
                      </p>
                    </div>
                 </div>
               </div>
               
               {/* Contact Form Placeholder */}
               <div className="bg-slate-50 dark:bg-[#060608] p-6 lg:p-8 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 flex flex-col shadow-sm">
                  <h3 className={`${typography.h4} text-slate-900 dark:text-white mb-6`}>Send a Message</h3>
                  <form className="flex flex-col gap-4">
                    <div>
                      <input type="text" placeholder="Your Name" className="w-full px-5 py-4 bg-white dark:bg-[#111113] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white text-sm transition-all focus:shadow-md" />
                    </div>
                    <div>
                      <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-white dark:bg-[#111113] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white text-sm transition-all focus:shadow-md" />
                    </div>
                    <div>
                      <textarea placeholder="How can we help?" rows="4" className="w-full px-5 py-4 bg-white dark:bg-[#111113] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white text-sm resize-none transition-all focus:shadow-md"></textarea>
                    </div>
                    <button type="button" className="w-full mt-2 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl font-bold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all text-sm">
                      Submit Message
                    </button>
                  </form>
               </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
