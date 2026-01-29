
import React, { useState } from 'react';
import { 
  Lock, 
  FileText, 
  Activity, 
  MessageCircle, 
  ShieldCheck,
  Download,
  Send,
  Loader2
} from 'lucide-react';
import { COMPLIANCE_CHECKLIST } from '../constants';
import { geminiService } from '../services/geminiService';

const ComplianceCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAiConsult = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const response = await geminiService.checkCompliance(query);
    setAiResponse(response);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">GDPR Compliance Dashboard</h2>
              <p className="text-slate-500 text-sm">Real-time regulatory compliance and data protection status.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMPLIANCE_CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <span className="ml-auto text-[10px] font-bold text-slate-400">VERIFIED</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">256-bit AES Encryption</p>
                <p className="text-xs text-slate-500">All sensitive employee PII is encrypted at rest.</p>
              </div>
            </div>
            <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-2">
              <Download size={16} />
              Export ROPA
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-indigo-600" />
            Audit Log (Privacy Actions)
          </h3>
          <div className="space-y-4">
            {[
              { action: "PII Access", user: "Admin (Marcus W.)", target: "EMP042", time: "2 mins ago" },
              { action: "Data Export", user: "HR Lead (Sarah C.)", target: "Payroll Report", time: "1 hour ago" },
              { action: "Consent Revoked", user: "System", target: "EMP099", time: "3 hours ago" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-l-2 border-indigo-500 pl-4">
                <div>
                  <p className="text-sm font-bold text-slate-800">{log.action}</p>
                  <p className="text-xs text-slate-500">By {log.user} on {log.target}</p>
                </div>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{log.time}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
            View Full Compliance History
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 flex flex-col min-h-[500px]">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle size={24} className="text-indigo-200" />
            <h3 className="text-xl font-bold">Lumina AI Legal Assistant</h3>
          </div>
          
          <div className="flex-1 bg-white/10 rounded-2xl p-4 mb-4 overflow-y-auto backdrop-blur-sm border border-white/10 text-sm">
            {aiResponse ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-indigo-500/30 p-3 rounded-xl ml-4">
                  <p className="text-xs font-bold text-indigo-100 mb-1">YOUR QUERY</p>
                  <p>{query}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <p className="text-xs font-bold text-indigo-200 mb-1">AI GUIDANCE</p>
                  <p className="leading-relaxed">{aiResponse}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-indigo-100 opacity-60 text-center">
                <ShieldCheck size={48} className="mb-4 text-indigo-300" />
                <p>Ask about GDPR articles, worker rights, or storage limitations.</p>
              </div>
            )}
          </div>

          <div className="relative">
            <textarea 
              className="w-full bg-white/20 border border-white/20 rounded-2xl p-4 text-sm placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/40 resize-none"
              placeholder="e.g. How long can we store resume data under GDPR?"
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              onClick={handleAiConsult}
              disabled={loading}
              className="absolute bottom-4 right-4 bg-white text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
          <p className="mt-4 text-[10px] text-indigo-200 opacity-80 text-center">
            AI-generated guidance should be reviewed by your legal department.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-blue-600" />
            <h4 className="font-bold text-slate-800">Quick Policies</h4>
          </div>
          <ul className="space-y-2">
            <li><button className="text-xs text-slate-600 hover:text-indigo-600">Privacy Notice 2024.pdf</button></li>
            <li><button className="text-xs text-slate-600 hover:text-indigo-600">Data Retention Policy.pdf</button></li>
            <li><button className="text-xs text-slate-600 hover:text-indigo-600">Employee Rights Charter.pdf</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCenter;
