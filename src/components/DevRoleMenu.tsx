import React, { useState } from 'react';
import { 
  Wrench, 
  UserCheck, 
  ShieldAlert, 
  Briefcase, 
  Sparkles, 
  X,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DevRoleMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, switchRole, activeTab, setActiveTab } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {isOpen ? (
        <div className="glass-dropdown p-3.5 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl mb-2 w-56 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-purple-500" />
              Demo Roles Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <button
              onClick={() => {
                switchRole('student');
                setActiveTab('feed');
              }}
              className={`px-3 py-2 rounded-xl flex items-center justify-between text-left transition-all ${
                currentUser.role === 'student'
                  ? 'bg-purple-600 text-white font-bold shadow-xs'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student View</span>
              </div>
              {currentUser.role === 'student' && <span className="text-[10px]">●</span>}
            </button>

            <button
              onClick={() => {
                switchRole('club_admin');
                setActiveTab('club_admin');
              }}
              className={`px-3 py-2 rounded-xl flex items-center justify-between text-left transition-all ${
                currentUser.role === 'club_admin'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Club Admin (GDG)</span>
              </div>
              {currentUser.role === 'club_admin' && <span className="text-[10px]">●</span>}
            </button>

            <button
              onClick={() => {
                switchRole('super_admin');
                setActiveTab('admin');
              }}
              className={`px-3 py-2 rounded-xl flex items-center justify-between text-left transition-all ${
                currentUser.role === 'super_admin'
                  ? 'bg-rose-600 text-white font-bold shadow-xs'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Super Admin</span>
              </div>
              {currentUser.role === 'super_admin' && <span className="text-[10px]">●</span>}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          title="Demo Role Switcher"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel shadow-lg border border-purple-500/30 text-[11px] font-bold text-purple-600 dark:text-purple-300 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="capitalize">{currentUser.role.replace('_', ' ')}</span>
          <ChevronUp className="w-3 h-3 text-zinc-400" />
        </button>
      )}
    </div>
  );
};
