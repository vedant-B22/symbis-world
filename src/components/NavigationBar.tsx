import React from 'react';
import { 
  Home, 
  Calendar, 
  Users2, 
  Trophy, 
  Compass, 
  Bell, 
  Briefcase, 
  ShieldAlert, 
  Sun,
  Moon,
  PlusSquare,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LazyImage } from './LazyImage';

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
      {/* Desktop / Tablet Floating Glass Dock (macOS / visionOS inspired) */}
      <aside className="hidden md:flex flex-col fixed left-4 top-4 bottom-4 w-60 lg:w-64 glass-panel rounded-3xl z-40 p-4 justify-between select-none shadow-2xl">
        <div className="flex flex-col gap-5">
          {/* Logo / Brand Header */}
          <div 
            className="flex items-center gap-3 px-2 pt-1 cursor-pointer group"
            onClick={() => setActiveTab('feed')}
          >
            <div className="w-10 h-10 rounded-2xl sw-gradient-bg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-200">
              SW
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight leading-none text-zinc-900 dark:text-white flex items-center gap-1.5 font-heading">
                Symbi's World
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mt-1">
                SSPU Pune • Unofficial
              </div>
            </div>
          </div>

          {/* Quick Cmd+K Search trigger chip */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/60 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 text-zinc-500 text-xs font-semibold transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Quick Search</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 text-[10px] font-mono shadow-xs border border-zinc-200/60 dark:border-zinc-700/60">
              ⌘K
            </kbd>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all relative group ${
                    isActive
                      ? 'bg-purple-600/15 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {Icon ? (
                    <div className="relative">
                      <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-purple-600 dark:text-purple-400' : 'group-hover:scale-105'}`} />
                      {item.count ? (
                        <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[9px] font-black rounded-full h-3.5 min-w-3.5 px-1 flex items-center justify-center">
                          {item.count}
                        </span>
                      ) : null}
                    </div>
                  ) : item.avatar ? (
                    <div className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                      <LazyImage
                        src={item.avatar} 
                        alt="Profile" 
                        fallbackText={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

                  <span className="flex-1 text-left">{item.label}</span>

                  {item.badge && (
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Special Role Panels (When active) */}
            {currentUser.role === 'club_admin' && (
              <button
                onClick={() => setActiveTab('club_admin')}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all mt-1 ${
                  activeTab === 'club_admin'
                    ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                }`}
              >
                <Briefcase className="w-4 h-4 text-blue-500" />
                <span>Club Manager</span>
              </button>
            )}

            {currentUser.role === 'super_admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all mt-1 ${
                  activeTab === 'admin'
                    ? 'bg-rose-600/15 text-rose-600 dark:text-rose-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Admin Safety</span>
              </button>
            )}

            {/* Create Post Action Button */}
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-2.5 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl sw-gradient-bg text-white font-bold text-xs shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusSquare className="w-4 h-4" />
              <span>Create Post / Story</span>
            </button>
          </nav>
        </div>

        {/* Footer controls: Theme toggle & Dev Role Chip */}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/60 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-all"
          >
            <span className="flex items-center gap-2">
              {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Switch</span>
          </button>

          <div className="px-1 text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">Student-built • Unofficial</span>
            <br />
            Symbiosis Skills & Professional University
          </div>
        </div>
      </aside>

      {/* Mobile Top Header (Glassmorphic) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 z-30 px-4 flex items-center justify-between shadow-xs">
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setActiveTab('feed')}
        >
          <div className="w-7 h-7 rounded-xl sw-gradient-bg flex items-center justify-center text-white font-black text-xs shadow-md">
            SW
          </div>
          <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white font-heading">
            Symbi's World
          </span>
          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">
            SSPU
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            aria-label="Quick Search"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            aria-label="Notifications"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-white dark:ring-zinc-950" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Floating Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 h-14 glass-dropdown rounded-2xl z-30 px-3 flex items-center justify-around shadow-2xl border border-white/20 dark:border-white/10">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'feed' ? 'text-purple-600 dark:text-purple-400 scale-110' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-semibold mt-0.5">Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative ${
            activeTab === 'events' ? 'text-purple-600 dark:text-purple-400 scale-110' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-semibold mt-0.5">Events</span>
          <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-pink-500"></span>
        </button>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center justify-center -mt-5 w-11 h-11 rounded-2xl sw-gradient-bg text-white shadow-lg shadow-purple-500/40 active:scale-95 transition-transform"
        >
          <PlusSquare className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('clubs')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'clubs' ? 'text-purple-600 dark:text-purple-400 scale-110' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span className="text-[9px] font-semibold mt-0.5">Clubs</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'profile' ? 'scale-110' : ''
          }`}
        >
          <div className="w-5 h-5 rounded-full overflow-hidden">
            <LazyImage 
              src={currentUser.avatar} 
              alt="Profile" 
              fallbackText={currentUser.name}
              className={`w-full h-full object-cover ring-2 ${
                activeTab === 'profile' ? 'ring-purple-600' : 'ring-transparent opacity-75'
              }`} 
            />
          </div>
          <span className={`text-[9px] font-semibold mt-0.5 ${
            activeTab === 'profile' ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400 dark:text-zinc-500'
          }`}>
            Profile
          </span>
        </button>
      </nav>
    </>
  );
};
