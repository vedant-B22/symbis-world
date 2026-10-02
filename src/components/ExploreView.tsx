import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  Compass, 
  MapPin, 
  Tag, 
  Calendar, 
  HelpCircle,
  Plus,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from './PostCard';

export const ExploreView: React.FC = () => {
  const { 
    posts, 
    clubs, 
    events, 
    lostAndFound, 
    addLostFound, 
    resolveLostFound,
    currentUser,
    setSelectedClubId,
    setSelectedEventId 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'trending' | 'lost_found' | 'weekend_digest'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLostFoundModal, setShowLostFoundModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLoc, setNewLoc] = useState('');
  const [newType, setNewType] = useState<'lost' | 'found'>('lost');

  // Search across posts, clubs, events
  const searchResults = searchQuery.trim() ? {
    clubs: clubs.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    events: events.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())),
    posts: posts.filter(p => p.caption.toLowerCase().includes(searchQuery.toLowerCase()))
  } : null;

  const handleCreateLostFound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addLostFound({
      type: newType,
      title: newTitle,
      description: newDesc,
      locationFound: newLoc || 'Campus Grounds',
      contactUsername: currentUser.username,
      imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80'
    });

    setShowLostFoundModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewLoc('');
    alert('Campus notice posted to Lost & Found!');
  };

  return (
    <div className="w-full pb-16">
      {/* Search Header */}
      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search students, fests, #hashtags, clubs..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
      </div>

      {/* If Search is Active */}
      {searchResults ? (
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Clubs Matching</h3>
            {searchResults.clubs.length === 0 ? (
              <p className="text-xs text-zinc-400">No clubs found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.clubs.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedClubId(c.id)}
                    className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 cursor-pointer hover:bg-zinc-50"
                  >
                    <img src={c.logoUrl} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">{c.name}</div>
                      <div className="text-[10px] text-zinc-400">{c.handle} • {c.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Events Matching</h3>
            {searchResults.events.length === 0 ? (
              <p className="text-xs text-zinc-400">No events found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.events.map(e => (
                  <div 
                    key={e.id} 
                    onClick={() => setSelectedEventId(e.id)}
                    className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 cursor-pointer hover:bg-zinc-50"
                  >
                    <img src={e.posterUrl} alt={e.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">{e.title}</div>
                      <div className="text-[10px] text-zinc-400">{e.date} • {e.venue}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Posts Matching</h3>
            {searchResults.posts.length === 0 ? (
              <p className="text-xs text-zinc-400">No posts found.</p>
            ) : (
              <div className="max-w-xl mx-auto">
                {searchResults.posts.map(p => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveSubTab('trending')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'trending'
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              Trending Grid
            </button>
            <button
              onClick={() => setActiveSubTab('weekend_digest')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'weekend_digest'
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              Weekend Digest 🌴
            </button>
            <button
              onClick={() => setActiveSubTab('lost_found')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'lost_found'
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              Lost & Found 🔍
            </button>
          </div>

          {/* Sub-Tab 1: Trending Instagram Photo Grid */}
          {activeSubTab === 'trending' && (
            <div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl overflow-hidden mb-8">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square bg-zinc-900 group overflow-hidden rounded-xl cursor-pointer shadow-sm"
                  >
                    <img
                      src={post.media[0]}
                      alt="Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-3">
                      <span>❤️ {post.likesCount}</span>
                      <span>💬 {post.commentsCount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trending Hashtags */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  Trending Around Campus
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['#Pulse2026', '#HackSprintPune', '#SSPUKnights', '#CanteenMaggie', '#AcousticNights', '#ArchitectureDome', '#PlacementPrep'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-purple-100 dark:hover:bg-purple-950/60 hover:text-purple-600 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Weekend Digest */}
          {activeSubTab === 'weekend_digest' && (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl sw-gradient-bg flex items-center justify-center text-white text-xl">
                  🌴
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-pink-500">SSPU Weekly Newsletter</span>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">What's Happening This Weekend?</h3>
                  <span className="text-xs text-zinc-400">Oct 03 - Oct 05, 2026 Edition</span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/40">
                  <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300 mb-1">
                    1. Friday Sunset Jam with Dhwani 🎸
                  </h4>
                  <p>
                    Clear your schedule after 5:30 PM. The Central Lawns will host acoustic covers, open mics, and free hot chai. Bring your acoustic guitar if you'd like to perform.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 mb-1">
                    2. Inter-School Football Showdown ⚽️
                  </h4>
                  <p>
                    Saturday 4:30 PM under the floodlights: Computer Science Knights take on Architecture Titans in what promises to be the match of the semester. Free jerseys for first 100 supporters!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200/50 dark:border-pink-800/40">
                  <h4 className="font-bold text-sm text-pink-700 dark:text-pink-300 mb-1">
                    3. HackSprint 2026 Team Mixer 💻
                  </h4>
                  <p>
                    Looking for teammates for the upcoming 36-hour sprint? ByteCraft Tech Club is hosting a pizza & team matching mixer on Sunday at 11 AM in CS Lab 4.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Lost & Found Board */}
          {activeSubTab === 'lost_found' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">Campus Lost & Found</h3>
                  <p className="text-xs text-zinc-500">Notice board for misplaced ID cards, tech gadgets, and belongings.</p>
                </div>
                <button
                  onClick={() => setShowLostFoundModal(true)}
                  className="py-2 px-3 rounded-xl sw-gradient-bg text-white text-xs font-bold flex items-center gap-1 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Post Item
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lostAndFound.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          item.type === 'lost' 
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30' 
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.type}
                        </span>
                        <span className="text-[10px] text-zinc-400">{item.date}</span>
                      </div>

                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">{item.description}</p>
                      
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{item.locationFound}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                      <span className="text-zinc-400">Contact: @{item.contactUsername}</span>
                      {item.isResolved ? (
                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                        </span>
                      ) : (
                        <button
                          onClick={() => resolveLostFound(item.id)}
                          className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                        >
                          Mark as Returned
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Lost & Found Modal */}
      {showLostFoundModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
            <button
              onClick={() => setShowLostFoundModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white mb-4">Post Lost or Found Item</h3>

            <form onSubmit={handleCreateLostFound} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewType('lost')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                    newType === 'lost' ? 'bg-rose-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                  }`}
                >
                  I Lost Something
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('found')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                    newType === 'found' ? 'bg-emerald-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                  }`}
                >
                  I Found Something
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Item Name</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Blue Airpods Pro 2nd Gen"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Location on Campus</label>
                <input
                  type="text"
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  placeholder="e.g. 2nd Floor Reading Room or Canteen"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Details & Clues</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe distinguishing marks or where it can be claimed..."
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-xl sw-gradient-bg text-white font-bold text-xs"
              >
                Post to Campus Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
