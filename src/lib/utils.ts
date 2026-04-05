import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Category = 'Food' | 'Transport' | 'Bills' | 'Shopping' | 'Others';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string;
  notes: string;
  userId: string;
}

export interface MonthlySummary {
  total: number;
  byCategory: Record<Category, number>;
}
