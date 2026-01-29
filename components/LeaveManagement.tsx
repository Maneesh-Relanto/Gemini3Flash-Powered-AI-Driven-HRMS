
import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Filter,
  Info
} from 'lucide-react';
import { MOCK_LEAVE_REQUESTS } from '../constants';
import { LeaveStatus } from '../types';

const LeaveManagement: React.FC = () => {
  const [requests, setRequests] = useState(MOCK_LEAVE_REQUESTS);

  const getStatusStyle = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.APPROVED: return 'bg-green-100 text-green-700';
      case LeaveStatus.REJECTED: return 'bg-red-100 text-red-700';
      case LeaveStatus.PENDING: return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Annual Leave Balance', value: '18 Days', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Sick Leave Used', value: '4 Days', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Personal Leave', value: '2 Days', icon: Info, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Leave Requests</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-sm hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={18} />
              Request Leave
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Days</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{req.employeeName}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-600">
                      {req.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {req.startDate} to {req.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{req.days}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyle(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {req.status === LeaveStatus.PENDING ? (
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                          <CheckCircle2 size={20} />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                          <XCircle size={20} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start gap-3">
        <Info className="text-indigo-600 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-indigo-700 leading-relaxed">
          <strong>GDPR Note:</strong> Leave reasons may contain sensitive health data (Special Categories under Art 9). Access is restricted to HR managers and direct supervisors only. Data is purged 3 years after employment ends.
        </p>
      </div>
    </div>
  );
};

export default LeaveManagement;
