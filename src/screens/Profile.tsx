import React from 'react';
import { ModernCard, ModernText, ModernButton } from '../components/ModernUI';
import { LogOut, Shield, Settings, Database, ChevronRight, Mail, User as UserIcon } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const Profile: React.FC = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { icon: Settings, label: 'Preferences', sub: 'Theme, currency, and notifications', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Shield, label: 'Security', sub: 'Password and authentication', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: Database, label: 'Data Management', sub: 'Export or delete your data', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <ModernText as="h1">Account</ModernText>
        <p className="text-slate-400 text-sm mt-1">Manage your profile and settings.</p>
      </header>

      <div className="flex flex-col items-center py-4">
        <div className="relative group">
          <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl shadow-indigo-100 transition-transform group-hover:scale-105">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <UserIcon size={40} className="text-indigo-600" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center text-indigo-600 border border-slate-100">
            <Settings size={14} />
          </div>
        </div>
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{user?.displayName || 'User Account'}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Mail size={12} className="text-slate-400" />
            <p className="text-xs text-slate-400 font-medium">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {menuItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 soft-shadow hover:scale-[1.01] transition-transform cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
          </div>
        ))}

        <div className="pt-6">
          <ModernButton
            onClick={handleLogout}
            variant="outline"
            className="w-full h-14 rounded-2xl text-rose-600 border-rose-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
          >
            <LogOut size={20} className="mr-2" />
            Sign Out
          </ModernButton>
        </div>
      </div>

      <footer className="text-center pt-8">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
          SpeedSense v4.2.0 • Secure Session
        </p>
      </footer>
    </div>
  );
};
