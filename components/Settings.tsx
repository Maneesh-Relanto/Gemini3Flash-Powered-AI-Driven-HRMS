
import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { MOCK_HOLIDAYS, MOCK_CLIENTS, MOCK_LOCATIONS } from '../constants';

type SettingsTab = 'holidays' | 'clients' | 'locations';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('holidays');
  const [searchQuery, setSearchQuery] = useState('');

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
  ];

  return (
    <div className="flex gap-8">
      {/* Side Tabs Navigation */}
      <div className="w-64 shrink-0">
        <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm space-y-1">
          <div className="px-4 py-3 mb-2">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Master Data</h2>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
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

        <div className="mt-6 bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">System Health</p>
            <h4 className="text-lg font-bold mb-2">DB Node: Active</h4>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400">Lat: 12ms</span>
            </div>
          </div>
          <SettingsIcon size={80} className="absolute -bottom-4 -right-4 text-white/5 group-hover:rotate-45 transition-transform duration-1000" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === 'holidays' && renderHolidays()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'locations' && renderLocations()}
      </div>
    </div>
  );
};

export default Settings;
