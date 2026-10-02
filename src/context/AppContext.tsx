import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Club,
  EventItem,
  Post,
  StoryGroup,
  SportsFixture,
  SportsStanding,
  LostAndFoundItem,
  NotificationItem,
  ReportItem
} from '../types';
import {
  CURRENT_USER,
  INITIAL_CLUBS,
  INITIAL_EVENTS,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_FIXTURES,
  INITIAL_STANDINGS,
  INITIAL_LOST_FOUND,
  INITIAL_NOTIFICATIONS,
  INITIAL_REPORTS
} from '../data/seedData';

interface AppContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;
  // User Auth & Profiles
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  switchRole: (role: User['role']) => void;
  updateProfile: (updated: Partial<User>) => void;
  blockedUsers: string[];
  blockUser: (username: string) => void;
  unblockUser: (username: string) => void;
  mutedUsers: string[];
  muteUser: (username: string) => void;
  // Navigation / Modal States
  activeTab: 'feed' | 'events' | 'clubs' | 'sports' | 'explore' | 'notifications' | 'profile' | 'admin' | 'club_admin';
  setActiveTab: (tab: 'feed' | 'events' | 'clubs' | 'sports' | 'explore' | 'notifications' | 'profile' | 'admin' | 'club_admin') => void;
  activeStoryGroup: StoryGroup | null;
  openStory: (group: StoryGroup) => void;
  closeStory: () => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  selectedClubId: string | null;
  setSelectedClubId: (id: string | null) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
  // Feed & Posts
  posts: Post[];
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (postData: {
    caption: string;
    media: string[];
    mediaType?: 'image' | 'carousel' | 'video';
    location?: string;
    taggedClubId?: string;
    isInstagramLinked?: boolean;
    instagramUrl?: string;
    instagramAuthorHandle?: string;
  }) => void;
  deletePost: (postId: string) => void;
  // Stories
  stories: StoryGroup[];
  voteStoryPoll: (storyGroupId: string, storyId: string, optionIndex: number) => void;
  createStory: (mediaUrl: string, caption?: string, poll?: { question: string; options: string[] }) => void;
  // Events
  events: EventItem[];
  registerForEvent: (eventId: string) => { ticketId: string; success: boolean };
  cancelEventRegistration: (eventId: string) => void;
  addEvent: (newEvent: Omit<EventItem, 'id' | 'rsvpCount' | 'isRegistered'>) => void;
  // Clubs
  clubs: Club[];
  toggleFollowClub: (clubId: string) => void;
  applyForClub: (clubId: string, reason: string, portfolio?: string) => void;
  clubApplications: { id: string; clubId: string; applicantName: string; applicantUsername: string; role: string; reason: string; date: string }[];
  createClubAnnouncement: (clubId: string, title: string, content: string) => void;
  // Sports & Campus Extras
  fixtures: SportsFixture[];
  standings: SportsStanding[];
  lostAndFound: LostAndFoundItem[];
  addLostFound: (item: Omit<LostAndFoundItem, 'id' | 'date' | 'isResolved'>) => void;
  resolveLostFound: (id: string) => void;
  // Notifications
  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  unreadCount: number;
  // Safety & Moderation
  reports: ReportItem[];
  fileReport: (report: Omit<ReportItem, 'id' | 'timestamp' | 'status'>) => void;
  resolveReport: (reportId: string, action: 'resolved' | 'dismissed') => void;
  // Search state
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'symbis_world_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}dark`);
    return saved !== null ? JSON.parse(saved) : true; // Dark mode is hero by default
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}dark`, JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // 2. Active Tab & Modals
  const [activeTab, setActiveTab] = useState<AppContextType['activeTab']>('feed');
  const [activeStoryGroup, setActiveStoryGroup] = useState<StoryGroup | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 3. User & Roles
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}user`);
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [mutedUsers, setMutedUsers] = useState<string[]>([]);

  const switchRole = (role: User['role']) => {
    setCurrentUser(prev => {
      const updated: User = {
        ...prev,
        role,
        administeredClubId: role === 'club_admin' ? 'club-gdg' : undefined
      };
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}user`, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProfile = (updated: Partial<User>) => {
    setCurrentUser(prev => {
      const neu = { ...prev, ...updated };
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}user`, JSON.stringify(neu));
      return neu;
    });
  };

  const blockUser = (username: string) => {
    setBlockedUsers(prev => [...new Set([...prev, username])]);
  };

  const unblockUser = (username: string) => {
    setBlockedUsers(prev => prev.filter(u => u !== username));
  };

  const muteUser = (username: string) => {
    setMutedUsers(prev => [...new Set([...prev, username])]);
  };

  // 4. Feed & Posts
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}posts`);
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const toggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
          };
        }
        return p;
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isSaved = !p.isSaved;
          return {
            ...p,
            isSaved,
            savedCount: isSaved ? p.savedCount + 1 : Math.max(0, p.savedCount - 1)
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            userUsername: currentUser.username,
            userAvatar: currentUser.avatar,
            text: text.trim(),
            createdAt: 'Just now',
            likesCount: 0
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [newComment, ...p.comments]
          };
        }
        return p;
      })
    );
  };

  const createPost = (postData: {
    caption: string;
    media: string[];
    mediaType?: 'image' | 'carousel' | 'video';
    location?: string;
    taggedClubId?: string;
    isInstagramLinked?: boolean;
    instagramUrl?: string;
    instagramAuthorHandle?: string;
  }) => {
    const taggedClubObj = postData.taggedClubId
      ? clubs.find(c => c.id === postData.taggedClubId)
      : undefined;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      isClubAuthor: currentUser.role === 'club_admin',
      clubId: currentUser.role === 'club_admin' ? currentUser.administeredClubId : undefined,
      media: postData.media.length > 0 ? postData.media : ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&auto=format&fit=crop&q=80'],
      mediaType: postData.mediaType || (postData.media.length > 1 ? 'carousel' : 'image'),
      caption: postData.caption,
      location: postData.location || 'SSPU Campus, Pune',
      taggedClub: taggedClubObj ? { id: taggedClubObj.id, name: taggedClubObj.name } : undefined,
      likesCount: 1,
      isLiked: true,
      savedCount: 0,
      isSaved: false,
      commentsCount: 0,
      comments: [],
      createdAt: 'Just now',
      isInstagramLinked: postData.isInstagramLinked,
      instagramUrl: postData.instagramUrl,
      instagramAuthorHandle: postData.instagramAuthorHandle
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  // 5. Stories
  const [stories, setStories] = useState<StoryGroup[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}stories`);
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const openStory = (group: StoryGroup) => {
    setActiveStoryGroup(group);
  };

  const closeStory = () => {
    setActiveStoryGroup(null);
  };

  const voteStoryPoll = (storyGroupId: string, storyId: string, optionIndex: number) => {
    setStories(prev =>
      prev.map(grp => {
        if (grp.id === storyGroupId) {
          const updatedStories = grp.stories.map(st => {
            if (st.id === storyId && st.poll && st.poll.userVotedIndex === undefined) {
              const updatedOptions = st.poll.options.map((opt, idx) =>
                idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
              );
              return {
                ...st,
                poll: {
                  ...st.poll,
                  options: updatedOptions,
                  userVotedIndex: optionIndex
                }
              };
            }
            return st;
          });
          return { ...grp, stories: updatedStories };
        }
        return grp;
      })
    );
  };

  const createStory = (mediaUrl: string, caption?: string, poll?: { question: string; options: string[] }) => {
    const newStoryItem = {
      id: `st-${Date.now()}`,
      mediaUrl,
      mediaType: 'image' as const,
      duration: 5,
      timestamp: 'Just now',
      caption,
      poll: poll && poll.question ? {
        question: poll.question,
        options: poll.options.map(text => ({ text, votes: 0 })),
        userVotedIndex: undefined
      } : undefined
    };

    setStories(prev => {
      const myGroupIdx = prev.findIndex(g => g.userId === currentUser.id);
      if (myGroupIdx >= 0) {
        const copy = [...prev];
        copy[myGroupIdx] = {
          ...copy[myGroupIdx],
          stories: [newStoryItem, ...copy[myGroupIdx].stories],
          hasUnseen: false
        };
        return copy;
      } else {
        const myGroup: StoryGroup = {
          id: `sg-${currentUser.id}`,
          userId: currentUser.id,
          userName: 'Your Story',
          userUsername: currentUser.username,
          userAvatar: currentUser.avatar,
          isClub: currentUser.role === 'club_admin',
          hasUnseen: false,
          stories: [newStoryItem]
        };
        return [myGroup, ...prev];
      }
    });
  };

  // 6. Events
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const registerForEvent = (eventId: string) => {
    const ticketId = `SSPU-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId) {
          return {
            ...ev,
            isRegistered: true,
            registrationTicketId: ticketId,
            rsvpCount: ev.rsvpCount + 1
          };
        }
        return ev;
      })
    );
    // Increment user events attended count
    setCurrentUser(u => ({ ...u, eventsAttendedCount: u.eventsAttendedCount + 1 }));
    return { ticketId, success: true };
  };

  const cancelEventRegistration = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId) {
          return {
            ...ev,
            isRegistered: false,
            registrationTicketId: undefined,
            rsvpCount: Math.max(0, ev.rsvpCount - 1)
          };
        }
        return ev;
      })
    );
    setCurrentUser(u => ({ ...u, eventsAttendedCount: Math.max(0, u.eventsAttendedCount - 1) }));
  };

  const addEvent = (newEvent: Omit<EventItem, 'id' | 'rsvpCount' | 'isRegistered'>) => {
    const ev: EventItem = {
      ...newEvent,
      id: `ev-${Date.now()}`,
      rsvpCount: 1,
      isRegistered: true,
      registrationTicketId: `SSPU-ORG-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setEvents(prev => [ev, ...prev]);
  };

  // 7. Clubs
  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}clubs`);
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [clubApplications, setClubApplications] = useState<
    { id: string; clubId: string; applicantName: string; applicantUsername: string; role: string; reason: string; date: string }[]
  >([
    {
      id: 'app-1',
      clubId: 'club-gdg',
      applicantName: 'Tanvi Shinde',
      applicantUsername: 'tanvi_s',
      role: 'UI Designer',
      reason: 'Created design systems in Figma for 2 student projects and experienced with React components.',
      date: 'Today, 2:30 PM'
    }
  ]);

  const toggleFollowClub = (clubId: string) => {
    setClubs(prev =>
      prev.map(c => {
        if (c.id === clubId) {
          const isFollowed = !c.isFollowed;
          return {
            ...c,
            isFollowed,
            membersCount: isFollowed ? c.membersCount + 1 : Math.max(0, c.membersCount - 1)
          };
        }
        return c;
      })
    );
  };

  const applyForClub = (clubId: string, reason: string) => {
    const club = clubs.find(c => c.id === clubId);
    if (!club) return;
    const newApp = {
      id: `app-${Date.now()}`,
      clubId,
      applicantName: currentUser.name,
      applicantUsername: currentUser.username,
      role: club.recruitmentRole || 'Core Member',
      reason,
      date: 'Just now'
    };
    setClubApplications(prev => [newApp, ...prev]);
  };

  const createClubAnnouncement = (clubId: string, title: string, content: string) => {
    setClubs(prev =>
      prev.map(c => {
        if (c.id === clubId) {
          const newAnn = {
            id: `ann-${Date.now()}`,
            title,
            date: 'Today',
            content
          };
          return { ...c, announcements: [newAnn, ...c.announcements] };
        }
        return c;
      })
    );
  };

  // 8. Sports & Extras
  const [fixtures] = useState<SportsFixture[]>(INITIAL_FIXTURES);
  const [standings] = useState<SportsStanding[]>(INITIAL_STANDINGS);
  const [lostAndFound, setLostAndFound] = useState<LostAndFoundItem[]>(INITIAL_LOST_FOUND);

  const addLostFound = (item: Omit<LostAndFoundItem, 'id' | 'date' | 'isResolved'>) => {
    const neu: LostAndFoundItem = {
      ...item,
      id: `lf-${Date.now()}`,
      date: 'Today',
      isResolved: false
    };
    setLostAndFound(prev => [neu, ...prev]);
  };

  const resolveLostFound = (id: string) => {
    setLostAndFound(prev =>
      prev.map(item => (item.id === id ? { ...item, isResolved: true } : item))
    );
  };

  // 9. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // 10. Reports & Safety
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);

  const fileReport = (report: Omit<ReportItem, 'id' | 'timestamp' | 'status'>) => {
    const neu: ReportItem = {
      ...report,
      id: `rep-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    };
    setReports(prev => [neu, ...prev]);
  };

  const resolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: action } : r))
    );
  };

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        currentUser,
        setCurrentUser,
        switchRole,
        updateProfile,
        blockedUsers,
        blockUser,
        unblockUser,
        mutedUsers,
        muteUser,
        activeTab,
        setActiveTab,
        activeStoryGroup,
        openStory,
        closeStory,
        selectedEventId,
        setSelectedEventId,
        selectedClubId,
        setSelectedClubId,
        isCreateOpen,
        setIsCreateOpen,
        posts,
        toggleLikePost,
        toggleSavePost,
        addComment,
        createPost,
        deletePost,
        stories,
        voteStoryPoll,
        createStory,
        events,
        registerForEvent,
        cancelEventRegistration,
        addEvent,
        clubs,
        toggleFollowClub,
        applyForClub,
        clubApplications,
        createClubAnnouncement,
        fixtures,
        standings,
        lostAndFound,
        addLostFound,
        resolveLostFound,
        notifications,
        markNotificationsAsRead,
        unreadCount,
        reports,
        fileReport,
        resolveReport,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
