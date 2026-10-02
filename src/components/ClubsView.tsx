import React, { useState } from 'react';
import { 
  Users2, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { InstagramIcon as Instagram } from './InstagramIcon';
import { Club } from '../types';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

const CLUB_CATEGORIES = [
  'All',
  'Tech & Innovation',
  'Cultural & Arts',
  'Sports & Fitness',
  'Media & Design',
  'Social & Impact',
  'Debate & Literary'
];

export const ClubsView: React.FC = () => {
  const { 
    clubs, 
    toggleFollowClub, 
    applyForClub, 
    selectedClubId, 
    setSelectedClubId,
    setSelectedEventId,
    events
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showApplyModal, setShowApplyModal] = useState<Club | null>(null);
  const [applyReason, setApplyReason] = useState('');

  const filteredClubs = clubs.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.description.toLowerCase().includes(search.toLowerCase()) ||
                        c.handle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedClub = clubs.find(c => c.id === selectedClubId);
  const clubEvents = events.filter(e => e.clubId === selectedClubId);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showApplyModal || !applyReason.trim()) return;

    applyForClub(showApplyModal.id, applyReason);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 }
    });
    alert(`Application submitted to ${showApplyModal.name}! The club leads will review your portfolio.`);
    setShowApplyModal(null);
    setApplyReason('');
  };

  return (
    <div className="w-full pb-16">
      {/* Club Detail View if Selected */}
      {selectedClub ? (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-sm mb-8">
          {/* Banner */}
          <div className="relative h-48 sm:h-64 w-full">
            <img src={selectedClub.bannerUrl} alt={selectedClub.name} className="w-full h-full object-cover" />
            <button
              onClick={() => setSelectedClubId(null)}
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-md hover:bg-black/80"
            >
              ← Back to Directory
            </button>
          </div>

          {/* Profile Header Info */}
          <div className="p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              <div className="flex items-end gap-4">
                <img
                  src={selectedClub.logoUrl}
                  alt={selectedClub.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white dark:ring-zinc-900 shadow-xl"
                />
                <div className="mb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {selectedClub.name}
                    </h2>
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">{selectedClub.handle}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFollowClub(selectedClub.id)}
                  className={`py-2 px-5 rounded-2xl text-xs font-bold transition-all ${
                    selectedClub.isFollowed
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      : 'sw-gradient-bg text-white shadow-md'
                  }`}
                >
                  {selectedClub.isFollowed ? 'Following' : 'Follow Club'}
                </button>

                {selectedClub.recruitmentOpen && (
                  <button
                    onClick={() => setShowApplyModal(selectedClub)}
                    className="py-2 px-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-md shadow-pink-500/20"
                  >
                    Join Crew 🚀
                  </button>
                )}
              </div>
            </div>

            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200/50 dark:border-purple-800/40">
                {selectedClub.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                {selectedClub.membersCount} Members
              </span>
              {selectedClub.recruitmentOpen && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-pulse">
                  Recruiting: {selectedClub.recruitmentRole}
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              {selectedClub.description}
            </p>

            {/* Links and Contact */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <a
                href={`https://instagram.com/${selectedClub.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>@{selectedClub.instagramHandle}</span>
              </a>
              <a
                href={`mailto:${selectedClub.contactEmail}`}
                className="flex items-center gap-1.5 hover:text-purple-500 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-500" />
                <span>{selectedClub.contactEmail}</span>
              </a>
            </div>

            {/* Club Events */}
            {clubEvents.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">
                  Upcoming Club Events ({clubEvents.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {clubEvents.map(ev => (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEventId(ev.id)}
                      className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-3"
                    >
                      <img src={ev.posterUrl} alt={ev.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-white">{ev.title}</div>
                        <div className="text-[11px] text-zinc-400">{ev.date} • {ev.venue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Club Announcements */}
            {selectedClub.announcements.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">
                  Official Club Notice Board
                </h3>
                <div className="flex flex-col gap-2.5">
                  {selectedClub.announcements.map(ann => (
                    <div key={ann.id} className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{ann.title}</span>
                        <span className="text-[10px] text-zinc-400">{ann.date}</span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Directory Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            SSPU Clubs & Societies
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Find your tribe. Join coding circles, dance troupes, sports teams, and design labs.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clubs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-6">
        {CLUB_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'sw-gradient-bg text-white shadow-md'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClubs.map(club => {
          return (
            <div
              key={club.id}
              className="bg-white dark:bg-zinc-900/70 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Card Banner */}
              <div 
                className="relative h-28 w-full overflow-hidden cursor-pointer"
                onClick={() => setSelectedClubId(club.id)}
              >
                <img src={club.bannerUrl} alt={club.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {club.recruitmentOpen && (
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-black uppercase tracking-wider shadow">
                    Recruiting 🔥
                  </span>
                )}
              </div>

              {/* Club Info */}
              <div className="p-4 relative flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 -mt-10 mb-2">
                    <img
                      src={club.logoUrl}
                      alt={club.name}
                      onClick={() => setSelectedClubId(club.id)}
                      className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white dark:ring-zinc-900 shadow-md cursor-pointer"
                    />
                    <div className="mt-4">
                      <h4 
                        onClick={() => setSelectedClubId(club.id)}
                        className="text-sm font-bold text-zinc-900 dark:text-white leading-tight hover:text-purple-600 cursor-pointer"
                      >
                        {club.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400 font-mono">{club.handle}</span>
                    </div>
                  </div>

                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md mb-2">
                    {club.category}
                  </span>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
                    {club.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => toggleFollowClub(club.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      club.isFollowed
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        : 'sw-gradient-bg text-white shadow-sm'
                    }`}
                  >
                    {club.isFollowed ? 'Following' : 'Follow'}
                  </button>

                  {club.recruitmentOpen ? (
                    <button
                      onClick={() => setShowApplyModal(club)}
                      className="py-2 px-3 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-600 dark:text-pink-400 text-xs font-bold hover:bg-pink-500/25 transition-all"
                    >
                      Apply
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedClubId(club.id)}
                      className="py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recruitment In-App Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
            <button
              onClick={() => setShowApplyModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img src={showApplyModal.logoUrl} alt={showApplyModal.name} className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <span className="text-[10px] font-black uppercase text-pink-500">Recruitment Application</span>
                <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">{showApplyModal.name}</h3>
                <span className="text-xs text-zinc-500">Open Role: {showApplyModal.recruitmentRole}</span>
              </div>
            </div>

            <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Why do you want to join this club? (Past experience / skills)
                </label>
                <textarea
                  required
                  rows={4}
                  value={applyReason}
                  onChange={(e) => setApplyReason(e.target.value)}
                  placeholder="Tell the leads about your projects, skills, or what you'd like to contribute..."
                  className="w-full p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="text-[11px] text-zinc-400">
                Your profile information (program, year, and badges) will be shared with the club admin.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl sw-gradient-bg text-white font-bold text-xs shadow-md shadow-purple-600/20"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
