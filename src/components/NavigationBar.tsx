import React from 'react';
import { 
  Home, 
  Calendar, 
  Users2, 
  Trophy, 
  Compass, 
  Bell, 
  ShieldAlert, 
  Briefcase, 
  Sparkles,
  Sun,
  Moon,
  PlusSquare,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NavigationBar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    unreadCount, 
    setIsCreateOpen, 
    isDark, 
    toggleTheme,
    switchRole
  } = useApp();

  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar, badge: 'Hot' },
    { id: 'clubs', label: 'Clubs', icon: Users2 },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'notifications', label: 'Activity', icon: Bell, count: unreadCount },
    { id: 'profile', label: 'Profile', avatar: currentUser.avatar },
  ];

  return (
    <>
      {/* Desktop / Tablet Side Navigation Bar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 lg:w-72 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800/80 z-40 p-4 justify-between transition-colors duration-200">
        <div className="flex flex-col gap-6">
          {/* Logo / Brand Header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={() => setActiveTab('feed')}
            >
              <div className="w-10 h-10 rounded-2xl sw-gradient-bg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-200">
                SW
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight leading-none text-zinc-900 dark:text-white flex items-center gap-1.5">
                  Symbi's World
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mt-1">
                  SSPU Pune • Unofficial
                </div>
              </div>
            </div>
          </div>

          {/* Role Switcher Pill Bar for Testing */}
          <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">View as Role</span>
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 capitalize">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-[11px] font-medium">
              <button 
                onClick={() => switchRole('student')}
                className={`py-1 rounded-lg transition-all ${currentUser.role === 'student' ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                Student
              </button>
              <button 
                onClick={() => switchRole('club_admin')}
                className={`py-1 rounded-lg transition-all ${currentUser.role === 'club_admin' ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                Club
              </button>
              <button 
                onClick={() => switchRole('super_admin')}
                className={`py-1 rounded-lg transition-all ${currentUser.role === 'super_admin' ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-4 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-purple-600/10 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {Icon ? (
                    <div className="relative">
                      <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-purple-600 dark:text-purple-400' : ''}`} />
                      {item.count ? (
                        <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                          {item.count}
                        </span>
                      ) : null}
                    </div>
                  ) : item.avatar ? (
                    <img 
                      src={item.avatar} 
                      alt="Profile" 
                      className={`w-6 h-6 rounded-full object-cover ring-2 transition-all ${
                        isActive ? 'ring-purple-600 scale-105' : 'ring-transparent'
                      }`}
                    />
                  ) : null}

                  <span className="flex-1 text-left">{item.label}</span>

                  {item.badge && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Special Role Panels */}
            {currentUser.role === 'club_admin' && (
              <button
                onClick={() => setActiveTab('club_admin')}
                className={`flex items-center gap-4 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all mt-1 ${
                  activeTab === 'club_admin'
                    ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                }`}
              >
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span>Club Manager</span>
              </button>
            )}

            {currentUser.role === 'super_admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-4 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all mt-1 ${
                  activeTab === 'admin'
                    ? 'bg-rose-600/15 text-rose-600 dark:text-rose-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                }`}
              >
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <span>Admin Moderation</span>
              </button>
            )}

            {/* Create Post Action Button */}
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-3 flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-2xl sw-gradient-bg text-white font-bold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusSquare className="w-5 h-5" />
              <span>Create Post / Story</span>
            </button>
          </nav>
        </div>

        {/* Footer controls on desktop: Theme toggle & Disclaimer */}
        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/70 hover:bg-zinc-200 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-all"
          >
            <span className="flex items-center gap-2">
              {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              {isDark ? 'Dark Mode (Hero)' : 'Light Mode'}
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Switch</span>
          </button>

          <div className="px-2 text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">Student-built • Unofficial</span>
            <br />
            For Symbiosis Skills & Professional University (SSPU) Pune.
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 z-30 px-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('feed')}
        >
          <div className="w-7 h-7 rounded-xl sw-gradient-bg flex items-center justify-center text-white font-black text-xs shadow-md">
            SW
          </div>
          <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
            Symbi's World
          </span>
          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">
            SSPU
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {isDark ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            aria-label="Notifications"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-white dark:ring-zinc-950" />
            )}
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            aria-label="Create Post"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <PlusSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Instagram-familiar style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-200/80 dark:border-zinc-800/80 z-30 px-3 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'feed' ? 'text-purple-600 dark:text-purple-400 scale-110' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative ${
            activeTab === 'events' ? 'text-purple-600 dark:text-purple-400 scale-110' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Events</span>
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-pink-500"></span>
        </button>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center justify-center -mt-4 w-12 h-12 rounded-2xl sw-gradient-bg text-white shadow-lg shadow-purple-500/30 active:scale-95 transition-transform"
        >
          <PlusSquare className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveTab('clubs')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'clubs' ? 'text-purple-600 dark:text-purple-400 scale-110' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Users2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Clubs</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'profile' ? 'scale-110' : ''
          }`}
        >
          <img 
            src={currentUser.avatar} 
            alt="Profile" 
            className={`w-6 h-6 rounded-full object-cover ring-2 ${
              activeTab === 'profile' ? 'ring-purple-600' : 'ring-transparent opacity-75'
            }`} 
          />
          <span className={`text-[10px] font-semibold mt-0.5 ${
            activeTab === 'profile' ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400 dark:text-zinc-500'
          }`}>
            Profile
          </span>
        </button>
      </nav>
    </>
  );
};
