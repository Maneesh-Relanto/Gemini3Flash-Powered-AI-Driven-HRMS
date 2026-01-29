
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
  Shield,
  Eye,
  Pencil,
  BrainCircuit,
  Key,
  ShieldQuestion,
  Info,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { MOCK_HOLIDAYS, MOCK_CLIENTS, MOCK_LOCATIONS, MOCK_AUDIT_LOGS, ROLE_PERMISSIONS } from '../constants';
import { UserRole, AIProvider } from '../types';
import { AVAILABLE_MODELS } from '../services/geminiService';

type SettingsTab = 'holidays' | 'clients' | 'locations' | 'audit' | 'rbac' | 'ai';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('holidays');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAIProvider, setActiveAIProvider] = useState<AIProvider>(AIProvider.GEMINI);
  const [activeModel, setActiveModel] = useState(AVAILABLE_MODELS[0].id);

  const filteredAuditLogs = useMemo(() => {
    return MOCK_AUDIT_LOGS.filter(log => 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleReconnectKey = async () => {
    // Calling the native AI Studio key selection dialog.
    // This satisfies the requirement that keys are not managed by application UI.
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        alert("Secure connection established via Platform Provider.");
      } else {
        alert("Platform Key Management service is not available in this environment.");
      }
    } catch (e) {
      console.error("Key selection error:", e);
    }
  };

  const renderAIConfig = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">AI Orchestrator</h3>
          <p className="text-sm text-slate-500">Configure global LLM providers and model parameters for HR automation.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-100 animate-pulse">
          <Activity size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Active Connection</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Cpu size={14} className="text-indigo-600" />
              Provider Orchestration
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 pl-1">Primary LLM Provider</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={activeAIProvider}
                  onChange={(e) => setActiveAIProvider(e.target.value as AIProvider)}
                >
                  {Object.values(AIProvider).map(p => (
                    <option key={p} value={p} disabled={p.includes('Coming Soon')}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 pl-1">Inference Model</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={activeModel}
                  onChange={(e) => setActiveModel(e.target.value)}
                >
                  {AVAILABLE_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group border border-slate-800">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-600 rounded-2xl">
                  <Key size={24} />
                </div>
                <h4 className="font-black text-lg">Secure Identity Handshake</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                LuminaHR does not store AI credentials locally. Every session is secured via a platform-level identity handshake with your cloud provider.
              </p>
              <button 
                onClick={handleReconnectKey}
                className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                Reconnect Secure API Gateway
                <ShieldCheck size={18} />
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                className="flex items-center justify-center gap-2 mt-6 text-[10px] text-slate-500 hover:text-white transition-colors"
              >
                View Billing Documentation
                <ExternalLink size={10} />
              </a>
            </div>
            <Lock className="absolute -bottom-12 -right-12 h-64 w-64 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl">
            <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck size={16} />
              GDPR & Data Sovereignty
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>Zero Training:</strong> Input data is never used to train or refine foundational models.
                </p>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>Ephemeral Processing:</strong> Prompts are deleted from the model context immediately after response generation.
                </p>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>PII Scrubbing:</strong> LuminaHR automatically sanitizes identifies before sending context to LLM endpoints.
                </p>
              </li>
            </ul>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Latency</p>
              <h5 className="text-xl font-black text-slate-800">1.2s</h5>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tokens Used</p>
              <h5 className="text-xl font-black text-slate-800">4.5k <span className="text-[10px] text-slate-400 font-bold uppercase">Today</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRBACMatrix = () => {
    const roles = Object.values(UserRole);
    const modules = [
      { id: 'dashboard', label: 'Dashboard', desc: 'Core KPIs and AI Insights' },
      { id: 'employees', label: 'PIM (Personnel)', desc: 'Employee Directory and Profiles' },
      { id: 'payDetails', label: 'Pay Details (PII)', desc: 'Salaries, History & Payroll Info' },
      { id: 'leave', label: 'Leave Management', desc: 'Vacation and Sick Leave Tracking' },
      { id: 'timesheets', label: 'Time Tracking', desc: 'Weekly Timesheets and Projects' },
      { id: 'compliance', label: 'GDPR / Compliance', desc: 'Regulatory Oversight and SAR' },
      { id: 'roadmap', label: 'Task Master', desc: 'Development Roadmap and Tasks' },
      { id: 'settings', label: 'System Settings', desc: 'Master Data and RBAC Config' },
      { id: 'aiConfig', label: 'AI Orchestrator', desc: 'Provider Config & Model Management' },
    ];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Granular Accessibility Matrix</h3>
            <p className="text-sm text-slate-500">Define Read (View) and Write (Edit) permissions for all organizational roles.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              <Eye size={12} /> Read Only
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
              <Pencil size={12} /> Full Write
            </div>
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
                  <th key={role} className="p-4 border-b border-slate-100 min-w-[160px] text-center group bg-slate-50/50">
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
                    const perms = ROLE_PERMISSIONS[role][mod.id] || { read: false, write: false };
                    return (
                      <td key={`${mod.id}-${role}`} className="p-4 text-center border-l border-slate-50/50">
                        <div className="flex items-center justify-center gap-3">
                          <div className={`flex flex-col items-center gap-1 transition-all ${perms.read ? 'opacity-100' : 'opacity-10'}`}>
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center border shadow-sm ${
                              perms.read ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-300'
                            }`}>
                              <Eye size={16} />
                            </div>
                            <span className="text-[8px] font-black uppercase">Read</span>
                          </div>

                          <div className={`flex flex-col items-center gap-1 transition-all ${perms.write ? 'opacity-100' : 'opacity-10'}`}>
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center border shadow-sm ${
                              perms.write ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-300'
                            }`}>
                              <Pencil size={16} />
                            </div>
                            <span className="text-[8px] font-black uppercase">Write</span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );

  const tabs = [
    { id: 'holidays', label: 'Holidays', icon: Palmtree },
    { id: 'clients', label: 'Clients', icon: Building2 },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'audit', label: 'Audit Logs', icon: History },
    { id: 'rbac', label: 'Access Matrix', icon: Grid3X3 },
    { id: 'ai', label: 'AI Orchestrator', icon: BrainCircuit },
  ];

  return (
    <div className="flex gap-8">
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
              <span className="text-[10px] font-bold text-slate-400">8 Roles Configured</span>
            </div>
          </div>
          <Activity size={80} className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
        </div>
      </div>

      <div className="flex-1 overflow-x-hidden">
        {activeTab === 'holidays' && <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">Holidays View</div>}
        {activeTab === 'clients' && <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">Clients View</div>}
        {activeTab === 'locations' && <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">Locations View</div>}
        {activeTab === 'audit' && renderAuditLogs()}
        {activeTab === 'rbac' && renderRBACMatrix()}
        {activeTab === 'ai' && renderAIConfig()}
      </div>
    </div>
  );
};

export default Settings;
