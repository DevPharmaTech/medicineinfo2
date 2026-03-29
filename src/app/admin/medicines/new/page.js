import MedicineForm from '@/components/MedicineForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: "Add Medicine | Admin" };

export default function NewMedicinePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <Link href="/admin/medicines" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center text-sm mb-4 font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Medicines List
        </Link>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl text-sm">
          Fill out the form below to register a new medicine in the system. The record will be instantly available on the public site.
        </p>
      </div>
      
      <MedicineForm />
    </div>
  );
}
