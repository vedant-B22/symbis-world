import React, { useState } from 'react';
import { 
  Share2, 
  Award, 
  Calendar, 
  Bookmark, 
  Grid, 
  Lock, 
  Settings, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { InstagramIcon as Instagram } from './InstagramIcon';
import { useApp } from '../context/AppContext';
import { PostCard } from './PostCard';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    updateProfile, 
    posts, 
    events, 
    clubs, 
    setSelectedEventId, 
    setSelectedClubId 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'posts' | 'resume' | 'events' | 'saved' | 'settings'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editIg, setEditIg] = useState(currentUser.instagramHandle || '');

  // User posts
  const myPosts = posts.filter(p => p.authorId === currentUser.id);
  const mySavedPosts = posts.filter(p => p.isSaved);
  const myEvents = events.filter(e => e.isRegistered);
  const myClubs = clubs.filter(c => c.isFollowed || c.isMember);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      bio: editBio,
      instagramHandle: editIg.replace('@', '')
    });
    setIsEditing(false);
  };

  const handleDownloadData = () => {
    const data = {
      profile: currentUser,
      savedPostsCount: mySavedPosts.length,
      eventsRegistered: myEvents.map(e => ({ title: e.title, date: e.date, venue: e.venue })),
      clubsFollowed: myClubs.map(c => c.name),
      exportedAt: new Date().toISOString(),
      compliance: 'India DPDP Act 2023 Student Data Archive'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SSPU_MyData_${currentUser.username}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full pb-16">
      {/* Profile Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Story Style Ring */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 sw-story-border shadow-lg">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
              />
            </div>
            {currentUser.role === 'club_admin' && (
              <span className="absolute bottom-1 right-1 bg-cyan-500 text-white p-1 rounded-full text-[10px] font-black">
                Club
              </span>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  {currentUser.name}
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                </h1>
                <div className="text-xs font-mono text-zinc-400">@{currentUser.username}</div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="py-2 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* University & School Affiliation */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] font-bold border border-purple-200/50 dark:border-purple-800/40">
                {currentUser.program}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-semibold">
                {currentUser.year}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-semibold">
                {currentUser.school}
              </span>
            </div>

            {/* Bio or Edit Bio Form */}
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="mt-3 flex flex-col gap-2">
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                  rows={2}
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">IG Handle:</span>
                  <input
                    type="text"
                    value={editIg}
                    onChange={(e) => setEditIg(e.target.value)}
                    placeholder="e.g. aryan_pune"
                    className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="py-1.5 px-3 rounded-lg sw-gradient-bg text-white text-xs font-bold"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 max-w-xl">
                {currentUser.bio}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <div>
                <span className="font-black text-zinc-900 dark:text-white mr-1">{myPosts.length}</span>
                <span className="text-zinc-400">posts</span>
              </div>
              <div>
                <span className="font-black text-zinc-900 dark:text-white mr-1">{currentUser.followersCount}</span>
                <span className="text-zinc-400">followers</span>
              </div>
              <div>
                <span className="font-black text-zinc-900 dark:text-white mr-1">{currentUser.followingCount}</span>
                <span className="text-zinc-400">following</span>
              </div>
              <div>
                <span className="font-black text-purple-600 dark:text-purple-400 mr-1">{currentUser.eventsAttendedCount}</span>
                <span className="text-zinc-400">events attended</span>
              </div>
            </div>

            {/* Instagram Link Button */}
            {currentUser.instagramHandle && (
              <div className="mt-4 flex items-center justify-center sm:justify-start">
                <a
                  href={`https://instagram.com/${currentUser.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-bold border border-pink-500/20 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{currentUser.instagramHandle} on Instagram</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex items-center justify-around bg-white dark:bg-zinc-900 rounded-2xl p-1 mb-6 border border-zinc-200/80 dark:border-zinc-800/80 text-xs font-bold">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl transition-all ${
            activeTab === 'posts'
              ? 'bg-zinc-100 dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Posts</span>
        </button>

        <button
          onClick={() => setActiveTab('resume')}
          className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl transition-all ${
            activeTab === 'resume'
              ? 'bg-zinc-100 dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Campus Resume 🏆</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl transition-all ${
            activeTab === 'events'
              ? 'bg-zinc-100 dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events ({myEvents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl transition-all ${
            activeTab === 'saved'
              ? 'bg-zinc-100 dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
      </div>

      {/* Tab 1: Posts Grid */}
      {activeTab === 'posts' && (
        <div>
          {myPosts.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-xs">
              No posts yet. Tap "+" below to share your first campus photo or reel!
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl overflow-hidden">
              {myPosts.map(post => (
                <div key={post.id} className="relative aspect-square bg-zinc-900 group rounded-xl overflow-hidden cursor-pointer">
                  <img src={post.media[0]} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-3">
                    <span>❤️ {post.likesCount}</span>
                    <span>💬 {post.commentsCount}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Campus Resume (Shareable Extracurricular Card) */}
      {activeTab === 'resume' && (
        <div className="bg-gradient-to-br from-zinc-900 via-purple-950 to-zinc-900 p-6 sm:p-8 rounded-3xl border border-purple-500/30 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl sw-gradient-bg flex items-center justify-center text-white font-black text-xl shadow-lg">
                SW
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-400">
                  SSPU Student Verified Pass
                </span>
                <h3 className="text-lg font-black text-white">Campus Extracurricular Resume</h3>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Campus Resume card copied to clipboard for your LinkedIn & portfolio!');
              }}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Card</span>
            </button>
          </div>

          {/* Badges Section */}
          <div className="mb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">Verified Badges</h4>
            <div className="flex flex-wrap gap-2">
              {currentUser.badges.map((b, i) => (
                <div key={i} className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-pink-400" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clubs and Engagement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-zinc-400 font-bold mb-1">Clubs Ecosystem</div>
              <div className="font-semibold text-white">ByteCraft Tech Club (Core Tech Lead)</div>
              <div className="font-semibold text-white mt-1">Taal & Rhythm Dance Crew (Member)</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-zinc-400 font-bold mb-1">Total Campus Events Attended</div>
              <div className="text-2xl font-black text-pink-400">{currentUser.eventsAttendedCount} Events</div>
              <div className="text-[11px] text-zinc-400 mt-1">Pulse 2026, HackSprint, Acoustic Night</div>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 flex items-center justify-between pt-4 border-t border-white/10">
            <span>Verified Student ID: {currentUser.id} • Symbiosis Skills & Professional University</span>
            <span>Non-academic activity record</span>
          </div>
        </div>
      )}

      {/* Tab 3: Registered Events */}
      {activeTab === 'events' && (
        <div className="space-y-3">
          {myEvents.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-xs">
              No event registrations yet. Check out the Events tab!
            </div>
          ) : (
            myEvents.map(ev => (
              <div
                key={ev.id}
                onClick={() => setSelectedEventId(ev.id)}
                className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <div className="flex items-center gap-3">
                  <img src={ev.posterUrl} alt={ev.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{ev.title}</h4>
                    <div className="text-xs text-zinc-400">{ev.date} • {ev.venue}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                  Ticket Active 🎟️
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Saved Posts */}
      {activeTab === 'saved' && (
        <div className="max-w-xl mx-auto space-y-4">
          {mySavedPosts.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-xs">
              No saved posts yet. Bookmark posts in the feed to save them here!
            </div>
          ) : (
            mySavedPosts.map(post => <PostCard key={post.id} post={post} />)
          )}
        </div>
      )}

      {/* Tab 5: Privacy & DPDP Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80">
          <h3 className="text-base font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-500" />
            Privacy & India DPDP Act 2023 Controls
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
              <div>
                <div className="font-bold text-zinc-900 dark:text-white">Private Profile</div>
                <div className="text-zinc-500 text-[11px]">Only approved campus students can see your full feed.</div>
              </div>
              <input
                type="checkbox"
                checked={currentUser.isPrivate || false}
                onChange={(e) => updateProfile({ isPrivate: e.target.checked })}
                className="w-5 h-5 accent-purple-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
              <div>
                <div className="font-bold text-zinc-900 dark:text-white">Hide Events Attended</div>
                <div className="text-zinc-500 text-[11px]">Prevent your registered events from appearing publicly.</div>
              </div>
              <input
                type="checkbox"
                checked={currentUser.hideEventsAttended || false}
                onChange={(e) => updateProfile({ hideEventsAttended: e.target.checked })}
                className="w-5 h-5 accent-purple-600 rounded"
              />
            </div>

            {/* DPDP Data Export */}
            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-1">
                Data Portability & Account Rights (DPDP Act)
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-3 text-[11px]">
                Under India's Digital Personal Data Protection Act 2023, you retain full ownership of your campus profile data. You can download an offline archive or request complete account erasure at any time.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadData}
                  className="py-2 px-3.5 rounded-xl bg-purple-600 text-white font-bold flex items-center gap-1.5 shadow"
                >
                  <FileDown className="w-4 h-4" />
                  Download My Data (.JSON)
                </button>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to request data deletion? Your account will be purged within 48 hours.')) {
                      alert('Account deletion request registered with the Grievance Officer.');
                    }
                  }}
                  className="py-2 px-3 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-bold"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
