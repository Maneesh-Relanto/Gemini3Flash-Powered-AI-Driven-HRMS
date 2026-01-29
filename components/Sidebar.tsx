
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Clock,
  ListTodo,
  Settings,
  LogOut 
} from 'lucide-react';
import { UserRole } from '../types';
import { ROLE_PERMISSIONS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole }) => {
  const allMenuItems = [
    { id: 'dashboard', label: 'Dash', icon: LayoutDashboard },
    { id: 'employees', label: 'PIM', icon: Users },
    { id: 'leave', label: 'Leave', icon: Calendar },
    { id: 'timesheets', label: 'Time', icon: Clock },
    { id: 'compliance', label: 'GDPR', icon: ShieldCheck },
    { id: 'roadmap', label: 'Tasks', icon: ListTodo },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const allowedTabs = ROLE_PERMISSIONS[userRole] || [];
  const menuItems = allMenuItems.filter(item => allowedTabs.includes(item.id));

  return (
    <div className="w-20 bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-40 transition-all duration-300">
      {/* Compact Logo Section */}
      <div className="py-6 flex flex-col items-center justify-center border-b border-slate-50">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100 mb-2">
          <ShieldCheck className="text-white h-6 w-6" />
        </div>
        <span className="text-[10px] font-black tracking-tighter text-indigo-900 uppercase text-center leading-none">Lumina<br/>HR</span>
      </div>
      
      {/* Compact Navigation */}
      <nav className="flex-1 py-4 space-y-2 flex flex-col items-center overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`group relative w-14 h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <item.icon className={`${activeTab === item.id ? 'h-5 w-5' : 'h-6 w-6'} mb-0.5`} />
            <span className={`text-[9px] font-bold tracking-tight uppercase ${activeTab === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
              {item.label}
            </span>
            
            <div className="absolute left-20 bg-slate-800 text-white px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
              {item.label}
            </div>
          </button>
        ))}
      </nav>

      {/* Logout at bottom */}
      <div className="py-6 border-t border-slate-100 flex justify-center">
        <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
