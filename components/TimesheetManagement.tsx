
import React from 'react';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send,
  Plus,
  Briefcase
} from 'lucide-react';
import { Client } from '../types';

interface TimesheetProps {
  clients: Client[];
}

const TimesheetManagement: React.FC<TimesheetProps> = ({ clients }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl">
              <CalendarIcon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Weekly Timesheet</h3>
              <p className="text-sm text-slate-500">May 13, 2024 - May 19, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
            <button className="p-2 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm">
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <span className="px-4 text-sm font-bold text-slate-700">Current Week</span>
            <button className="p-2 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm">
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4 mb-6">
          <div className="col-span-3 text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Project / Task</div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{day}</div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-8 gap-4 items-center group">
            <div className="col-span-3 space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <Briefcase size={14} className="text-slate-400" />
                <select className="bg-transparent border-none text-sm w-full outline-none font-bold appearance-none cursor-pointer">
                  {clients.map(cli => (
                    <option key={cli.id} value={cli.id}>{cli.name}</option>
                  ))}
                  <option value="internal">Internal Admin</option>
                </select>
              </div>
              <input className="px-3 text-xs text-slate-500 w-full bg-transparent outline-none italic pl-8" placeholder="Enter task description..." defaultValue="Backend API Implementation" />
            </div>
            {[8, 8, 7.5, 8, 6, 0, 0].map((h, i) => (
              <input 
                key={i} 
                type="number" 
                className={`w-full py-3 text-center bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${h === 0 ? 'text-slate-300' : 'text-slate-800'}`}
                defaultValue={h}
              />
            ))}
          </div>

          <button className="flex items-center gap-2 text-indigo-600 text-sm font-bold p-2 hover:bg-indigo-50 rounded-xl transition-colors">
            <Plus size={16} />
            Add Row
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Hours</p>
              <p className="text-2xl font-bold text-slate-900">37.5 <span className="text-sm font-normal text-slate-400">/ 40.0</span></p>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-bold">Draft</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Save size={18} />
              Save Draft
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              <Send size={18} />
              Submit for Approval
            </button>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-800 p-3 rounded-xl">
            <Clock size={24} className="text-indigo-300" />
          </div>
          <div>
            <h4 className="font-bold">Automated Attendance Log</h4>
            <p className="text-xs text-indigo-300">Last auto-save: Today at 14:32</p>
          </div>
        </div>
        <p className="text-xs text-indigo-200 max-w-md text-right leading-relaxed italic">
          "Data minimization applied: We only collect active working hours to satisfy labor laws and payroll accuracy (GDPR Recital 47)."
        </p>
      </div>
    </div>
  );
};

export default TimesheetManagement;
