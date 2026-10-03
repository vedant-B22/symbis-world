export type UserRole = 'student' | 'club_admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  school: string; // e.g. "School of Architecture & Planning", "School of CS & IT", etc.
  program: string; // e.g. "B.Tech Computer Science", "B.Des Fashion", etc.
  year: string; // "1st Year", "2nd Year", "3rd Year", "Final Year", "Alumni"
  bio: string;
  instagramHandle?: string;
  interests: string[];
  badges: string[];
  followersCount: number;
  followingCount: number;
  eventsAttendedCount: number;
  streakDays?: number;
  xp?: number;
  isPrivate?: boolean;
  hideEventsAttended?: boolean;
  administeredClubId?: string;
}

export interface StoryItem {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration: number; // in seconds, default 5
  timestamp: string;
  caption?: string;
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    userVotedIndex?: number;
  };
}

export interface StoryGroup {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userUsername: string;
  isClub: boolean;
  clubBadge?: string;
  hasUnseen: boolean;
  stories: StoryItem[];
}

export interface PostComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userUsername: string;
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  isClubAuthor?: boolean;
  clubId?: string;
  media: string[]; // images or preview images
  mediaType: 'image' | 'carousel' | 'video';
  caption: string;
  location?: string;
  taggedClub?: {
    id: string;
    name: string;
  };
  taggedEvent?: {
    id: string;
    title: string;
  };
  likesCount: number;
  isLiked: boolean;
  savedCount: number;
  isSaved: boolean;
  commentsCount: number;
  comments: PostComment[];
  createdAt: string;
  // Instagram Linked Post
  isInstagramLinked?: boolean;
  instagramUrl?: string;
  instagramAuthorHandle?: string;
}

export type EventCategory = 'cultural' | 'tech' | 'sports' | 'fest' | 'workshop' | 'social';

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  posterUrl: string;
  clubId: string;
  clubName: string;
  clubLogo: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // "5:00 PM"
  endTime: string; // "8:00 PM"
  venue: string; // "Amphitheatre, SSPU Campus"
  description: string;
  rsvpCount: number;
  capacity?: number;
  isRegistered?: boolean;
  registrationTicketId?: string;
  externalLink?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  rules?: string[];
  scheduleHighlights?: string[];
}

export interface Club {
  id: string;
  name: string;
  handle: string;
  category: 'Tech & Innovation' | 'Cultural & Arts' | 'Sports & Fitness' | 'Media & Design' | 'Social & Impact' | 'Debate & Literary';
  logoUrl: string;
  bannerUrl: string;
  description: string;
  membersCount: number;
  isFollowed?: boolean;
  isMember?: boolean;
  recruitmentOpen: boolean;
  recruitmentRole?: string;
  recruitmentDeadline?: string;
  contactEmail: string;
  instagramHandle: string;
  leads: { name: string; role: string; avatar: string }[];
  announcements: { id: string; title: string; date: string; content: string }[];
}

export interface SportsFixture {
  id: string;
  sport: 'Cricket' | 'Football' | 'Basketball' | 'Badminton' | 'Volleyball' | 'Chess' | 'Table Tennis';
  tournamentName: string;
  teamA: { name: string; score?: string; logo: string; school: string };
  teamB: { name: string; score?: string; logo: string; school: string };
  status: 'live' | 'upcoming' | 'completed';
  date: string;
  time: string;
  venue: string;
  liveUpdates?: string;
  winner?: string;
}

export interface SportsStanding {
  school: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  gold: number;
  silver: number;
  bronze: number;
}

export interface LostAndFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  locationFound: string;
  date: string;
  contactUsername: string;
  contactPhone?: string;
  imageUrl?: string;
  isResolved?: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'event_reminder' | 'club_opening' | 'announcement';
  actorName: string;
  actorAvatar: string;
  actorUsername: string;
  content: string;
  timeAgo: string;
  read: boolean;
  targetId?: string;
  targetThumb?: string;
}

export interface ReportItem {
  id: string;
  targetType: 'post' | 'comment' | 'user' | 'club' | 'event';
  targetId: string;
  targetPreview: string;
  reporterUsername: string;
  reason: 'harassment' | 'spam' | 'inappropriate' | 'misinformation' | 'hate_speech';
  details: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
}
