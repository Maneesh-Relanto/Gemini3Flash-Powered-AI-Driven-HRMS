
import React, { useState, useMemo } from 'react';
import { 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  ShieldCheck, 
  Kanban, 
  LayoutList,
  Search,
  BrainCircuit,
  Filter,
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface Task {
  id: string;
  module: string;
  feature: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  compliance: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 'TASK-001', module: 'PIM', feature: 'Employee Directory UI', priority: 'High', status: 'Completed', compliance: 'Art 15' },
  { id: 'TASK-002', module: 'PIM', feature: 'PII Encryption Layer', priority: 'High', status: 'Completed', compliance: 'Art 32' },
  { id: 'TASK-003', module: 'PIM', feature: 'Employee Details Drawer', priority: 'Medium', status: 'Completed', compliance: 'Art 15' },
  { id: 'TASK-004', module: 'Leave', feature: 'Leave Request Workflow', priority: 'High', status: 'Completed', compliance: 'Recital 47' },
  { id: 'TASK-005', module: 'Leave', feature: 'Balance Tracking Engine', priority: 'Medium', status: 'Completed', compliance: 'Art 5' },
  { id: 'TASK-006', module: 'Leave', feature: 'Sensitive Reason Masking', priority: 'High', status: 'Completed', compliance: 'Art 9' },
  { id: 'TASK-007', module: 'Time', feature: 'Weekly Timesheet Grid', priority: 'High', status: 'Completed', compliance: 'Art 5' },
  { id: 'TASK-008', module: 'Time', feature: 'Project Association', priority: 'Low', status: 'Completed', compliance: 'N/A' },
  { id: 'TASK-009', module: 'Time', feature: 'Approval Flow', priority: 'Medium', status: 'Completed', compliance: 'Art 30' },
  { id: 'TASK-010', module: 'Compliance', feature: 'AI GDPR Assistant', priority: 'Medium', status: 'Completed', compliance: 'Gen. Guidance' },
  { id: 'TASK-011', module: 'Compliance', feature: 'SAR Data Portability Export', priority: 'High', status: 'In Progress', compliance: 'Art 20' },
  { id: 'TASK-012', module: 'Compliance', feature: 'Right to Erasure Hook', priority: 'High', status: 'In Progress', compliance: 'Art 17' },
  { id: 'TASK-013', module: 'Compliance', feature: 'Centralized Audit Log', priority: 'Medium', status: 'In Progress', compliance: 'Art 30' },
  { id: 'TASK-014', module: 'Core', feature: 'AI HR Insights Engine', priority: 'Low', status: 'Completed', compliance: 'N/A' },
  { id: 'TASK-015', module: 'Security', feature: 'Multi-Role Access Control', priority: 'High', status: 'Pending', compliance: 'Art 25' },
];

const TaskMaster: React.FC = () => {
  const [view, setView] = useState<'list' | 'board'>('board');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return INITIAL_TASKS.filter(t => {
      const matchesFilter = filter === 'All' || t.module === filter;
      const matchesSearch = t.feature.toLowerCase().includes(search.toLowerCase()) || 
                            t.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const stats = useMemo(() => {
    const total = INITIAL_TASKS.length;
    const completed = INITIAL_TASKS.filter(t => t.status === 'Completed').length;
    return {
      percent: Math.round((completed / total) * 100),
      total,
      completed,
      pending: total - completed
    };
  }, []);

  const handleAiAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulating a deep analysis of backlog vs GDPR requirements
    setTimeout(() => {
      setAiSuggestion("Based on current progress, Priority #1 is TASK-015 (RBAC). Implementing Art 25 (Privacy by Design) is foundational for all remaining modules. I recommend finalizing the 'Right to Erasure' hook immediately after.");
      setIsAnalyzing(false);
    }, 1500);
  };

  const renderBoard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {['Pending', 'In Progress', 'Completed'].map((status) => (
        <div key={status} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${status === 'Completed' ? 'bg-green-500' : status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
              {status}
            </h3>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {filteredTasks.filter(t => t.status === status).length}
            </span>
          </div>
          
          <div className="space-y-3 min-h-[400px]">
            {filteredTasks.filter(t => t.status === status).map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-400 transition-colors">{task.id}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    task.priority === 'High' ? 'bg-red-50 text-red-600' : 
                    task.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-3">{task.feature}</h4>
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{task.compliance}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase">{task.module}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderList = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Module</th>
            <th className="px-6 py-4">Feature Name</th>
            <th className="px-6 py-4">Priority</th>
            <th className="px-6 py-4">Compliance</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredTasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-xs font-mono text-slate-400">{task.id}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                  {task.module}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-bold text-slate-800">{task.feature}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  task.priority === 'High' ? 'text-red-600 bg-red-50' : 
                  task.priority === 'Medium' ? 'text-orange-600 bg-orange-50' : 
                  'text-blue-600 bg-blue-50'
                }`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <ShieldCheck size={12} className="text-indigo-400" />
                  {task.compliance}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  {task.status === 'Completed' ? <CheckCircle2 className="text-green-500" size={16} /> : 
                   task.status === 'In Progress' ? <Clock className="text-blue-500 animate-pulse" size={16} /> : 
                   <div className="h-4 w-4 rounded-full border-2 border-slate-200"></div>}
                  {task.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <Target size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Project Roadmap</h2>
              <p className="text-sm text-slate-500 font-medium">LuminaHR Phase 1 Development</p>
            </div>
          </div>
          <div className="flex items-center gap-6 pr-4">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Health Score</p>
              <p className="text-xl font-black text-green-600">92/100</p>
            </div>
            <div className="h-10 w-px bg-slate-100"></div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Completion</p>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${stats.percent}%` }}></div>
                </div>
                <span className="text-sm font-bold text-slate-800">{stats.percent}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="text-indigo-400" size={18} />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Gemini Task Architect</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              AI-driven prioritization for regulatory deadlines.
            </p>
            <button 
              onClick={handleAiAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing Framework..." : "Optimize Backlog"}
              <ArrowRight size={14} />
            </button>
          </div>
          
          {aiSuggestion && !isAnalyzing && (
            <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/10 text-[10px] text-indigo-100 leading-relaxed animate-in slide-in-from-top-2">
              {aiSuggestion}
            </div>
          )}

          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 group-hover:scale-110 transition-transform">
             <Target size={120} />
          </div>
        </div>
      </div>

      {/* View Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setView('board')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'board' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Kanban size={14} />
            Board View
          </button>
          <button 
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <LayoutList size={14} />
            Backlog List
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search features..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <select 
              className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none appearance-none cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All Modules</option>
              <option>PIM</option>
              <option>Leave</option>
              <option>Time</option>
              <option>Compliance</option>
              <option>Security</option>
            </select>
          </div>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="min-h-[500px]">
        {view === 'board' ? renderBoard() : renderList()}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Completed Tasks', value: stats.completed, sub: 'Out of ' + stats.total, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending PII Hooks', value: '3', sub: 'High Priority', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Compliance Debt', value: 'Low', sub: 'Calculated by AI', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Next Deadline', value: 'Jun 15', sub: 'Sprint #4 Ends', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`${item.bg} ${item.color} p-3 rounded-xl`}>
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-lg font-black text-slate-800">{item.value}</p>
              <p className="text-[10px] text-slate-500 font-medium">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskMaster;
