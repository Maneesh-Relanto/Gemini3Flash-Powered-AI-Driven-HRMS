
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import ComplianceCenter from './components/ComplianceCenter';
import { Bell, Search, User, ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeList />;
      case 'compliance':
        return <ComplianceCenter />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400">
            <ShieldAlert size={64} className="mb-4 opacity-20" />
            <h2 className="text-xl font-medium">Module under development</h2>
            <p>This section is being built to the highest security standards.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h2>
            <p className="text-slate-500 text-sm">Welcome back, Admin Marcus.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            
            <button className="relative p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-10 w-px bg-slate-200 mx-2"></div>

            <button className="flex items-center gap-3 p-1.5 hover:bg-white rounded-xl transition-colors">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                MW
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight">Marcus Wright</p>
                <p className="text-[10px] text-slate-500 font-medium">System Admin</p>
              </div>
            </button>
          </div>
        </header>

        <div className="pb-12">
          {renderContent()}
        </div>
      </main>

      {/* GDPR Floating Notification */}
      <div className="fixed bottom-6 right-6 bg-white border border-indigo-100 p-4 rounded-2xl shadow-2xl shadow-indigo-200/50 max-w-xs animate-in slide-in-from-right-8 duration-700">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <ShieldAlert size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Compliance Sync Active</p>
            <p className="text-xs text-slate-500 mt-1">
              Your session is being logged for GDPR Article 30 accountability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
