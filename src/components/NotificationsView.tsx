import React from 'react';
import { 
  Bell, 
  Heart, 
  Calendar, 
  Users2, 
  UserPlus, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationsAsRead, unreadCount, setSelectedEventId, setSelectedClubId } = useApp();

  return (
    <div className="w-full max-w-xl mx-auto pb-16">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white">Activity & Alerts</h2>
          <p className="text-xs text-zinc-500">Likes, mentions, club notices and event passes.</p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markNotificationsAsRead}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {notifications.map((notif) => {
          let Icon = Heart;
          let iconColor = 'text-rose-500';

          if (notif.type === 'event_reminder') {
            Icon = Calendar;
            iconColor = 'text-purple-500';
          } else if (notif.type === 'club_opening') {
            Icon = Users2;
            iconColor = 'text-cyan-500';
          } else if (notif.type === 'follow') {
            Icon = UserPlus;
            iconColor = 'text-emerald-500';
          }

          return (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                notif.read
                  ? 'bg-white dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80'
                  : 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-200/60 dark:border-purple-800/50 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={notif.actorAvatar}
                    alt={notif.actorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow">
                    <Icon className={`w-3 h-3 ${iconColor}`} />
                  </div>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-zinc-900 dark:text-white mr-1">
                    {notif.actorName}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-300">{notif.content}</span>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{notif.timeAgo}</div>
                </div>
              </div>

              {notif.targetThumb && (
                <img
                  src={notif.targetThumb}
                  alt="Target"
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
