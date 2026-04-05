import React, { useState } from 'react';
import { ModernCard, ModernText, ModernButton } from '../components/ModernUI';
import { Category } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Save, X, DollarSign, Tag, FileText } from 'lucide-react';
import { db, auth, collection, addDoc, handleFirestoreError, OperationType } from '../firebase';

const CATEGORIES: Category[] = ['Food', 'Transport', 'Bills', 'Shopping', 'Others'];

export const AddExpense: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || isSubmitting) return;

    setIsSubmitting(true);
    const path = 'expenses';
    try {
      await addDoc(collection(db, path), {
        amount: parseFloat(amount),
        category,
        notes,
        date: new Date().toISOString(),
        userId: auth.currentUser.uid
      });
      navigate('/');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header>
        <ModernText as="h1">Add Transaction</ModernText>
        <p className="text-slate-400 text-sm mt-1">Record your spending for better insights.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ModernCard title="Transaction Details" subtitle="Enter the amount and category">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={14} />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-10 text-2xl font-bold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Tag size={14} />
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3 text-sm font-medium rounded-xl border transition-all ${
                      category === cat 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ModernCard>

        <ModernCard title="Additional Info" subtitle="Add notes for future reference">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FileText size={14} />
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What was this for?"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 min-h-[120px] resize-none"
            />
          </div>
        </ModernCard>

        <div className="flex gap-4 pt-4">
          <ModernButton
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
            disabled={isSubmitting}
            className="flex-1 h-14 rounded-2xl"
          >
            <X size={20} className="mr-2" />
            Cancel
          </ModernButton>
          <ModernButton
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-14 rounded-2xl"
          >
            <Save size={20} className="mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Transaction'}
          </ModernButton>
        </div>
      </form>
    </div>
  );
};
