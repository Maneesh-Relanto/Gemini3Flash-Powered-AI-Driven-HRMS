
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  ShieldCheck,
  UserPlus,
  X,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  Download,
  Trash2,
  Lock,
  UserCheck
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { Employee, EmployeeStatus } from '../types';

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'job' | 'privacy'>('personal');

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportData = (emp: Employee) => {
    alert(`Generating GDPR Subject Access Request (SAR) package for ${emp.firstName} ${emp.lastName}...\nThis will include all PII, audit logs, and processing purposes in JSON format.`);
  };

  const handleForgetEmployee = (emp: Employee) => {
    if (confirm(`Warning: This will trigger the 'Right to Erasure' (Art 17). All PII for ${emp.firstName} ${emp.lastName} will be permanently deleted from active databases. Proceed?`)) {
      alert("Employee data scheduled for deletion. Audit log entry created.");
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Employee Directory</h2>
            <p className="text-slate-500 text-sm">Centralized Personal Information Management (PIM).</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <UserPlus size={18} />
              Add Employee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">GDPR Consent</th>
                <th className="px-6 py-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr 
                  key={emp.id} 
                  className="hover:bg-slate-50/80 transition-all cursor-pointer group"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt="" className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-indigo-200" />
                      <div>
                        <p className="font-semibold text-slate-800">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-slate-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      emp.status === EmployeeStatus.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${emp.status === EmployeeStatus.ACTIVE ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700 font-medium">{emp.department}</p>
                    <p className="text-xs text-slate-500">{emp.role}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {emp.gdprConsent ? (
                        <CheckCircle className="text-green-500 h-4 w-4" />
                      ) : (
                        <XCircle className="text-red-400 h-4 w-4" />
                      )}
                      <span className="text-xs text-slate-500">
                        {emp.gdprConsent ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-indigo-600 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Details Side-over Drawer */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedEmployee(null)}></div>
          
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <img src={selectedEmployee.avatar} alt="" className="h-16 w-16 rounded-2xl object-cover border-4 border-white shadow-sm" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                  <p className="text-sm text-slate-500 font-medium">{selectedEmployee.role} • {selectedEmployee.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedEmployee(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-100 px-6">
              {[
                { id: 'personal', label: 'Personal', icon: UserCheck },
                { id: 'job', label: 'Job & Salary', icon: Briefcase },
                { id: 'privacy', label: 'GDPR & Privacy', icon: Lock },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id 
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Email Address</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-700">{selectedEmployee.email}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Phone Number</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-700">{selectedEmployee.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Location & Identity</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-slate-400 mt-1" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Primary Address</p>
                          <p className="text-sm text-slate-700">{selectedEmployee.address || 'Not disclosed'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar size={16} className="text-slate-400 mt-1" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Date of Birth</p>
                          <p className="text-sm text-slate-700">{selectedEmployee.dateOfBirth || 'Not disclosed'}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <h4 className="text-xs font-bold text-orange-800 uppercase tracking-widest mb-3">Emergency Contact</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-orange-900">{selectedEmployee.emergencyContact?.name || 'N/A'}</p>
                        <p className="text-xs text-orange-700">{selectedEmployee.emergencyContact?.relationship || 'N/A'}</p>
                      </div>
                      <p className="text-sm font-medium text-orange-900">{selectedEmployee.emergencyContact?.phone || 'N/A'}</p>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'job' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-100 rounded-xl">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Join Date</p>
                      <p className="text-lg font-bold text-slate-800">{selectedEmployee.joinDate}</p>
                    </div>
                    <div className="p-4 border border-slate-100 rounded-xl">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Pay Grade</p>
                      <p className="text-lg font-bold text-slate-800">{selectedEmployee.payGrade || 'Standard'}</p>
                    </div>
                  </div>
                  
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Organizational Structure</h4>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                        <UserCheck size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Supervisor</p>
                        <p className="text-sm font-bold text-slate-800">{selectedEmployee.supervisor || 'Reporting to CEO'}</p>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-4">
                    <ShieldCheck className="text-green-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-green-900">GDPR Compliant Record</h4>
                      <p className="text-xs text-green-700 mt-1 leading-relaxed">
                        Consent was obtained electronically on <strong>{selectedEmployee.gdprConsentDate || 'Join Date'}</strong>. 
                        Data is processed for the performance of the employment contract (Art. 6(1)(b)).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => handleExportData(selectedEmployee)}
                      className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="text-indigo-600" size={18} />
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-800">Export All Data (Portability)</p>
                          <p className="text-[10px] text-slate-500">Generate a Subject Access Request (SAR) package.</p>
                        </div>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleForgetEmployee(selectedEmployee)}
                      className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Trash2 className="text-red-600" size={18} />
                        <div className="text-left">
                          <p className="text-sm font-bold text-red-900">Forget Employee (Right to Erasure)</p>
                          <p className="text-[10px] text-red-700">Permanently delete PII upon contract termination.</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Encryption Metadata</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Lock size={12} className="text-indigo-400" />
                      <span>Sensitive fields (DOB, Home Address) are hashed with <strong>SHA-256</strong>.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/30">
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
