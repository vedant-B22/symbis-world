import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { NavigationBar } from './components/NavigationBar';
import { RightRail } from './components/RightRail';
import { StoriesBar } from './components/StoriesBar';
import { PostCard } from './components/PostCard';
import { EventsView } from './components/EventsView';
import { ClubsView } from './components/ClubsView';
import { SportsView } from './components/SportsView';
import { ExploreView } from './components/ExploreView';
import { NotificationsView } from './components/NotificationsView';
import { ProfileView } from './components/ProfileView';
import { AdminModerationView } from './components/AdminModerationView';
import { ClubAdminView } from './components/ClubAdminView';
import { StoryModalViewer } from './components/StoryModalViewer';
import { CreateModal } from './components/CreateModal';
import { OnboardingModal } from './components/OnboardingModal';
import { CommandPalette } from './components/CommandPalette';
import { DevRoleMenu } from './components/DevRoleMenu';
import { SWWrappedModal } from './components/SWWrappedModal';
import { Sparkles, Trophy, Award, Radio } from 'lucide-react';

export const MainApp: React.FC = () => {
  const { activeTab, posts } = useApp();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWrapped, setShowWrapped] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col md:pl-64 lg:pl-72 transition-colors duration-300 relative selection:bg-purple-500 selection:text-white">
      {/* Living Ambient Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-orb-1" />
        <div className="aurora-orb-2" />
        <div className="aurora-orb-3" />
      </div>

      {/* Film grain subtle overlay */}
      <div className="noise-overlay" />

      {/* Navigation Layout: Desktop Floating Dock & Mobile Glass Bars */}
      <NavigationBar />

      {/* Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette />

      {/* Floating Dev Role Switcher Chip */}
      <DevRoleMenu />

      {/* Spotify-Wrapped Style Semester Recap Modal */}
      <SWWrappedModal isOpen={showWrapped} onClose={() => setShowWrapped(false)} />

      {/* Main Content Area: Responsive 3-Column on Desktop */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-6 pb-20 md:pb-12 flex gap-8 justify-center">
        {/* Center Main Stage */}
        <main className="flex-1 w-full max-w-3xl min-w-0">
          {/* Feed Tab */}
          {activeTab === 'feed' && (
            <div className="w-full">
              {/* Quick Announcement Bar & SW Wrapped banner */}
              <div className="mb-5 p-3.5 rounded-3xl glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border border-white/20 dark:border-white/10 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl sw-gradient-bg text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow">
                    ✨
                  </div>
                  <div>
                    <span className="font-extrabold text-zinc-900 dark:text-white font-heading block">
                      Welcome to Symbi's World
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      The premier social & culture hub for SSPU Pune.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWrapped(true)}
                    className="py-1.5 px-3 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-600 dark:text-pink-300 font-bold text-[11px] hover:bg-pink-500/25 transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>SW Wrapped '26 🎁</span>
                  </button>

                  <button
                    onClick={() => setShowOnboarding(true)}
                    className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline px-1"
                  >
                    Replay Tour
                  </button>
                </div>
              </div>

              {/* Stories Bar */}
              <StoriesBar />

              {/* Feed Stream */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Events Hub Tab */}
          {activeTab === 'events' && <EventsView />}

          {/* Clubs Directory Tab */}
          {activeTab === 'clubs' && <ClubsView />}

          {/* Sports Arena Tab */}
          {activeTab === 'sports' && <SportsView />}

          {/* Explore & Search Tab */}
          {activeTab === 'explore' && <ExploreView />}

          {/* Activity & Notifications Tab */}
          {activeTab === 'notifications' && <NotificationsView />}

          {/* Profile Tab */}
          {activeTab === 'profile' && <ProfileView />}

          {/* Super Admin Moderation */}
          {activeTab === 'admin' && <AdminModerationView />}

          {/* Club Admin Panel */}
          {activeTab === 'club_admin' && <ClubAdminView />}
        </main>

        {/* Right Rail on Desktop (Live strip, calendar, recruiting clubs) */}
        {activeTab === 'feed' && <RightRail />}
      </div>

      {/* Fullscreen Story Viewer Modal */}
      <StoryModalViewer />

      {/* Universal Create Post / Story / IG Link Sheet */}
      <CreateModal />

      {/* Student Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />

      {/* Global Unofficial Platform Disclaimer in Footer for mobile */}
      <footer className="md:hidden text-center pb-20 pt-4 text-[10px] text-zinc-400">
        Student-built • Unofficial Platform for SSPU Pune • Not affiliated with the university.
      </footer>
    </div>
  );
};
