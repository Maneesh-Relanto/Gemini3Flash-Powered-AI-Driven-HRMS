
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CalendarClock, 
  TrendingUp, 
  AlertCircle,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { geminiService } from '../services/geminiService';

const MOCK_STATS = [
  { name: 'Total Employees', value: '450', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'On Leave Today', value: '18', change: '-2', icon: CalendarClock, color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'Recruitment Funnel', value: '32', change: '+5', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  { name: 'Pending Approvals', value: '7', change: 'Critical', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
];

const CHART_DATA = [
  { name: 'Jan', hires: 4, attrition: 1 },
  { name: 'Feb', hires: 7, attrition: 2 },
  { name: 'Mar', hires: 5, attrition: 0 },
  { name: 'Apr', hires: 8, attrition: 3 },
  { name: 'May', hires: 12, attrition: 2 },
  { name: 'Jun', hires: 10, attrition: 4 },
];

const Dashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingAi(true);
      const res = await geminiService.getHRInsights(450, 7);
      if (res) {
        try {
          // Attempting to parse JSON if model follows instructions, otherwise raw text
          const cleanedText = res.replace(/```json|```/g, '').trim();
          setAiInsight(JSON.parse(cleanedText));
        } catch (e) {
          setAiInsight({ trend: "Analyzing performance", recommendation: "Review seasonal hiring plans", impact: "Efficiency optimization" });
        }
      }
      setLoadingAi(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Growth vs Attrition</h2>
            <select className="bg-slate-50 border-none rounded-lg text-sm p-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="hires" fill="#4f46e5" radius={[4, 4, 0, 0]} name="New Hires" />
                <Bar dataKey="attrition" fill="#ef4444" radius={[4, 4, 0, 0]} name="Attrition" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="text-indigo-300" />
              <h2 className="text-lg font-bold">Lumina AI Insight</h2>
            </div>
            
            {loadingAi ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-indigo-800 rounded w-3/4"></div>
                <div className="h-20 bg-indigo-800 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-indigo-200 text-xs uppercase tracking-wider font-bold mb-1">Current Trend</p>
                  <p className="text-sm font-medium">{aiInsight?.trend || "High retention in engineering dept."}</p>
                </div>
                <div>
                  <p className="text-indigo-200 text-xs uppercase tracking-wider font-bold mb-1">Recommendation</p>
                  <p className="text-sm">{aiInsight?.recommendation || "Shift recruitment focus to Sales to meet Q3 quotas."}</p>
                </div>
                <div className="pt-4 border-t border-indigo-800">
                  <div className="flex items-center gap-2 text-indigo-300 text-xs">
                    <span>Expected Impact: {aiInsight?.impact || "5% Revenue Boost"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button className="mt-8 flex items-center justify-center gap-2 w-full py-3 bg-indigo-800 hover:bg-indigo-700 rounded-xl transition-colors text-sm font-medium relative z-10">
            Generate Full AI Report
            <ArrowRight size={16} />
          </button>

          {/* Abstract SVG Background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
              <circle cx="150" cy="150" r="150" stroke="white" strokeWidth="2" />
              <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="2" />
              <circle cx="150" cy="150" r="90" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
