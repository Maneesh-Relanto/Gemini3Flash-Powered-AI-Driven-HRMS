
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
  UserCheck,
  ChevronRight,
  Shield,
  Info,
  Check
} from 'lucide-react';
import { MOCK_EMPLOYEES, DEPARTMENTS } from '../constants';
import { Employee, EmployeeStatus } from '../types';

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'job' | 'privacy'>('personal');
  const [addStep, setAddStep] = useState(1);

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

  const renderAddEmployeeModal = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)}></div>
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Add New Employee</h2>
              <p className="text-xs text-slate-500 font-medium">Exhaustive PIM Onboarding • PII Secured</p>
            </div>
          </div>
          <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-8 py-4 bg-white border-b border-slate-50 flex items-center justify-center gap-12">
          {[
            { step: 1, label: 'Identity' },
            { step: 2, label: 'Contact' },
            { step: 3, label: 'Employment' },
            { step: 4, label: 'Compliance' }
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                addStep === s.step ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110' : 
                addStep > s.step ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {addStep > s.step ? <Check size={14} /> : s.step}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${addStep === s.step ? 'text-indigo-600' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
          {addStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">First Name *</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. John" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Middle Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Quincy" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Last Name *</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Doe" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee ID *</span>
                    <span className="text-[8px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Read Only</span>
                  </label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 font-mono" value="EMP-AUTO-2024-042" disabled />
                </div>
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Other ID (SSN/National)</span>
                    <div className="flex items-center gap-1 text-[8px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                      <Lock size={8} /> PII Secured
                    </div>
                  </label>
                  <input type="password" title="This field is hashed upon storage" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="•••••••••" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Date of Birth *</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Gender</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nationality</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. British" />
                </div>
              </div>
            </div>
          )}

          {addStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Work Email *</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="john.doe@lumina.io" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Personal Email</span>
                    <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">PII</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="john.private@gmail.com" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Residential Address (Secure PII)</label>
                <div className="space-y-3">
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Street Address Line 1" />
                  <div className="grid grid-cols-3 gap-3">
                    <input type="text" className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="City" />
                    <input type="text" className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="State/Province" />
                    <input type="text" className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Zip/Postal" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mobile Phone</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="tel" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Emergency Contact Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Primary Contact Person" />
                </div>
              </div>
            </div>
          )}

          {addStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Joined Date *</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Department *</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Job Title *</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Senior Software Engineer" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Employment Status *</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                    <option>Full-Time Permanent</option>
                    <option>Full-Time Contract</option>
                    <option>Part-Time</option>
                    <option>Freelance / Consultant</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Supervisor / Manager</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Search by name..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Job Location</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Global HQ (Palo Alto)" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {addStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-indigo-900 rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="text-indigo-400" />
                    <h3 className="font-bold">Lumina Privacy Guard</h3>
                  </div>
                  <p className="text-xs text-indigo-100 leading-relaxed mb-6">
                    Lumina enforces GDPR Article 25 (Privacy by Design). This onboarding flow ensures data minimization and explicit consent capture.
                  </p>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group">
                      <div className="h-5 w-5 rounded border-2 border-indigo-400 flex items-center justify-center transition-colors group-hover:border-white">
                        <Check size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Explicit Consent Obtained</p>
                        <p className="text-[10px] text-indigo-200">User has accepted the Privacy Notice & Terms.</p>
                      </div>
                      <input type="checkbox" className="hidden" defaultChecked />
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                      <div className="h-5 w-5 rounded border-2 border-indigo-400 flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">SHA-256 Field Encryption Verified</p>
                        <p className="text-[10px] text-indigo-200">PII identifiers will be hashed upon database write.</p>
                      </div>
                      <input type="checkbox" className="hidden" defaultChecked />
                    </label>
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-12 -mt-12 opacity-10">
                  <Shield size={160} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Legal Basis for Processing *</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                    <option>Art. 6(1)(b) - Contractual Requirement</option>
                    <option>Art. 6(1)(c) - Legal Obligation</option>
                    <option>Art. 6(1)(a) - Consent-Based</option>
                    <option>Art. 6(1)(f) - Legitimate Interests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Data Retention Period</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                    <option>Employment Duration + 7 Years</option>
                    <option>Employment Duration + 3 Years</option>
                    <option>Custom (Set by System Admin)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                <Info size={18} className="text-orange-600 shrink-0 mt-0.5" />
                <p className="text-xs text-orange-800 leading-relaxed">
                  <strong>Warning:</strong> You are about to create a high-privileged data record. Every keystroke in this module is recorded in the <strong>System Audit Log</strong> for security auditing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
          <button 
            onClick={() => setAddStep(Math.max(1, addStep - 1))}
            className={`px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors ${addStep === 1 ? 'invisible' : ''}`}
          >
            Previous
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
            {addStep < 4 ? (
              <button 
                onClick={() => setAddStep(addStep + 1)}
                className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={() => {
                  alert("Employee onboarding transaction finalized. Encryption keys rotated. PIM updated.");
                  setIsAddModalOpen(false);
                }}
                className="flex items-center gap-2 px-10 py-2.5 bg-indigo-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors shadow-lg shadow-indigo-200"
              >
                Finalize & Secure
                <ShieldCheck size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

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
            <button 
              onClick={() => {
                setAddStep(1);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
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

      {/* Add Employee Modal */}
      {isAddModalOpen && renderAddEmployeeModal()}

      {/* Employee Details Side-over Drawer */}
      {selectedEmployee && !isAddModalOpen && (
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
