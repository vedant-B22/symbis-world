import React from 'react';
import { 
  Radio, 
  Calendar, 
  Sparkles, 
  Users2, 
  Award, 
  ChevronRight,
  Flame,
  Zap,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatHumanDate } from '../utils/formatters';
import { LazyImage } from './LazyImage';

export const RightRail: React.FC = () => {
  const { events, clubs, setSelectedEventId, setSelectedClubId, setActiveTab, currentUser } = useApp();

  // Find happening soon / trending events
  const upcomingEvents = events.slice(0, 3);
  const recruitingClubs = clubs.filter(c => c.recruitmentOpen).slice(0, 3);

  // Top Contributors Leaderboard data for SSPU
  const topContributors = [
    { rank: 1, name: 'Ananya S.', school: 'CS & Tech', xp: 2840, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', badge: '🥇' },
    { rank: 2, name: 'Rohan Deshmukh', school: 'Design', xp: 2410, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', badge: '🥈' },
    { rank: 3, name: 'Tanvi Joshi', school: 'Media', xp: 2190, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', badge: '🥉' }
  ];

  return (
    <aside className="hidden xl:flex flex-col gap-4 w-80 flex-shrink-0 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto no-scrollbar pb-10 select-none">
      
      {/* 1. BENTO HERO: Live on Campus (Never Clipped, Lime Glow & Pulse) */}
      <div className="glass-panel spotlight-card p-4 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-lime)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--brand-lime)] shadow-[0_0_10px_var(--brand-lime)]"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[var(--brand-lime)] font-mono">
              Live On Campus
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            Happening Now
          </span>
        </div>

        <div 
          onClick={() => {
            setSelectedEventId('ev-1');
            setActiveTab('events');
          }}
          className="p-3.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-800/60 cursor-pointer hover:border-[var(--brand-primary)] hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs font-black text-zinc-900 dark:text-white leading-snug">
                Pulse 2026 Core Rehearsals
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                <MapPin className="w-3 h-3 text-[var(--brand-coral)] flex-shrink-0" />
                <span className="font-medium">Amphitheatre • 140+ students present</span>
              </div>
            </div>
            <span className="w-6 h-6 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center flex-shrink-0">
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Organized by Dhwani & Natraj</span>
            <span className="font-bold text-[var(--brand-primary)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Join Stage →
            </span>
          </div>
        </div>
      </div>

      {/* 2. BENTO CARD: Campus Streak & XP Flame Card */}
      <div className="glass-panel p-4 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-lg bg-amber-500/20 text-amber-500">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 font-heading">
              Daily Campus Streak
            </span>
          </div>
          <span className="text-xs font-black text-amber-500 font-mono">
            {currentUser.streakDays} DAYS 🔥
          </span>
        </div>

        <div className="flex items-center justify-between text-xs mt-2 px-3 py-2 rounded-2xl bg-white/50 dark:bg-black/30 border border-white/40 dark:border-white/5">
          <div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Your SSPU Culture XP</div>
            <div className="text-sm font-black text-zinc-900 dark:text-white font-mono flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {currentUser.xp} XP
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Rank Tier</div>
            <div className="text-xs font-black text-[var(--brand-primary)]">Campus Pro</div>
          </div>
        </div>
      </div>

      {/* 3. BENTO CARD: Happening This Week Mini-Timeline (No Text Truncation) */}
      <div className="glass-panel p-4 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
              This Week At SSPU
            </h4>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-[11px] font-bold text-[var(--brand-primary)] hover:underline flex items-center"
          >
            <span>All Events</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                setSelectedEventId(ev.id);
                setActiveTab('events');
              }}
              title={`${ev.title} • ${ev.venue}`}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-black/5 dark:border-white/5">
                <LazyImage
                  src={ev.posterUrl}
                  alt={ev.title}
                  fallbackText={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1 leading-snug">
                  {ev.title}
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                  {formatHumanDate(ev.date, ev.startTime)}
                </div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                  {ev.venue}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BENTO CARD: Clubs Actively Recruiting */}
      <div className="glass-panel p-4 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[var(--brand-cyan)]" />
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
              Clubs Recruiting 🚀
            </h4>
          </div>
          <button
            onClick={() => setActiveTab('clubs')}
            className="text-[11px] font-bold text-[var(--brand-cyan)] hover:underline flex items-center"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
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
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/5">
                  <LazyImage
                    src={club.logoUrl}
                    alt={club.name}
                    fallbackText={club.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-[var(--brand-cyan)] transition-colors">
                    {club.name}
                  </div>
                  <div className="text-[10px] text-[var(--brand-coral)] font-bold truncate">
                    Open: {club.recruitmentRole || 'Core Team'}
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-bold text-zinc-400 group-hover:text-[var(--brand-cyan)] flex-shrink-0 ml-2">
                Apply →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. BENTO CARD: Top Contributors Podium */}
      <div className="glass-panel p-4 rounded-3xl border border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
              Top Contributors
            </h4>
          </div>
          <span className="text-[10px] font-mono text-amber-500 font-bold">Week 12</span>
        </div>

        {/* Podium visualization */}
        <div className="grid grid-cols-3 gap-2 pt-2 pb-1 text-center items-end border-b border-zinc-200/50 dark:border-zinc-800/60 mb-2">
          {/* #2 Rank */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-zinc-300 dark:ring-zinc-600 shadow">
                <LazyImage src={topContributors[1].avatar} alt={topContributors[1].name} fallbackText="RD" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1.5 -right-1 text-xs">🥈</span>
            </div>
            <div className="text-[11px] font-bold text-zinc-900 dark:text-white truncate max-w-[70px] mt-1.5">
              {topContributors[1].name}
            </div>
            <div className="text-[9px] font-mono font-bold text-zinc-500">{topContributors[1].xp} XP</div>
          </div>

          {/* #1 Rank (Elevated) */}
          <div className="flex flex-col items-center -translate-y-2">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-3 ring-amber-400 shadow-lg">
                <LazyImage src={topContributors[0].avatar} alt={topContributors[0].name} fallbackText="AS" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1.5 -right-1 text-sm">🥇</span>
            </div>
            <div className="text-xs font-black text-zinc-900 dark:text-white truncate max-w-[75px] mt-1.5">
              {topContributors[0].name}
            </div>
            <div className="text-[10px] font-mono font-black text-amber-500">{topContributors[0].xp} XP</div>
          </div>

          {/* #3 Rank */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-amber-700/50 shadow">
                <LazyImage src={topContributors[2].avatar} alt={topContributors[2].name} fallbackText="TJ" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1.5 -right-1 text-xs">🥉</span>
            </div>
            <div className="text-[11px] font-bold text-zinc-900 dark:text-white truncate max-w-[70px] mt-1.5">
              {topContributors[2].name}
            </div>
            <div className="text-[9px] font-mono font-bold text-zinc-500">{topContributors[2].xp} XP</div>
          </div>
        </div>

        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center leading-tight">
          Earn XP by checking into events, leading clubs, and sharing campus updates.
        </p>
      </div>

    </aside>
  );
};
