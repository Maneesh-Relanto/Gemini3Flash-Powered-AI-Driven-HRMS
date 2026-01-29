
import React from 'react';
// Added ShieldCheck to imports to fix the error on line 122
import { ListTodo, CheckCircle2, Circle, Clock, AlertTriangle, Download, ShieldCheck } from 'lucide-react';

const TASKS = [
  { id: 'TASK-001', module: 'PIM', feature: 'Employee Directory UI', priority: 'High', status: 'Completed', compliance: 'Art 15 (Access)' },
  { id: 'TASK-002', module: 'PIM', feature: 'PII Encryption Layer', priority: 'High', status: 'Completed', compliance: 'Art 32 (Security)' },
  { id: 'TASK-004', module: 'Leave', feature: 'Leave Request Workflow', priority: 'High', status: 'Completed', compliance: 'Recital 47' },
  { id: 'TASK-007', module: 'Time', feature: 'Weekly Timesheet Grid', priority: 'High', status: 'Completed', compliance: 'Art 5 (Minimization)' },
  { id: 'TASK-011', module: 'Compliance', feature: 'Subject Access Request (SAR) Export', priority: 'High', status: 'In Progress', compliance: 'Art 20 (Portability)' },
  { id: 'TASK-012', module: 'Compliance', feature: 'Right to Erasure (Forget Me) Hook', priority: 'High', status: 'In Progress', compliance: 'Art 17 (Erasure)' },
  { id: 'TASK-013', module: 'Compliance', feature: 'Centralized Audit Log', priority: 'Medium', status: 'In Progress', compliance: 'Art 30 (ROPA)' },
  { id: 'TASK-015', module: 'Security', feature: 'Multi-Role Access Control (RBAC)', priority: 'High', status: 'Pending', compliance: 'Art 25 (Privacy by Design)' },
];

const TaskMaster: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'In Progress': return <Clock className="text-blue-500 animate-pulse" size={16} />;
      default: return <Circle className="text-slate-300" size={16} />;
    }
  };

  const getPriorityStyle = (prio: string) => {
    switch (prio) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-indigo-100">
            <ListTodo size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Project Task Master</h2>
            <p className="text-sm text-slate-500">MVP Feature Roadmap & GDPR Implementation Tracker</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">MVP Completion</p>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[75%]"></div>
              </div>
              <span className="text-sm font-bold text-slate-800">75%</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Export Backlog (CSV)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Module</th>
              <th className="px-6 py-4">Feature Name</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">GDPR Compliance</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TASKS.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{task.id}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                    {task.module}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">{task.feature}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityStyle(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <AlertTriangle size={12} className="text-indigo-400" />
                    {task.compliance}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    {getStatusIcon(task.status)}
                    {task.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
          <h4 className="text-indigo-900 font-bold mb-2">Development Note</h4>
          <p className="text-sm text-indigo-700 leading-relaxed">
            The current focus is on finalizing **Art 17 (Right to Erasure)** and **Art 20 (Data Portability)**. All database hooks for "Forget Me" requests must be idempotent and audit-logged to satisfy regulatory scrutiny.
          </p>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Next Sprint</p>
            <h4 className="text-lg font-bold">Role-Based Access Control (RBAC)</h4>
            <p className="text-xs text-slate-400 mt-2 italic">Scheduled for Deployment: June 05, 2024</p>
          </div>
          <div className="bg-indigo-500/20 p-4 rounded-full border border-indigo-500/30">
            <ShieldCheck className="text-indigo-400" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskMaster;
