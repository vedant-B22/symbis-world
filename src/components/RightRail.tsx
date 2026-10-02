import React from 'react';
import { 
  Radio, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Users2, 
  Award, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatHumanDate } from '../utils/formatters';
import { LazyImage } from './LazyImage';

export const RightRail: React.FC = () => {
  const { events, clubs, setSelectedEventId, setSelectedClubId, setActiveTab } = useApp();

  // Find happening soon / trending events
  const upcomingEvents = events.slice(0, 3);
  const recruitingClubs = clubs.filter(c => c.recruitmentOpen).slice(0, 3);

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80 flex-shrink-0 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto no-scrollbar pb-8 select-none">
      {/* Live Campus Strip Card */}
      <div className="glass-panel spotlight-card p-4 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-rose-500">
              Live On Campus
            </span>
          </div>
          <span className="text-[10px] font-semibold text-zinc-400">Right Now</span>
        </div>

        <div 
          onClick={() => {
            setSelectedEventId('ev-1');
            setActiveTab('events');
          }}
          className="p-3 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/60 cursor-pointer hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 transition-colors"
        >
          <div className="text-xs font-extrabold text-zinc-900 dark:text-white truncate">
            Pulse 2026 Core Rehearsals
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Amphitheatre • 140+ students present
          </div>
        </div>
      </div>

      {/* Happening This Week Mini-Calendar */}
      <div className="glass-panel p-5 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
              This Week At SSPU
            </h4>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center"
          >
            <span>All</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                setSelectedEventId(ev.id);
                setActiveTab('events');
              }}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                <LazyImage
                  src={ev.posterUrl}
                  alt={ev.title}
                  fallbackText={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-purple-500 transition-colors">
                  {ev.title}
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  {formatHumanDate(ev.date, ev.startTime)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clubs Actively Recruiting */}
      <div className="glass-panel p-5 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-cyan-500" />
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
              Clubs Recruiting 🚀
            </h4>
          </div>
          <button
            onClick={() => setActiveTab('clubs')}
            className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center"
          >
            <span>View</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {recruitingClubs.map((club) => (
            <div
              key={club.id}
              onClick={() => {
                setSelectedClubId(club.id);
                setActiveTab('clubs');
              }}
              className="flex items-center justify-between p-2 rounded-2xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                  <LazyImage
                    src={club.logoUrl}
                    alt={club.name}
                    fallbackText={club.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-cyan-500 transition-colors">
                    {club.name}
                  </div>
                  <div className="text-[10px] text-pink-500 font-semibold truncate">
                    Role: {club.recruitmentRole || 'Members'}
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-bold text-zinc-400 group-hover:text-cyan-400">
                Apply →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Campus Contributors / Culture Stars */}
      <div className="glass-panel p-4 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Culture Streaks</span>
        </div>
        <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
          SSPU Student Leaderboard
        </div>
        <p className="text-[11px] text-zinc-400 leading-tight">
          Earn XP by RSVPing, submitting club designs, and reporting spam.
        </p>
      </div>
    </aside>
  );
};
