import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  MoreHorizontal, 
  MapPin, 
  Calendar,
  Send,
  ShieldAlert,
  CheckCircle2,
  Trash2,
  Smile,
  Flame
} from 'lucide-react';
import { InstagramIcon as Instagram } from './InstagramIcon';
import { Post } from '../types';
import { useApp } from '../context/AppContext';
import { LazyImage } from './LazyImage';
import { formatHumanDate, pluralize } from '../utils/formatters';
import confetti from 'canvas-confetti';

const QUICK_REACTIONS = ['❤️', '🔥', '👏', '😂', '🙌'];

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { 
    currentUser, 
    toggleLikePost, 
    toggleSavePost, 
    addComment, 
    deletePost,
    setSelectedClubId, 
    setSelectedEventId,
    fileReport,
    blockUser
  } = useApp();

  const [activeSlide, setActiveSlide] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [reactions, setReactions] = useState<{ [emoji: string]: number }>({
    '🔥': 14,
    '👏': 8
  });

  // Double tap to like
  const handleDoubleTap = () => {
    if (!post.isLiked) {
      toggleLikePost(post.id);
    }
    setShowHeartBurst(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
    setShowComments(true);
  };

  const handleAddReaction = (emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.7 }
    });
  };

  const isAuthor = currentUser.id === post.authorId || currentUser.role === 'super_admin';

  return (
    <article className="w-full glass-panel spotlight-card rounded-3xl mb-6 border border-white/20 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3.5 sm:px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/30">
              <LazyImage
                src={post.authorAvatar}
                alt={post.authorName}
                fallbackText={post.authorName}
                className="w-full h-full object-cover"
              />
            </div>
            {post.isClubAuthor && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[9px] font-black shadow">
                C
              </span>
            )}
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-900 dark:text-zinc-100 font-heading">
              <span 
                className="hover:underline cursor-pointer"
                onClick={() => post.clubId && setSelectedClubId(post.clubId)}
              >
                {post.authorName}
              </span>
              {post.isClubAuthor && (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              <span>@{post.authorUsername}</span>
              <span>•</span>
              <span>{formatHumanDate(post.createdAt)}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-zinc-600 dark:text-zinc-300 truncate max-w-[120px]">
                    <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate">{post.location}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Options Menu Button */}
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-1.5 rounded-full hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 text-zinc-500 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showOptions && (
            <div className="absolute right-0 top-8 w-44 rounded-2xl glass-dropdown shadow-xl py-1.5 z-30 text-xs font-semibold">
              <button
                onClick={() => {
                  fileReport({
                    targetType: 'post',
                    targetId: post.id,
                    targetPreview: post.caption.slice(0, 50),
                    reporterUsername: currentUser.username,
                    reason: 'inappropriate',
                    details: 'Reported by user from feed'
                  });
                  setShowOptions(false);
                  alert('Thank you. Post reported to SSPU moderators.');
                }}
                className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <ShieldAlert className="w-4 h-4" />
                Report Post
              </button>

              <button
                onClick={() => {
                  blockUser(post.authorUsername);
                  setShowOptions(false);
                  alert(`Blocked @${post.authorUsername}.`);
                }}
                className="w-full px-3.5 py-2 text-left text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Block User
              </button>

              {isAuthor && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                    setShowOptions(false);
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Instagram Banner if Linked */}
      {post.isInstagramLinked && (
        <div className="px-4 py-2 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 border-y border-pink-500/20 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-semibold">
            <Instagram className="w-4 h-4" />
            <span>Linked from Instagram</span>
            {post.instagramAuthorHandle && (
              <span className="text-zinc-500 font-mono">@{post.instagramAuthorHandle}</span>
            )}
          </div>
          <a
            href={post.instagramUrl || 'https://instagram.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-pink-600 dark:text-pink-400 hover:underline"
          >
            <span>View on IG</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Media Image / Carousel */}
      <div 
        className="relative w-full aspect-square bg-zinc-950 flex items-center justify-center overflow-hidden cursor-pointer select-none"
        onDoubleClick={handleDoubleTap}
      >
        <LazyImage
          src={post.media[activeSlide]}
          alt={post.caption || 'Campus photo'}
          fallbackText={post.authorName}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        {/* Double-tap animated heart burst */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-heart-burst drop-shadow-2xl" />
          </div>
        )}

        {/* Carousel Slide Indicators */}
        {post.media.length > 1 && (
          <>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
              {post.media.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Carousel navigation arrows */}
            {activeSlide > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(s => s - 1);
                }}
                className="absolute left-2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm"
              >
                ‹
              </button>
            )}
            {activeSlide < post.media.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(s => s + 1);
                }}
                className="absolute right-2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm"
              >
                ›
              </button>
            )}
          </>
        )}
      </div>

      {/* Post Actions (Like, Comment, Save, Share, Reactions) */}
      <div className="p-3.5 sm:px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => toggleLikePost(post.id)}
              className="group active:scale-90 transition-transform"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  post.isLiked
                    ? 'fill-rose-500 text-rose-500'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-rose-500'
                }`}
              />
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="text-zinc-700 dark:text-zinc-300 hover:text-purple-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.authorName, text: post.caption, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="text-zinc-700 dark:text-zinc-300 hover:text-purple-600 transition-colors"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick emoji reactions */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-100/70 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/50 text-xs">
              {QUICK_REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleAddReaction(emoji)}
                  className="hover:scale-125 active:scale-95 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button
              onClick={() => toggleSavePost(post.id)}
              className="active:scale-90 transition-transform text-zinc-700 dark:text-zinc-300 hover:text-purple-600"
            >
              <Bookmark
                className={`w-6 h-6 transition-colors ${
                  post.isSaved
                    ? 'fill-purple-600 text-purple-600'
                    : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reaction counters if any */}
        {Object.keys(reactions).length > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {Object.entries(reactions).map(([emoji, count]) => (
              <span key={emoji} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 text-[10px] font-bold text-zinc-600 dark:text-zinc-300 font-tabular">
                <span>{emoji}</span>
                <span>{count}</span>
              </span>
            ))}
          </div>
        )}

        {/* Likes Count with proper pluralization */}
        <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 mb-1.5 font-tabular">
          {pluralize(post.likesCount, 'like')}
        </div>

        {/* Caption */}
        <div className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed mb-2">
          <span className="font-bold mr-1.5 text-zinc-900 dark:text-white font-heading">
            {post.authorUsername}
          </span>
          {post.caption}
        </div>

        {/* Tagged Event / Club Pills */}
        {(post.taggedEvent || post.taggedClub) && (
          <div className="flex flex-wrap gap-2 my-2.5">
            {post.taggedEvent && (
              <button
                onClick={() => setSelectedEventId(post.taggedEvent!.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] font-semibold border border-purple-200/50 dark:border-purple-800/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.taggedEvent.title}</span>
              </button>
            )}

            {post.taggedClub && (
              <button
                onClick={() => setSelectedClubId(post.taggedClub!.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold border border-cyan-200/50 dark:border-cyan-800/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{post.taggedClub.name}</span>
              </button>
            )}
          </div>
        )}

        {/* View all comments toggle */}
        {post.comments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-[11px] text-zinc-400 font-medium hover:text-zinc-600 dark:hover:text-zinc-200 block mb-2"
          >
            {showComments
              ? 'Hide comments'
              : `View all ${post.comments.length} comments`}
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="flex flex-col gap-2.5 mb-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start justify-between text-xs">
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-5 h-5 rounded-full overflow-hidden mt-0.5 flex-shrink-0">
                    <LazyImage
                      src={comment.userAvatar}
                      alt={comment.userName}
                      fallbackText={comment.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 mr-1.5 font-heading">
                      {comment.userUsername}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">{comment.text}</span>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-400">{comment.createdAt}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Input Form */}
        <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment for the campus..."
            className="flex-1 bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 disabled:opacity-40 hover:text-purple-700"
          >
            Post
          </button>
        </form>
      </div>
    </article>
  );
};
