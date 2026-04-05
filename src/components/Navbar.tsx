import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, PieChart, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/add', icon: PlusCircle, label: 'Add' },
    { to: '/insights', icon: PieChart, label: 'Data' },
    { to: '/profile', icon: User, label: 'User' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[calc(448px-3rem)] bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl soft-shadow px-4 py-2 flex items-center justify-between z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300",
              isActive 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                : "text-slate-400 hover:text-slate-600"
            )
          }
        >
          <item.icon size={22} />
          <span className={cn(
            "text-[10px] mt-0.5 font-medium",
            "opacity-0 h-0 overflow-hidden transition-all duration-300",
          )}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
