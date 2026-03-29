'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';

export default function AdminMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await fetch('/api/medicines');
      if (res.ok) {
        const data = await res.json();
        setMedicines(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch medicines', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this medicine record?')) return;
    try {
      const res = await fetch(`/api/medicines/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMedicines(medicines.filter((m) => m.id !== id));
      } else {
        alert('Failed to delete medicine');
      }
    } catch (error) {
      console.error('Failed to delete medicine', error);
    }
  };

  if (loading) {
    return (
       <div className="flex h-64 items-center justify-center">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
       </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medicines Catalog</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage all registered medicines in the database.</p>
        </div>
        
        <Link href="/admin/medicines/new" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          Add Medicine
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Name & Generic</th>
                <th scope="col" className="px-6 py-4 font-medium">Manufacturer</th>
                <th scope="col" className="px-6 py-4 font-medium">Added On</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {medicines.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 justify-center text-center text-gray-400 dark:text-gray-500">
                    No medicines found. Click "Add Medicine" to create one.
                  </td>
                </tr>
              ) : (
                medicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900 dark:text-white">{medicine.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{medicine.genericName || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {medicine.manufacturer || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {medicine.createdAt ? new Date(medicine.createdAt).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/medicines/${medicine.id}/edit`} className="p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(medicine.id)} className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
