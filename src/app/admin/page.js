export const metadata = { 
  title: "Admin Dashboard | DevPharma" 
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">System Status Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Manage your pharmaceutical database here.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-center transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Active Database</h2>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Online</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">Using DATABASE_TYPE config</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-xl shadow-lg border-0 p-6 flex flex-col justify-center text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 20.5 7 17l3.5-3.5"/><path d="M7 17h9.5c1.4 0 2.5-1.1 2.5-2.5v-2"/><path d="M13.5 3.5 17 7l-3.5 3.5"/><path d="M17 7H7.5C6.1 7 5 8.1 5 9.5v2"/></svg>
          </div>
          <h2 className="text-indigo-100 text-sm font-medium uppercase tracking-wider relative z-10">Data Connector</h2>
          <p className="mt-2 text-2xl font-bold relative z-10">Seamless Sync</p>
          <p className="mt-1 text-sm text-indigo-50 relative z-10">Changes reflect instantly</p>
        </div>
      </div>
      
      <div className="mt-8 bg-indigo-50/50 dark:bg-indigo-900/10 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/20 backdrop-blur-sm">
        <h2 className="text-xl text-indigo-900 dark:text-indigo-300 font-semibold mb-3">Getting Started</h2>
        <p className="text-indigo-700 dark:text-indigo-400/80 max-w-2xl leading-relaxed">
          Head over to the <strong className="font-semibold text-indigo-900 dark:text-indigo-300">Manage Medicines</strong> page to add or modify data. You simply submit the form, and the changes are handled by the unified API that intelligently routes data to either MongoDB or your local JSON file depending on your .env.local configuration. No complex backend setup needed!
        </p>
      </div>
    </div>
  );
}
