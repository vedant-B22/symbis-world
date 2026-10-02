import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LazyImage } from './LazyImage';

export const StoriesBar: React.FC = () => {
  const { stories, openStory, currentUser, setIsCreateOpen } = useApp();

  // Find user's own stories if they exist
  const userStoryGroup = stories.find(s => s.userId === currentUser.id);
  const otherStories = stories.filter(s => s.userId !== currentUser.id);

  return (
    <div className="w-full glass-panel rounded-3xl p-3 sm:p-3.5 mb-6 shadow-sm border border-white/20 dark:border-white/10">
      <div className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1">
        {/* Single clean "Add to Story" / "Your Story" bubble */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 group select-none">
          <div 
            onClick={() => {
              if (userStoryGroup && userStoryGroup.stories.length > 0) {
                openStory(userStoryGroup);
              } else {
                setIsCreateOpen(true);
              }
            }}
            className="relative cursor-pointer"
          >
            <div 
              className={`w-16 h-16 rounded-full p-[2.5px] transition-all duration-300 group-hover:scale-105 active:scale-95 ${
                userStoryGroup && userStoryGroup.stories.length > 0 
                  ? 'sw-story-border shadow-md' 
                  : 'bg-zinc-200 dark:bg-zinc-800'
              }`}
            >
              <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-zinc-950 overflow-hidden">
                <LazyImage
                  src={currentUser.avatar}
                  alt="My Profile"
                  fallbackText={currentUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Quick add (+) badge */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCreateOpen(true);
              }}
              title="Add new story"
              aria-label="Add new story"
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full sw-gradient-bg text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow hover:scale-110 active:scale-95 transition-transform"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-[68px]">
            {userStoryGroup && userStoryGroup.stories.length > 0 ? 'Your Story' : 'Add Story'}
          </span>
        </div>

        {/* Stories from Clubs & Peers (No duplicate of current user) */}
        {otherStories.map((group) => {
          const isClub = group.isClub;
          const borderClass = isClub ? 'sw-club-border' : 'sw-story-border';

          return (
            <div
              key={group.id}
              onClick={() => openStory(group)}
              className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group select-none"
            >
              <div
                className={`w-16 h-16 rounded-full p-[2.5px] ${borderClass} transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-sm`}
              >
                <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-zinc-950 overflow-hidden">
                  <LazyImage
                    src={group.userAvatar}
                    alt={group.userName}
                    fallbackText={group.userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center gap-0.5 max-w-[70px]">
                <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 truncate">
                  {group.userName}
                </span>
                {isClub && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" title="Club story" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
