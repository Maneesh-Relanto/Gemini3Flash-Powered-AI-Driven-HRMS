import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import EmployeeList from './components/EmployeeList.tsx';
import ComplianceCenter from './components/ComplianceCenter.tsx';
import LeaveManagement from './components/LeaveManagement.tsx';
import TimesheetManagement from './components/TimesheetManagement.tsx';
import TaskMaster from './components/TaskMaster.tsx';
import Settings from './components/Settings.tsx';
import { Bell, Search, ShieldAlert, ChevronDown, UserCircle, Key } from 'lucide-react';
import { UserRole, Holiday, OfficeLocation, Client } from './types.ts';
import { ROLE_PERMISSIONS, MOCK_HOLIDAYS, MOCK_LOCATIONS, MOCK_CLIENTS } from './constants.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.SYSTEM_ADMIN);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Master Data State
  const [holidays, setHolidays] = useState<Holiday[]>(MOCK_HOLIDAYS);
  const [locations, setLocations] = useState<OfficeLocation[]>(MOCK_LOCATIONS);
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);

  // Security check: Redirect if role change removes access to current tab
  useEffect(() => {
    const rolePermissions = ROLE_PERMISSIONS[userRole] || {};
    if (!rolePermissions[activeTab]?.read) {
      setActiveTab('dashboard');
    }
    setIsRoleDropdownOpen(false);
  }, [userRole]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return (
          <EmployeeList 
            currentUserRole={userRole} 
            locations={locations} 
            clients={clients} 
          />
        );
      case 'leave':
        return <LeaveManagement holidays={holidays} />;
      case 'timesheets':
        return <TimesheetManagement clients={clients} />;
      case 'compliance':
        return <ComplianceCenter />;
      case 'roadmap':
        return <TaskMaster />;
      case 'settings':
        return (
          <Settings 
            holidays={holidays} setHolidays={setHolidays}
            locations={locations} setLocations={setLocations}
            clients={clients} setClients={setClients}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400">
            <ShieldAlert size={64} className="mb-4 opacity-20" />
            <h2 className="text-xl font-medium">Module Restricted</h2>
            <p>This module requires elevated permissions.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
      
      <main className="flex-1 ml-20 p-8 transition-all duration-300">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
              <p className="text-slate-500 text-sm">Welcome back, Marcus Wright.</p>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] font-black text-indigo-700 uppercase tracking-widest hover:bg-indigo-100 transition-all"
              >
                <Key size={12} />
                Switch Role: {userRole}
                <ChevronDown size={12} />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-slate-100 bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Permission Set</p>
                  </div>
                  {Object.values(UserRole).map((role) => (
                    <button
                      key={role}
                      onClick={() => setUserRole(role)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center justify-between ${
                        userRole === role ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                      }`}
                    >
                      {role}
                      {userRole === role && <UserCircle size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm transition-all"
              />
            </div>
            
            <button className="relative p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
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
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{userRole}</p>
              </div>
            </button>
          </div>
        </header>

        <div className="pb-12 max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 bg-white border border-indigo-100 p-4 rounded-2xl shadow-2xl shadow-indigo-200/20 max-w-xs animate-in slide-in-from-right-8 duration-700 z-50 border-l-4 border-l-indigo-600">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
            <ShieldAlert size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">RBAC active: {userRole}</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Your access is restricted to authorized modules per GDPR Article 32.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;