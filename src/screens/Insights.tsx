import React from 'react';
import { ModernCard, ModernText } from '../components/ModernUI';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

const DATA = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Bills', value: 300 },
  { name: 'Shopping', value: 200 },
  { name: 'Others', value: 100 },
];

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

export const Insights: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <header>
        <ModernText as="h1">Spending Insights</ModernText>
        <p className="text-slate-400 text-sm mt-1">Deep dive into your financial habits.</p>
      </header>

      <ModernCard title="Expense Distribution" subtitle="Breakdown by category">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-xs font-medium text-slate-500">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ModernCard>

      <div className="space-y-4">
        <ModernCard title="Key Metrics" subtitle="Performance indicators">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <TrendingUp size={16} />
                </div>
                <span className="text-sm font-medium text-slate-600">Highest Category</span>
              </div>
              <span className="text-sm font-bold text-slate-900">Food (31%)</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-sm font-medium text-slate-600">Efficiency Rating</span>
              </div>
              <span className="text-sm font-bold text-emerald-600">Optimal</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Zap size={16} />
                </div>
                <span className="text-sm font-medium text-slate-600">Predicted Burn</span>
              </div>
              <span className="text-sm font-bold text-slate-900">$4,200.00</span>
            </div>
          </div>
        </ModernCard>

        <ModernCard className="bg-indigo-50 border-indigo-100">
          <div className="flex gap-4">
            <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm h-fit">
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-indigo-900">Smart Recommendation</h4>
              <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed">
                Unusual activity detected in <span className="font-bold">Shopping</span>. 
                Spending is 15% higher than previous cycle. 
                Consider re-calibrating your budget allocation for this month.
              </p>
            </div>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};
