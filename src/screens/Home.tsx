import React, { useState, useEffect } from 'react';
import { ModernCard, ModernText, ModernButton } from '../components/ModernUI';
import { Expense, Category } from '../lib/utils';
import { format } from 'date-fns';
import { TrendingUp, DollarSign, List, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { db, auth, collection, query, where, onSnapshot, handleFirestoreError, OperationType } from '../firebase';

export const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const path = 'expenses';
    const q = query(collection(db, path), where('userId', '==', auth.currentUser.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Expense[];
      
      expenseData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setExpenses(expenseData);
      setTotal(expenseData.reduce((acc, curr) => acc + curr.amount, 0));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, []);

  const chartData = [
    { name: 'Food', value: expenses.filter(e => e.category === 'Food').reduce((a, b) => a + b.amount, 0) },
    { name: 'Transport', value: expenses.filter(e => e.category === 'Transport').reduce((a, b) => a + b.amount, 0) },
    { name: 'Bills', value: expenses.filter(e => e.category === 'Bills').reduce((a, b) => a + b.amount, 0) },
    { name: 'Shopping', value: expenses.filter(e => e.category === 'Shopping').reduce((a, b) => a + b.amount, 0) },
    { name: 'Others', value: expenses.filter(e => e.category === 'Others').reduce((a, b) => a + b.amount, 0) },
  ];

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-slate-400 font-medium animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <section className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm font-medium mb-1">Total Balance</p>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <ArrowUpRight size={16} className="text-emerald-300" />
              <span className="text-xs font-medium">+12.5%</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Wallet size={16} className="text-indigo-200" />
              <span className="text-xs font-medium">{expenses.length} logs</span>
            </div>
          </div>
        </div>
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </section>

      <div className="grid grid-cols-2 gap-4">
        <ModernCard className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <TrendingUp size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trend</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">+12.4%</p>
          <p className="text-[10px] text-emerald-500 font-medium mt-1">Increasing</p>
        </ModernCard>
        <ModernCard className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
              <DollarSign size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Burn</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${expenses.length > 0 ? Math.round(total / expenses.length) : 0}
          </p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Per transaction</p>
        </ModernCard>
      </div>

      <ModernCard title="Spending Allocation" subtitle="Distribution across categories">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ModernCard>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
              <List size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Activity</h2>
          </div>
          <ModernButton variant="ghost" size="sm" className="text-indigo-600">View All</ModernButton>
        </div>
        
        <div className="space-y-3">
          {expenses.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-sm text-slate-400 font-medium">No transactions found yet.</p>
            </div>
          ) : (
            expenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 soft-shadow hover:scale-[1.01] transition-transform cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 font-bold text-xs">
                    {expense.category[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{expense.category}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[150px]">{expense.notes || 'No notes'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">-${expense.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-400">{format(new Date(expense.date), 'MMM dd, HH:mm')}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
