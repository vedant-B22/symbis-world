import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { NavigationBar } from './components/NavigationBar';
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
import { Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

export const MainApp: React.FC = () => {
  const { activeTab, posts, isDark } = useApp();
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className={`min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col md:pl-64 lg:pl-72 transition-colors duration-200`}>
      {/* Navigation Layout: Desktop Sidebar & Mobile Bars */}
      <NavigationBar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-16 md:pt-6 pb-20 md:pb-12">
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="max-w-xl mx-auto">
            {/* Quick Demo Info Bar */}
            <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent border border-purple-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Welcome to SSPU's student culture feed!
                </span>
              </div>
              <button
                onClick={() => setShowOnboarding(true)}
                className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline"
              >
                Replay Onboarding
              </button>
            </div>

            {/* Stories Carousel */}
            <StoriesBar />

            {/* Posts Stream */}
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
