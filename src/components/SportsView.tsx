import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Calendar, 
  MapPin, 
  Medal, 
  Users, 
  Activity,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SportsView: React.FC = () => {
  const { fixtures, standings } = useApp();
  const [filterSport, setFilterSport] = useState<string>('All');

  const sportsList = ['All', 'Football', 'Cricket', 'Basketball', 'Badminton'];

  const filteredFixtures = fixtures.filter(f => 
    filterSport === 'All' || f.sport.toLowerCase() === filterSport.toLowerCase()
  );

  return (
    <div className="w-full pb-16">
      {/* Sports Header Banner */}
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
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg">
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterSport === sport
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
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
            <span>Match Schedule & Results</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFixtures.map(fixture => {
            const isLive = fixture.status === 'live';
            const isCompleted = fixture.status === 'completed';

            return (
              <div
                key={fixture.id}
                className="bg-white dark:bg-zinc-900/70 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Header status */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-zinc-500 dark:text-zinc-400">
                    {fixture.sport} • {fixture.tournamentName}
                  </span>
                  {isLive ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-black text-[10px] uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Live Now
                    </span>
                  ) : isCompleted ? (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold">
                      Completed
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-[10px] font-bold">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Teams Scoreboard */}
                <div className="grid grid-cols-5 items-center py-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl px-4 mb-3">
                  {/* Team A */}
                  <div className="col-span-2 text-center">
                    <div className="text-2xl mb-1">{fixture.teamA.logo}</div>
                    <div className="font-bold text-xs text-zinc-900 dark:text-white truncate">
                      {fixture.teamA.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate">{fixture.teamA.school}</div>
                  </div>

                  {/* Score or VS */}
                  <div className="col-span-1 text-center font-mono font-black text-sm text-zinc-900 dark:text-zinc-100">
                    {fixture.teamA.score && fixture.teamB.score ? (
                      <div className="bg-zinc-200 dark:bg-zinc-700/60 py-1 px-2 rounded-lg text-xs">
                        {fixture.teamA.score} - {fixture.teamB.score}
                      </div>
                    ) : (
                      <span className="text-zinc-400 text-xs">VS</span>
                    )}
                  </div>

                  {/* Team B */}
                  <div className="col-span-2 text-center">
                    <div className="text-2xl mb-1">{fixture.teamB.logo}</div>
                    <div className="font-bold text-xs text-zinc-900 dark:text-white truncate">
                      {fixture.teamB.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate">{fixture.teamB.school}</div>
                  </div>
                </div>

                {/* Match Updates / Venue */}
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{fixture.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{fixture.date} • {fixture.time}</span>
                  </div>
                </div>

                {fixture.liveUpdates && (
                  <div className="mt-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-800/40 text-[11px] text-rose-700 dark:text-rose-300 font-medium">
                    ⚡️ {fixture.liveUpdates}
                  </div>
                )}

                {fixture.winner && (
                  <div className="mt-3 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    🏆 Winner: {fixture.winner}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inter-School Leaderboard Table */}
      <div className="bg-white dark:bg-zinc-900/70 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-base text-zinc-900 dark:text-white">
              Annual Inter-School Sports Championship Table
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-semibold">2026 Season</span>
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
                  className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors ${
                    idx === 0 ? 'bg-amber-500/5 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-3 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <span className="w-5 font-bold text-zinc-400">{idx + 1}</span>
                    <span className="truncate">{row.school}</span>
                  </td>
                  <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">{row.played}</td>
                  <td className="py-3 px-2 text-center text-emerald-600 font-bold">{row.won}</td>
                  <td className="py-3 px-2 text-center text-rose-500">{row.lost}</td>
                  <td className="py-3 px-2 text-center font-bold text-amber-500">{row.gold}</td>
                  <td className="py-3 px-3 text-right font-black text-purple-600 dark:text-purple-400 text-sm">
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
