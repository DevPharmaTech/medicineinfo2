"use client";

import Link from 'next/link';
import { Home, Pill, ArrowUpRight, Lock, KeyRound, ShieldCheck, FileUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { appConfig } from '@/config/appConfig';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage so they don't have to log in every refresh
    const savedSession = localStorage.getItem('admin_session');
    if (savedSession === 'active') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === appConfig.adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'active');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] flex items-center justify-center p-4 font-sans selection:bg-indigo-500/10">
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="bg-white dark:bg-[#09090b] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-slate-200 dark:ring-slate-800/80 p-8 md:p-10 relative overflow-hidden">
            {/* Background branding subtle decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 rounded-3xl flex items-center justify-center mb-8 mx-auto ring-1 ring-indigo-100 dark:ring-indigo-900/30">
                <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Portal</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Verify credentials to manage the database</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Admin Password"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-[#0f0f12] border ${error ? 'border-red-500 ring-1 ring-red-500/10' : 'border-slate-200 dark:border-slate-800'} rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400`}
                  />
                  {error && <p className="mt-2 text-xs font-bold text-red-500 text-center animate-in slide-in-from-top-1">Invalid Access Key. Try again.</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
                >
                  <span className="relative z-10">Decrypt Dashboard</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                </button>
              </form>

              <div className="mt-10 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                256-bit internal authentication
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">&larr; Return to Public Site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col z-10 shadow-sm relative">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Pill className="text-indigo-600 dark:text-indigo-500 w-6 h-6" />
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">DevPharma</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/medicines" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Pill className="w-4 h-4" />
            Manage Medicines
          </Link>
          <Link href="/admin/import" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FileUp className="w-4 h-4" />
            Import Data
          </Link>
          
          <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
            <Link href="/medicines" target="_blank" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
              Public Site
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </aside>
      
      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 md:hidden sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Pill className="text-indigo-600 w-5 h-5" />
            <span className="text-lg font-bold">DevPharma</span>
          </div>
          <Link href="/admin/medicines" className="text-sm border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 font-medium">
            Menu
          </Link>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-4 md:p-8 lg:p-10 w-full max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
