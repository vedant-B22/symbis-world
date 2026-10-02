import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  Medal, 
  Calendar as CalendarIcon, 
  Radio,
  ArrowUpRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatHumanDate } from '../utils/formatters';

export const SportsView: React.FC = () => {
  const { fixtures, standings } = useApp();
  const [filterSport, setFilterSport] = useState<string>('All');

  const sportsList = ['All', 'Football', 'Cricket', 'Basketball', 'Badminton'];

  const filteredFixtures = fixtures.filter(f => 
    filterSport === 'All' || f.sport.toLowerCase() === filterSport.toLowerCase()
  );

  return (
    <div className="w-full pb-16">
      {/* Sports Header Hero Banner with glassmorphism */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-900 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-black uppercase tracking-wider mb-2 backdrop-blur-sm border border-emerald-400/30">
            <Trophy className="w-3.5 h-3.5" />
            SSPU Campus Sports Arena
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Fixtures, Live Scores & Standings
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg leading-relaxed">
            Track inter-school tournaments, cheer on your department, and sign up for upcoming trials.
          </p>
        </div>
      </div>

      {/* Sport Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-6">
        {sportsList.map(sport => (
          <button
            key={sport}
            onClick={() => setFilterSport(sport)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterSport === sport
                ? 'bg-emerald-600 text-white shadow-md'
                : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Live & Upcoming Matches Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Match Schedule & Scores</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFixtures.map(fixture => {
            const isLive = fixture.status === 'live';
            const isCompleted = fixture.status === 'completed';

            return (
              <div
                key={fixture.id}
                className="glass-panel spotlight-card rounded-3xl p-5 border border-white/20 dark:border-white/10 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                {/* Header status */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[11px]">
                    {fixture.sport} • {fixture.tournamentName}
                  </span>
                  {isLive ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-black text-[10px] uppercase flex items-center gap-1.5 animate-pulse">
                      <Radio className="w-3 h-3" />
                      Live Match
                    </span>
                  ) : isCompleted ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold">
                      Full Time
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 text-[10px] font-bold">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Refined Teams Scoreboard with No wrapping & Tabular Numerals */}
                <div className="py-4 px-4 bg-zinc-100/70 dark:bg-zinc-900/70 rounded-2xl mb-3 border border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex items-center justify-between gap-2">
                    {/* Team A */}
                    <div className="flex-1 flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center shadow flex-shrink-0">
                        {fixture.teamA.logo}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-zinc-900 dark:text-white truncate">
                          {fixture.teamA.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate">{fixture.teamA.school}</div>
                      </div>
                    </div>

                    {/* Central Score Block */}
                    <div className="flex-shrink-0 px-3 text-center">
                      {fixture.teamA.score && fixture.teamB.score ? (
                        <div className="flex items-center gap-1.5 font-tabular font-black text-sm sm:text-base text-zinc-900 dark:text-zinc-100 whitespace-nowrap bg-white/70 dark:bg-zinc-800/80 px-2.5 py-1 rounded-xl shadow-xs border border-zinc-200/60 dark:border-zinc-700/60">
                          <span>{fixture.teamA.score}</span>
                          <span className="text-zinc-400 text-xs px-0.5">-</span>
                          <span>{fixture.teamB.score}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-black uppercase text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/60 px-2.5 py-1 rounded-xl">
                          VS
                        </span>
                      )}
                    </div>

                    {/* Team B */}
                    <div className="flex-1 flex items-center justify-end gap-2.5 min-w-0 text-right">
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-zinc-900 dark:text-white truncate">
                          {fixture.teamB.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate">{fixture.teamB.school}</div>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-600 to-rose-700 text-white font-black text-xs flex items-center justify-center shadow flex-shrink-0">
                        {fixture.teamB.logo}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Updates / Venue */}
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="truncate">{fixture.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{formatHumanDate(fixture.date, fixture.time)}</span>
                  </div>
                </div>

                {fixture.liveUpdates && (
                  <div className="mt-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-800/40 text-[11px] text-rose-700 dark:text-rose-300 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping flex-shrink-0" />
                    <span>{fixture.liveUpdates}</span>
                  </div>
                )}

                {fixture.winner && (
                  <div className="mt-2.5 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    🏆 Match Winner: {fixture.winner}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inter-School Leaderboard Table */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-base text-zinc-900 dark:text-white">
              Annual Inter-School Sports Championship Table
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-semibold font-tabular">2026 Season</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 uppercase text-[10px] font-black tracking-wider">
                <th className="py-2.5 px-3">School / Department</th>
                <th className="py-2.5 px-2 text-center">Played</th>
                <th className="py-2.5 px-2 text-center">Won</th>
                <th className="py-2.5 px-2 text-center">Lost</th>
                <th className="py-2.5 px-2 text-center">🥇 Gold</th>
                <th className="py-2.5 px-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
              {standings.map((row, idx) => (
                <tr 
                  key={row.school} 
                  className={`hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors ${
                    idx === 0 ? 'bg-amber-500/5 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-3 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <span className="w-5 font-bold text-zinc-400 font-tabular">{idx + 1}</span>
                    <span className="truncate">{row.school}</span>
                  </td>
                  <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400 font-tabular">{row.played}</td>
                  <td className="py-3 px-2 text-center text-emerald-600 font-bold font-tabular">{row.won}</td>
                  <td className="py-3 px-2 text-center text-rose-500 font-tabular">{row.lost}</td>
                  <td className="py-3 px-2 text-center font-bold text-amber-500 font-tabular">{row.gold}</td>
                  <td className="py-3 px-3 text-right font-black text-purple-600 dark:text-purple-400 text-sm font-tabular">
                    {row.points} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
