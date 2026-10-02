import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  Map as MapIcon, 
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from './PostCard';
import { LazyImage } from './LazyImage';

interface CampusPin {
  id: string;
  name: string;
  category: 'Venue' | 'Sports' | 'Lab' | 'Food';
  coordinates: { x: number; y: number }; // percentage on stylized map
  currentActivity: string;
}

const CAMPUS_PINS: CampusPin[] = [
  { id: 'pin-1', name: 'Central Amphitheatre', category: 'Venue', coordinates: { x: 48, y: 42 }, currentActivity: 'Pulse 2026 Dance Auditions & Star Night Stage' },
  { id: 'pin-2', name: 'Main Football Turf', category: 'Sports', coordinates: { x: 75, y: 28 }, currentActivity: 'Inter-School Quarter Finals • CS vs Architecture' },
  { id: 'pin-3', name: 'Central Library Lawns', category: 'Venue', coordinates: { x: 30, y: 60 }, currentActivity: 'Dhwani Unplugged Sunset Jam (5:30 PM)' },
  { id: 'pin-4', name: 'Skill Tech Lab 4', category: 'Lab', coordinates: { x: 25, y: 32 }, currentActivity: 'ByteCraft 36h Hackathon Sprint Incubation' },
  { id: 'pin-5', name: 'SSPU Canteen Plaza', category: 'Food', coordinates: { x: 55, y: 70 }, currentActivity: 'Rangmanch Nukkad Street Play "Awaaz"' }
];

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

  const [activeSubTab, setActiveSubTab] = useState<'trending' | 'map' | 'weekend_digest' | 'lost_found'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPin, setSelectedPin] = useState<CampusPin | null>(CAMPUS_PINS[0]);
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
          className="w-full pl-10 pr-4 py-3 rounded-2xl glass-panel text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
      </div>

      {/* If Search is Active */}
      {searchResults ? (
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 font-heading">Clubs Matching</h3>
            {searchResults.clubs.length === 0 ? (
              <p className="text-xs text-zinc-400">No clubs found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.clubs.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedClubId(c.id)}
                    className="p-3 glass-panel rounded-2xl flex items-center gap-3 cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden">
                      <LazyImage src={c.logoUrl} alt={c.name} fallbackText={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white font-heading">{c.name}</div>
                      <div className="text-[10px] text-zinc-400">{c.handle} • {c.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 font-heading">Events Matching</h3>
            {searchResults.events.length === 0 ? (
              <p className="text-xs text-zinc-400">No events found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.events.map(e => (
                  <div 
                    key={e.id} 
                    onClick={() => setSelectedEventId(e.id)}
                    className="p-3 glass-panel rounded-2xl flex items-center gap-3 cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden">
                      <LazyImage src={e.posterUrl} alt={e.title} fallbackText={e.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white font-heading">{e.title}</div>
                      <div className="text-[10px] text-zinc-400">{e.date} • {e.venue}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 font-heading">Posts Matching</h3>
            {searchResults.posts.length === 0 ? (
              <p className="text-xs text-zinc-400">No posts found.</p>
            ) : (
              <div className="max-w-xl mx-auto space-y-4">
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
          <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveSubTab('trending')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSubTab === 'trending'
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Trending Grid
            </button>
            <button
              onClick={() => setActiveSubTab('map')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === 'map'
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Campus Map 📍</span>
            </button>
            <button
              onClick={() => setActiveSubTab('weekend_digest')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSubTab === 'weekend_digest'
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Weekend Digest 🌴
            </button>
            <button
              onClick={() => setActiveSubTab('lost_found')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSubTab === 'lost_found'
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Lost & Found 🔍
            </button>
          </div>

          {/* Sub-Tab 1: Trending Instagram Photo Grid (Masonry feel) */}
          {activeSubTab === 'trending' && (
            <div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl overflow-hidden mb-8">
                {posts.map((post, idx) => (
                  <div
                    key={post.id}
                    className={`relative ${
                      idx % 5 === 0 ? 'col-span-2 row-span-2 aspect-auto min-h-[220px]' : 'aspect-square'
                    } bg-zinc-900 group overflow-hidden rounded-2xl cursor-pointer shadow-sm`}
                  >
                    <LazyImage
                      src={post.media[0]}
                      alt={post.caption || 'Campus photo'}
                      fallbackText={post.authorName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-3 font-tabular">
                      <span>❤️ {post.likesCount}</span>
                      <span>💬 {post.commentsCount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trending Hashtags */}
              <div className="glass-panel rounded-3xl p-5 border border-white/20 dark:border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5 font-heading">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  Trending Around Campus
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['#Pulse2026', '#HackSprintPune', '#SSPUKnights', '#CanteenMaggie', '#AcousticNights', '#ArchitectureDome', '#PlacementPrep'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-zinc-100/70 dark:bg-zinc-800/60 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-purple-100 dark:hover:bg-purple-950/60 hover:text-purple-600 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Interactive Campus Map */}
          {activeSubTab === 'map' && (
            <div className="space-y-4">
              <div className="glass-panel p-5 rounded-3xl border border-white/20 dark:border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-black text-zinc-900 dark:text-white font-heading">
                      SSPU Kiwale Campus Interactive Map
                    </h3>
                    <p className="text-xs text-zinc-400">Tap venue pins to view real-time student activities.</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-tabular">
                    5 Active Venues
                  </span>
                </div>

                {/* Stylized Visual Map Surface */}
                <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-indigo-950 via-zinc-900 to-purple-950 rounded-2xl overflow-hidden border border-white/15 p-4 shadow-inner">
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Stylized campus layout shapes */}
                  <div className="absolute left-[20%] top-[30%] w-32 h-20 bg-purple-500/10 rounded-2xl border border-purple-500/20 flex items-center justify-center text-[10px] font-mono text-purple-300">
                    Tech Labs
                  </div>
                  <div className="absolute right-[20%] top-[25%] w-36 h-28 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex items-center justify-center text-[10px] font-mono text-emerald-300">
                    Sports Arena
                  </div>
                  <div className="absolute left-[40%] bottom-[20%] w-32 h-20 bg-pink-500/10 rounded-2xl border border-pink-500/20 flex items-center justify-center text-[10px] font-mono text-pink-300">
                    Amphitheatre
                  </div>

                  {/* Interactive Pins */}
                  {CAMPUS_PINS.map((pin) => {
                    const isSelected = selectedPin?.id === pin.id;
                    return (
                      <button
                        key={pin.id}
                        onClick={() => setSelectedPin(pin)}
                        style={{ left: `${pin.coordinates.x}%`, top: `${pin.coordinates.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'sw-gradient-bg text-white scale-125 z-20 shadow-lg shadow-purple-500/50'
                            : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-white hover:scale-110 z-10'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>

                {/* Selected Pin Details Box */}
                {selectedPin && (
                  <div className="mt-4 p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/50 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300">
                          {selectedPin.category}
                        </span>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-heading">
                          {selectedPin.name}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        ⚡️ <span className="font-semibold text-zinc-900 dark:text-white">Active Now:</span> {selectedPin.currentActivity}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Weekend Digest */}
          {activeSubTab === 'weekend_digest' && (
            <div className="glass-panel rounded-3xl p-6 border border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl sw-gradient-bg flex items-center justify-center text-white text-xl shadow-md">
                  🌴
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-pink-500 font-heading">SSPU Weekly Newsletter</span>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white font-heading">What's Happening This Weekend?</h3>
                  <span className="text-xs text-zinc-400">Oct 03 - Oct 05, 2026 Edition</span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/40">
                  <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300 mb-1 font-heading">
                    1. Friday Sunset Jam with Dhwani 🎸
                  </h4>
                  <p>
                    Clear your schedule after 5:30 PM. The Central Lawns will host acoustic covers, open mics, and free hot chai. Bring your acoustic guitar if you'd like to perform.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 mb-1 font-heading">
                    2. Inter-School Football Showdown ⚽️
                  </h4>
                  <p>
                    Saturday 4:30 PM under the floodlights: Computer Science Knights take on Architecture Titans in what promises to be the match of the semester. Free jerseys for first 100 supporters!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/50 dark:border-pink-800/40">
                  <h4 className="font-bold text-sm text-pink-700 dark:text-pink-300 mb-1 font-heading">
                    3. HackSprint 2026 Team Mixer 💻
                  </h4>
                  <p>
                    Looking for teammates for the upcoming 36-hour sprint? ByteCraft Tech Club is hosting a pizza & team matching mixer on Sunday at 11 AM in CS Lab 4.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 4: Lost & Found Board */}
          {activeSubTab === 'lost_found' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white font-heading">Campus Lost & Found</h3>
                  <p className="text-xs text-zinc-500">Notice board for misplaced ID cards, tech gadgets, and belongings.</p>
                </div>
                <button
                  onClick={() => setShowLostFoundModal(true)}
                  className="py-2 px-3 rounded-xl sw-gradient-bg text-white text-xs font-bold flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Post Item
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lostAndFound.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 glass-panel rounded-3xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col justify-between"
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
                        <span className="text-[10px] text-zinc-400 font-tabular">{item.date}</span>
                      </div>

                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1 font-heading">{item.title}</h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">{item.description}</p>
                      
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span>{item.locationFound}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                      <span className="text-zinc-400">Contact: @{item.contactUsername}</span>
                      {item.isResolved ? (
                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Returned
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
          <div className="glass-dropdown rounded-3xl max-w-md w-full p-6 border border-white/20 dark:border-white/10 shadow-2xl relative">
            <button
              onClick={() => setShowLostFoundModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white mb-4 font-heading">Post Lost or Found Item</h3>

            <form onSubmit={handleCreateLostFound} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewType('lost')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    newType === 'lost' ? 'bg-rose-500 text-white shadow' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                  }`}
                >
                  I Lost Something
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('found')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    newType === 'found' ? 'bg-emerald-500 text-white shadow' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
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
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Location on Campus</label>
                <input
                  type="text"
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  placeholder="e.g. 2nd Floor Reading Room or Canteen"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Details & Clues</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe distinguishing marks or where it can be claimed..."
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-xl sw-gradient-bg text-white font-bold text-xs shadow-md"
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
