import React from 'react';
import { Plus } from 'lucide-react';
import { StoryGroup } from '../types';
import { useApp } from '../context/AppContext';

export const StoriesBar: React.FC = () => {
  const { stories, openStory, currentUser, setIsCreateOpen } = useApp();

  return (
    <div className="w-full bg-white dark:bg-zinc-900/60 rounded-3xl p-3.5 mb-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1">
        {/* Current user Add Story Button */}
        <div 
          onClick={() => setIsCreateOpen(true)}
          className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full p-[2px] bg-zinc-200 dark:bg-zinc-800 transition-transform group-hover:scale-105">
              <img
                src={currentUser.avatar}
                alt="My Story"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full sw-gradient-bg text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[68px]">
            Your story
          </span>
        </div>

        {/* Stories list */}
        {stories.map((group) => {
          // If this is user's own story group and already listed, show or render
          if (group.userId === currentUser.id && group.stories.length === 0) return null;

          const isClub = group.isClub;
          const borderClass = isClub ? 'sw-club-border' : 'sw-story-border';

          return (
            <div
              key={group.id}
              onClick={() => openStory(group)}
              className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
            >
              <div
                className={`w-16 h-16 rounded-full p-[2.5px] ${borderClass} transition-transform group-hover:scale-105 active:scale-95 duration-200 shadow-sm`}
              >
                <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-zinc-950">
                  <img
                    src={group.userAvatar}
                    alt={group.userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center gap-0.5 max-w-[68px]">
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
