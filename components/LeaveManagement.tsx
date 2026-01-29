
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Filter,
  Info,
  X,
  ChevronRight,
  ShieldCheck,
  CalendarDays,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  History
} from 'lucide-react';
import { MOCK_LEAVE_REQUESTS } from '../constants';
import { LeaveStatus, LeaveRequest, LeaveType, Holiday } from '../types';

interface LeaveManagementProps {
  holidays: Holiday[];
}

const LeaveManagement: React.FC<LeaveManagementProps> = ({ holidays }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [visibleReasonId, setVisibleReasonId] = useState<string | null>(null);

  // Balances
  const [balances, setBalances] = useState({
    [LeaveType.ANNUAL]: 18,
    [LeaveType.SICK]: 10,
    [LeaveType.PERSONAL]: 5
  });
  
  // Form State
  const [newRequest, setNewRequest] = useState({
    type: LeaveType.ANNUAL,
    startDate: '',
    endDate: '',
    reason: ''
  });

  const getStatusStyle = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.APPROVED: return 'bg-green-100 text-green-700';
      case LeaveStatus.REJECTED: return 'bg-red-100 text-red-700';
      case LeaveStatus.PENDING: return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const holidayOverlaps = useMemo(() => {
    if (!newRequest.startDate || !newRequest.endDate) return [];
    const start = new Date(newRequest.startDate);
    const end = new Date(newRequest.endDate);
    
    return holidays.filter(h => {
      const hDate = new Date(h.date);
      return hDate >= start && hDate <= end;
    });
  }, [newRequest.startDate, newRequest.endDate, holidays]);

  const calculatedDays = useMemo(() => {
    if (!newRequest.startDate || !newRequest.endDate) return 0;
    const start = new Date(newRequest.startDate);
    const end = new Date(newRequest.endDate);
    
    let count = 0;
    const curDate = new Date(start);
    while (curDate <= end) {
      const dayOfWeek = curDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHoliday = holidays.some(h => h.date === curDate.toISOString().split('T')[0]);
      
      if (!isWeekend && !isHoliday) {
        count++;
      }
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }, [newRequest.startDate, newRequest.endDate, holidays]);

  const canSubmit = useMemo(() => {
    const balance = balances[newRequest.type as keyof typeof balances];
    return calculatedDays > 0 && (newRequest.type === LeaveType.MATERNITY_PATERNITY || calculatedDays <= balance);
  }, [calculatedDays, newRequest.type, balances]);

  const handleStatusUpdate = (id: string, status: LeaveStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    console.log(`AUDIT: Leave Request ${id} ${status} by Admin.`);
  };

  const handleToggleReason = (id: string) => {
    if (visibleReasonId === id) {
      setVisibleReasonId(null);
    } else {
      setVisibleReasonId(id);
      console.log(`AUDIT: Sensitive data (Leave Reason) accessed for record ${id}. Logged per Art. 30.`);
    }
  };

  const handleSubmit = () => {
    const request: LeaveRequest = {
      id: `LR${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      employeeId: 'EMP001',
      employeeName: 'Marcus Wright',
      type: newRequest.type,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      days: calculatedDays,
      status: LeaveStatus.PENDING,
      reason: newRequest.reason
    };
    
    setRequests([request, ...requests]);
    setIsModalOpen(false);
    setStep(1);
    setNewRequest({ type: LeaveType.ANNUAL, startDate: '', endDate: '', reason: '' });
  };

  const renderRequestModal = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
      <div className="relative bg-white w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <CalendarDays size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Request Time Off</h2>
              <p className="text-xs text-slate-500 font-medium">Work-Life Balance Management</p>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">Leave Category</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(LeaveType).map((t) => (
                    <button
                      key={t}
                      onClick={() => setNewRequest({...newRequest, type: t})}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        newRequest.type === t 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                      }`}
                    >
                      <span className="text-sm font-bold">{t}</span>
                      {newRequest.type === t && <CheckCircle2 size={18} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newRequest.startDate}
                    onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">End Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newRequest.endDate}
                    onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                  />
                </div>
              </div>

              {holidayOverlaps.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-800">Public Holidays Detected</p>
                    <p className="text-[10px] text-amber-700 leading-tight">
                      The selected period includes: {holidayOverlaps.map(h => h.name).join(', ')}. These days will not be deducted from your balance.
                    </p>
                  </div>
                </div>
              )}

              {calculatedDays > 0 && (
                <div className={`p-4 rounded-2xl text-white flex items-center justify-between animate-in zoom-in-95 ${canSubmit ? 'bg-indigo-900' : 'bg-red-900'}`}>
                  <div className="flex items-center gap-3">
                    <Clock className={canSubmit ? 'text-indigo-400' : 'text-red-400'} />
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${canSubmit ? 'text-indigo-300' : 'text-red-300'}`}>Total Working Days</p>
                      <p className="text-lg font-black">{calculatedDays} Days</p>
                    </div>
                  </div>
                  {!canSubmit && (
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-red-300 uppercase tracking-tight">Insufficient Balance</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">Reason for Absence</label>
                <textarea 
                  rows={4}
                  placeholder="Provide brief details..."
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                ></textarea>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-amber-800">
                  <ShieldCheck size={20} className="shrink-0" />
                  <h4 className="font-bold text-sm">GDPR Data Protection Notice</h4>
                </div>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Reasons for absence related to health are <strong>Special Category Data</strong>. 
                  LuminaHR restricts visibility to authorized managers.
                </p>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="h-5 w-5 rounded border-2 border-amber-400 flex items-center justify-center bg-white group-hover:bg-amber-100 transition-colors">
                    <Check size={14} className="text-amber-600" />
                  </div>
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-tight">I consent to secure processing</span>
                  <input type="checkbox" className="hidden" defaultChecked />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
          <button 
            onClick={() => setStep(1)}
            className={`px-6 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors ${step === 1 ? 'invisible' : ''}`}
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
            {step === 1 ? (
              <button 
                onClick={() => setStep(2)}
                disabled={!canSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 disabled:opacity-50"
              >
                Next Step
                <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 px-10 py-3 bg-indigo-900 text-white rounded-2xl text-sm font-bold hover:bg-black shadow-lg shadow-indigo-200"
              >
                Submit Request
                <ShieldCheck size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Annual Balance', value: `${balances[LeaveType.ANNUAL]} Days`, icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Sick Entitlement', value: `${balances[LeaveType.SICK]} Days`, icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Personal Remaining', value: `${balances[LeaveType.PERSONAL]} Days`, icon: Info, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
             <History className="text-slate-400" size={20} />
             <div>
               <h3 className="text-lg font-black text-slate-800">Leave History</h3>
               <p className="text-xs text-slate-500 font-medium">Tracking and approval management</p>
             </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95"
          >
            <Plus size={18} />
            Request Leave
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Working Days</th>
                <th className="px-6 py-4">Reason (Encrypted)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{req.employeeName}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{req.employeeId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] px-2 py-1 bg-slate-100 rounded-lg font-black text-slate-500 uppercase tracking-tight">
                      {req.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{req.startDate}</span>
                      <span className="text-[10px] text-slate-400">to {req.endDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">{req.days}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleToggleReason(req.id)}
                      className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {visibleReasonId === req.id ? (
                        <>
                          <EyeOff size={14} />
                          {req.reason}
                        </>
                      ) : (
                        <>
                          <Eye size={14} />
                          <span className="tracking-tighter opacity-30 italic">Secure View</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {req.status === LeaveStatus.PENDING ? (
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(req.id, LeaveStatus.APPROVED)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all" 
                          title="Approve"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(req.id, LeaveStatus.REJECTED)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all" 
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                        <UserCheck size={12} /> Logged
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && renderRequestModal()}
    </div>
  );
};

export default LeaveManagement;
