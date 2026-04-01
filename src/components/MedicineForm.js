'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicineForm({ initialData = {}, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || 'General',
    dosageForm: initialData.dosageForm || '',
    strength: initialData.strength || '',
    prescriptionRequired: initialData.prescriptionRequired || false,
    mechanismOfAction: initialData.mechanismOfAction || '',
    dosageAdults: initialData.dosage?.adults || '',
    dosageChildren: initialData.dosage?.children || '',
    indications: initialData.indications ? initialData.indications.join(', ') : '',
    sideEffects: initialData.sideEffects ? initialData.sideEffects.join(', ') : '',
    warnings: initialData.warnings ? initialData.warnings.join(', ') : '',
    precautions: initialData.precautions || '',
    storage: initialData.storage || '',
    clinicalTrials: initialData.clinicalTrials || '',
    drugInteractions: initialData.drugInteractions ? initialData.drugInteractions.join(', ') : '',
    imageUrl: initialData.imageUrl || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { 
        ...formData,
        dosage: {
          adults: formData.dosageAdults,
          children: formData.dosageChildren
        }
      };
      
      delete payload.dosageAdults;
      delete payload.dosageChildren;
      
      // Convert comma-separated strings to arrays
      if (typeof payload.sideEffects === 'string') {
        payload.sideEffects = payload.sideEffects.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (typeof payload.drugInteractions === 'string') {
        payload.drugInteractions = payload.drugInteractions.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (typeof payload.indications === 'string') {
        payload.indications = payload.indications.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (typeof payload.warnings === 'string') {
        payload.warnings = payload.warnings.split(',').map(s => s.trim()).filter(Boolean);
      }

      const url = isEdit ? `/api/medicines/${initialData._id}` : '/api/medicines';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/medicines');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Submission failed', error);
      alert('Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
          {isEdit ? 'Edit Medicine record' : 'Add New Medicine'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name (Brand Name) *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. Tylenol" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Generic Name</label>
            <input type="text" name="genericName" value={formData.genericName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. Paracetamol" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category *</label>
            <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. Analgesics" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Manufacturer</label>
            <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. GSK" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dosage Form</label>
            <input type="text" name="dosageForm" value={formData.dosageForm} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. Tablet, Syrup" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Strength</label>
            <input type="text" name="strength" value={formData.strength} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. 500mg" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Image URL</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="https://example.com/image.jpg" />
          </div>

          <div className="flex items-center space-x-3 pt-8">
            <input type="checkbox" id="prescriptionRequired" name="prescriptionRequired" checked={formData.prescriptionRequired} onChange={(e) => setFormData(prev => ({...prev, prescriptionRequired: e.target.checked}))} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="prescriptionRequired" className="text-sm font-semibold text-gray-700 dark:text-gray-300 italic">Prescription Required?</label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="Primary uses..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Uses / Indications (comma separated)</label>
          <textarea name="indications" value={formData.indications} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="e.g. Headache, Muscle pain, Fever"></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Mechanism of Action</label>
          <textarea name="mechanismOfAction" value={formData.mechanismOfAction} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="How it works..."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Adult Dosage</label>
            <textarea name="dosageAdults" value={formData.dosageAdults} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="e.g. 500-1000mg every 4-6h"></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Children Dosage</label>
            <textarea name="dosageChildren" value={formData.dosageChildren} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="e.g. 10-15mg/kg"></textarea>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Side Effects (comma separated)</label>
          <input type="text" name="sideEffects" value={formData.sideEffects} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. Nausea, Liver damage" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Specific Warnings (comma separated)</label>
          <textarea name="warnings" value={formData.warnings} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="e.g. Avoid alcohol, Not for liver disease"></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Drug Interactions (comma separated)</label>
          <input type="text" name="drugInteractions" value={formData.drugInteractions} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="e.g. Warfarin, Alcohol" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Precautions</label>
            <textarea name="precautions" value={formData.precautions} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="Avoid alcohol..."></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Storage & Trials</label>
            <div className="space-y-4">
              <input type="text" name="storage" value={formData.storage} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="Storage: below 25C" />
              <input type="text" name="clinicalTrials" value={formData.clinicalTrials} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="Clinical Summary..." />
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all">
            {loading ? 'Saving...' : isEdit ? 'Update Medicine' : 'Add Medicine'}
          </button>
        </div>
      </div>
    </form>
  );
}
