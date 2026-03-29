import Link from 'next/link';
import { Home, Pill, ArrowUpRight } from 'lucide-react';

export default function AdminLayout({ children }) {
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
          <div className="p-4 md:p-8 lg:p-10 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
