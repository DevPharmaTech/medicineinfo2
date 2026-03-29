'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileJson, CheckCircle, AlertCircle, Loader2, ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';

export default function AdminImportPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/json' && !uploadedFile.name.endsWith('.json')) {
      setError('Please upload a valid JSON file');
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const medicines = Array.isArray(json) ? json : [json];
        
        // Basic validation check
        const validated = medicines.map(m => ({
          ...m,
          isValid: !!m.name,
          missingFields: !m.name ? ['name'] : []
        }));

        setData(validated);
        setLoading(false);
      } catch (err) {
        setError('Failed to parse JSON: ' + err.message);
        setLoading(false);
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleImport = async () => {
    if (!data) return;
    
    setImporting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/batch-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicines: data }),
      });

      const resData = await response.json();
      if (response.ok) {
        setResult(resData.results);
        setData(null);
        setFile(null);
      } else {
        setError(resData.error || 'Import failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <Link href="/admin/medicines" className="text-gray-500 hover:text-indigo-600 transition-colors inline-flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Medicines
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Batch Import Medicines</h1>
        <p className="text-gray-500 dark:text-gray-400">Import your formalized JSON medicine data directly into the database.</p>
      </div>

      {!result && (
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          {!data ? (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-xl p-12 transition-colors hover:border-indigo-400">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-full mb-4">
                <FileJson className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Upload Medicine JSON</h3>
              <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">Select your merged or single category JSON file. Ensure it contains an array of medicine objects.</p>
              
              <label className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg cursor-pointer font-medium transition-all shadow-md shadow-indigo-200 dark:shadow-none">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Choose JSON File'}
                <input type="file" className="hidden" accept=".json" onChange={handleFileUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{file?.name}</p>
                    <p className="text-xs text-gray-500">{data.length} medicines detected</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    disabled={importing}
                    onClick={() => {setData(null); setFile(null);}}
                    className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={importing || data.some(m => !m.isValid)}
                    onClick={handleImport}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-100 dark:shadow-none flex items-center gap-2 disabled:opacity-50"
                  >
                    {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Import'}
                  </button>
                </div>
              </div>

              <div className="max-h-[500px] overflow-auto rounded-xl border border-gray-200 dark:border-gray-800">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 h-10 border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 font-semibold">Status</th>
                      <th className="px-4 font-semibold">Name</th>
                      <th className="px-4 font-semibold">Category</th>
                      <th className="px-4 font-semibold">Generic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 50).map((item, idx) => (
                      <tr key={idx} className="h-12 border-b border-gray-100 dark:border-gray-900/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                        <td className="px-4">
                          {item.isValid ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Valid</span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Missing {item.missingFields.join(', ')}</span>
                          )}
                        </td>
                        <td className="px-4 font-medium text-gray-900 dark:text-gray-100">{item.name || '(Empty)'}</td>
                        <td className="px-4 text-gray-500">{item.category}</td>
                        <td className="px-4 text-gray-500">{item.genericName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length > 50 && (
                  <div className="p-3 text-center bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 italic">Showing first 50 entries...</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm text-center animate-in zoom-in-95 duration-500">
           <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Import Successful!</h2>
           <p className="text-gray-500 dark:text-gray-400 mb-8">Successfully imported <span className="text-indigo-600 font-bold">{result.success}</span> records to the database.</p>
           
           <div className="flex gap-4 justify-center">
              <Link href="/admin/medicines" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold">Manage Medicines</Link>
              <button 
                onClick={() => setResult(null)} 
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-2.5 rounded-lg font-bold"
              >
                Import More
              </button>
           </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl text-red-700 dark:text-red-400 animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800/80">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
        <div className="text-sm space-y-2">
          <p className="font-bold text-slate-700 dark:text-slate-300">Important Notes:</p>
          <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-1">
            <li>Duplicate <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">slug</code> or <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">_id</code> entries will overwrite existing data.</li>
            <li>Ensure image URLs are complete (HTTPS).</li>
            <li>Dosages and side effects should be arrays in the JSON.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
