import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Command, 
  Calendar, 
  Users2, 
  Trophy, 
  Compass, 
  Bell, 
  Sparkles, 
  Moon, 
  Sun,
  X,
  ArrowRight,
  PlusSquare,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { setActiveTab, clubs, events, toggleTheme, isDark, setIsCreateOpen, setSelectedClubId, setSelectedEventId } = useApp();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filteredClubs = clubs.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3);

  const handleSelectTab = (tab: any) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-xl glass-dropdown rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <Search className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search campus (events, clubs, people)..."
            className="w-full bg-transparent text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-500 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 text-xs">
          {/* Quick Actions */}
          <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-400">
            Quick Actions
          </div>
          <button
            onClick={() => {
              setIsCreateOpen(true);
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left text-zinc-700 dark:text-zinc-300 hover:bg-purple-600/10 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <PlusSquare className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">Create Post or 24h Story</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left text-zinc-700 dark:text-zinc-300 hover:bg-purple-600/10 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-purple-400" />}
              <span className="font-semibold">Toggle {isDark ? 'Light' : 'Dark'} Mode</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Theme</span>
          </button>

          {/* Navigation Pages */}
          <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-zinc-400">
            Navigate to
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => handleSelectTab('events')}
              className="px-3 py-2 rounded-xl flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Calendar className="w-4 h-4 text-pink-500" />
              <span>Events Hub</span>
            </button>
            <button
              onClick={() => handleSelectTab('clubs')}
              className="px-3 py-2 rounded-xl flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Users2 className="w-4 h-4 text-cyan-500" />
              <span>Clubs & Societies</span>
            </button>
            <button
              onClick={() => handleSelectTab('sports')}
              className="px-3 py-2 rounded-xl flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Trophy className="w-4 h-4 text-emerald-500" />
              <span>Sports Arena</span>
            </button>
            <button
              onClick={() => handleSelectTab('explore')}
              className="px-3 py-2 rounded-xl flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Explore & Lost/Found</span>
            </button>
          </div>

          {/* Dynamic Search Results */}
          {query.trim() && (
            <>
              {filteredEvents.length > 0 && (
                <>
                  <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Events
                  </div>
                  {filteredEvents.map(ev => (
                    <button
                      key={ev.id}
                      onClick={() => {
                        setSelectedEventId(ev.id);
                        setActiveTab('events');
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left text-zinc-700 dark:text-zinc-300 hover:bg-purple-500/10 hover:text-purple-600 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <img src={ev.posterUrl} alt="" className="w-6 h-6 rounded-md object-cover" />
                        <span className="font-semibold truncate">{ev.title}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400">{ev.date}</span>
                    </button>
                  ))}
                </>
              )}

              {filteredClubs.length > 0 && (
                <>
                  <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Clubs
                  </div>
                  {filteredClubs.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedClubId(c.id);
                        setActiveTab('clubs');
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left text-zinc-700 dark:text-zinc-300 hover:bg-purple-500/10 hover:text-purple-600 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <img src={c.logoUrl} alt="" className="w-6 h-6 rounded-md object-cover" />
                        <span className="font-semibold truncate">{c.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">{c.handle}</span>
                    </button>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-zinc-100/60 dark:bg-zinc-900/60 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono">Symbi's World Search</span>
        </div>
      </div>
    </div>
  );
};
