import MedicineForm from '@/components/MedicineForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { medicineService } from '@/services/medicineService';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  return { title: `Edit Medicine | Admin` };
}

export default async function EditMedicinePage({ params }) {
  const { id } = await params;
  
  // We explicitly await the medicine fetch
  const medicine = await medicineService.getMedicineById(id);
  
  if (!medicine) {
    notFound();
  }

  // Pass plain object to client component
  const initialData = JSON.parse(JSON.stringify(medicine));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <Link href="/admin/medicines" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center text-sm mb-4 font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Medicines List
        </Link>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl text-sm">
          Update the details for <strong className="text-gray-900 dark:text-white">{initialData.name}</strong>. Provide accurate clinical definitions.
        </p>
      </div>
      
      <MedicineForm initialData={initialData} isEdit={true} />
    </div>
  );
}
