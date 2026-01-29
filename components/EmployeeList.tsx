
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { EmployeeStatus } from '../types';

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Employee Directory</h2>
          <p className="text-slate-500 text-sm">Manage employee profiles and privacy compliance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50">
            <Filter className="h-4 w-4 text-slate-600" />
          </button>
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
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
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
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700">{emp.department}</p>
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
                      {emp.gdprConsent ? 'Consent Active' : 'Pending Action'}
                    </span>
                    {emp.sensitiveDataEncrypted && (
                      <ShieldCheck className="text-indigo-500 h-4 w-4" title="Data Encrypted" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-xs text-slate-500 italic">
          * Employee PII is processed under Article 6(1)(b) for contract performance.
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs border border-slate-200 rounded-md hover:bg-white transition-colors">Previous</button>
          <button className="px-3 py-1 text-xs border border-slate-200 rounded-md hover:bg-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
