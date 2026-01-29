
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Globe, 
  Building2, 
  Palmtree,
  Settings as SettingsIcon,
  ChevronRight,
  ShieldAlert,
  History,
  Activity,
  UserCircle,
  Clock,
  Filter,
  ShieldCheck,
  Lock,
  Grid3X3,
  CheckCircle2,
  XCircle,
  Shield
} from 'lucide-react';
import { MOCK_HOLIDAYS, MOCK_CLIENTS, MOCK_LOCATIONS, MOCK_AUDIT_LOGS, ROLE_PERMISSIONS } from '../constants';
import { UserRole } from '../types';

type SettingsTab = 'holidays' | 'clients' | 'locations' | 'audit' | 'rbac';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('holidays');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuditLogs = useMemo(() => {
    return MOCK_AUDIT_LOGS.filter(log => 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderRBACMatrix = () => {
    const roles = Object.values(UserRole);
    const modules = [
      { id: 'dashboard', label: 'Dashboard', desc: 'Core KPIs and AI Insights' },
      { id: 'employees', label: 'PIM (Personnel)', desc: 'Employee Directory and Profiles' },
      { id: 'leave', label: 'Leave Management', desc: 'Vacation and Sick Leave Tracking' },
      { id: 'timesheets', label: 'Time Tracking', desc: 'Weekly Timesheets and Projects' },
      { id: 'compliance', label: 'GDPR / Compliance', desc: 'Regulatory Oversight and SAR' },
      { id: 'roadmap', label: 'Task Master', desc: 'Development Roadmap and Tasks' },
      { id: 'settings', label: 'System Settings', desc: 'Master Data and RBAC Config' },
    ];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Accessibility Matrix</h3>
            <p className="text-sm text-slate-500">Cross-reference role-based access control (RBAC) mapping for the entire platform.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">
            <ShieldCheck size={14} />
            Art. 25 & 32 Compliant
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 border-b border-slate-100 min-w-[240px]">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Module / Capability</div>
                  <div className="text-sm font-bold text-slate-600">App Resource</div>
                </th>
                {roles.map(role => (
                  <th key={role} className="p-4 border-b border-slate-100 min-w-[140px] text-center group">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1 transition-colors group-hover:text-indigo-600">
                      {role.split(' ')[0]}
                    </div>
                    <div className="text-[11px] font-bold text-slate-800 truncate">{role}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {modules.map(mod => (
                <tr key={mod.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 mb-0.5">{mod.label}</span>
                      <span className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500">{mod.desc}</span>
                    </div>
                  </td>
                  {roles.map(role => {
                    const hasAccess = ROLE_PERMISSIONS[role].includes(mod.id);
                    return (
                      <td key={`${mod.id}-${role}`} className={`p-4 text-center border-l border-slate-50/50 ${hasAccess ? 'bg-green-50/10' : 'bg-red-50/5'}`}>
                        <div className="flex items-center justify-center">
                          {hasAccess ? (
                            <div className="flex flex-col items-center gap-1">
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm border border-green-200 animate-in zoom-in duration-300">
                                <ShieldCheck size={16} />
                              </div>
                              <span className="text-[8px] font-black text-green-600 uppercase">Granted</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                              <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                                <Lock size={16} />
                              </div>
                              <span className="text-[8px] font-black text-slate-300 uppercase">Locked</span>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
            <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Shield size={14} />
              Least Privilege
            </h4>
            <p className="text-[11px] text-indigo-600 leading-relaxed">
              Default access follows the Principle of Least Privilege. Users only see modules necessary for their specific job function.
            </p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Activity size={14} className="text-indigo-400" />
              Dynamic Updates
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Permissions are hot-reloaded. Changing the RBAC configuration propagates instantly across all active sessions.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Search size={14} className="text-indigo-600" />
              Audit Trail
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Every access attempt to restricted modules is logged with IP, timestamp, and result in the System Audit Log.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderAuditLogs = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">System Audit Logs</h3>
          <p className="text-sm text-slate-500">Immutable transaction record of all system activities (GDPR Art. 30 compliant).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter logs..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={14} />
            More Filters
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Who (User)</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        <UserCircle size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">{log.action}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{log.date}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{log.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        log.status === 'Success' ? 'bg-green-500' : log.status === 'Failure' ? 'bg-red-500' : 'bg-orange-500'
                      }`}></div>
                      <span className={`text-[10px] font-bold uppercase ${
                        log.status === 'Success' ? 'text-green-600' : log.status === 'Failure' ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    <span className="text-[11px] text-slate-500 leading-tight">
                      {log.details}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
        <span>Showing {filteredAuditLogs.length} recent transactions</span>
        <div className="flex items-center gap-4">
          <button className="hover:text-indigo-600 transition-colors">Download CSV Report</button>
          <button className="hover:text-indigo-600 transition-colors">Archive Logs</button>
        </div>
      </div>
    </div>
  );

  const renderHolidays = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Holiday Calendar 2024</h3>
          <p className="text-sm text-slate-500">Configure public and optional holidays for this fiscal year.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          <Plus size={18} />
          Add Holiday
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Holiday Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_HOLIDAYS.map((hol) => (
              <tr key={hol.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-bold text-slate-800">{hol.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {new Date(hol.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    hol.type === 'Public' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {hol.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Master List of Clients</h3>
          <p className="text-sm text-slate-500">Manage organizational clients and billing entities.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CLIENTS.map((client) => (
          <div key={client.id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-100 p-3 rounded-xl text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Building2 size={24} />
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                client.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'
              }`}>
                {client.status}
              </span>
            </div>
            <h4 className="font-bold text-slate-800 text-lg mb-1">{client.name}</h4>
            <p className="text-xs text-slate-500 font-medium mb-4">{client.industry}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold border-t border-slate-50 pt-4">
              <MapPin size={12} />
              {client.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocations = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Office Locations</h3>
          <p className="text-sm text-slate-500">Global footprint of LuminaHR corporate offices.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          <Plus size={18} />
          Add Location
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Location Name</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_LOCATIONS.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    {loc.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{loc.city}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium flex items-center gap-2">
                    <Globe size={14} className="text-slate-400" />
                    {loc.country}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase">
                      {loc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'holidays', label: 'Holidays', icon: Palmtree },
    { id: 'clients', label: 'Clients', icon: Building2 },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'audit', label: 'Audit Logs', icon: History },
    { id: 'rbac', label: 'Access Matrix', icon: Grid3X3 },
  ];

  return (
    <div className="flex gap-8">
      {/* Side Tabs Navigation */}
      <div className="w-64 shrink-0">
        <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm space-y-1">
          <div className="px-4 py-3 mb-2 flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">System Master</h2>
            <ShieldAlert size={14} className="text-indigo-400" />
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as SettingsTab);
                setSearchQuery('');
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} />
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group border border-slate-800">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Security Health</p>
            <h4 className="text-lg font-bold mb-2">RBAC: Enforced</h4>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400">7 Roles Configured</span>
            </div>
          </div>
          <Activity size={80} className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-x-hidden">
        {activeTab === 'holidays' && renderHolidays()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'locations' && renderLocations()}
        {activeTab === 'audit' && renderAuditLogs()}
        {activeTab === 'rbac' && renderRBACMatrix()}
      </div>
    </div>
  );
};

export default Settings;
