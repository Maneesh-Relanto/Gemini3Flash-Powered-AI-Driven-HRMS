
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Briefcase 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'leave', label: 'Leave Management', icon: Calendar },
    { id: 'recruitment', label: 'Recruitment', icon: Briefcase },
    { id: 'compliance', label: 'Compliance & GDPR', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShieldCheck className="text-white h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">LuminaHR</h1>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 transition-colors">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
