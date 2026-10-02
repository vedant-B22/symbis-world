import React, { useState } from 'react';
import { 
  X, 
  Image, 
  Sparkles, 
  MapPin, 
  Users, 
  Send,
  HelpCircle,
  Plus
} from 'lucide-react';
import { InstagramIcon as Instagram } from './InstagramIcon';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

const SAMPLE_CAMPUS_PHOTOS = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1000&auto=format&fit=crop&q=80'
];

export const CreateModal: React.FC = () => {
  const { isCreateOpen, setIsCreateOpen, createPost, createStory, clubs, currentUser } = useApp();

  const [createType, setCreateType] = useState<'post' | 'story' | 'instagram'>('post');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_CAMPUS_PHOTOS[0]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [location, setLocation] = useState('SSPU Campus, Pune');
  const [taggedClubId, setTaggedClubId] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [storyPollQuestion, setStoryPollQuestion] = useState('');
  const [storyPollOpt1, setStoryPollOpt1] = useState('Yes 🔥');
  const [storyPollOpt2, setStoryPollOpt2] = useState('No 👀');

  if (!isCreateOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMedia = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;

    if (createType === 'story') {
      createStory(
        finalMedia,
        caption,
        storyPollQuestion.trim()
          ? { question: storyPollQuestion, options: [storyPollOpt1, storyPollOpt2] }
          : undefined
      );
    } else if (createType === 'instagram') {
      createPost({
        caption: caption.trim() || 'Check out our latest reel on Instagram! 📸✨',
        media: [finalMedia],
        location,
        taggedClubId: taggedClubId || undefined,
        isInstagramLinked: true,
        instagramUrl: instagramUrl.trim() || 'https://instagram.com/sspupune',
        instagramAuthorHandle: currentUser.instagramHandle || 'sspu_student'
      });
    } else {
      createPost({
        caption,
        media: [finalMedia],
        location,
        taggedClubId: taggedClubId || undefined
      });
    }

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });

    setIsCreateOpen(false);
    // Reset state
    setCaption('');
    setCustomImageUrl('');
    setInstagramUrl('');
    setStoryPollQuestion('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
        <button
          onClick={() => setIsCreateOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h2 className="text-lg font-black text-zinc-900 dark:text-white">Create Campus Content</h2>
          <p className="text-xs text-zinc-500">Share your project, fest vibe, or link an Instagram post.</p>
        </div>

        {/* Post Type Selector Tabs */}
        <div className="flex p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setCreateType('post')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              createType === 'post' ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-zinc-500'
            }`}
          >
            Feed Post
          </button>
          <button
            type="button"
            onClick={() => setCreateType('story')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              createType === 'story' ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-zinc-500'
            }`}
          >
            24h Story + Poll
          </button>
          <button
            type="button"
            onClick={() => setCreateType('instagram')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
              createType === 'instagram' ? 'bg-white dark:bg-zinc-900 text-pink-500 shadow-sm' : 'text-zinc-500'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Link IG Reel/Post</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {/* Instagram URL Input */}
          {createType === 'instagram' && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30">
              <label className="font-bold text-zinc-900 dark:text-white block mb-1">
                Paste Instagram Post or Reel Link
              </label>
              <input
                type="url"
                required
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/..."
                className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                No scraping or TOS violations. Displays an official link badge with inline preview.
              </span>
            </div>
          )}

          {/* Photo Selection */}
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1.5">
              Choose Photo or Paste Image URL
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {SAMPLE_CAMPUS_PHOTOS.map((src, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedImage(src);
                    setCustomImageUrl('');
                  }}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer ring-2 transition-all ${
                    selectedImage === src && !customImageUrl ? 'ring-purple-600 scale-95' : 'ring-transparent opacity-75'
                  }`}
                >
                  <img src={src} alt="Sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <input
              type="text"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Or paste any custom image URL..."
              className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Caption
            </label>
            <textarea
              required
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's happening on campus? Add hashtags..."
              className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
            />
          </div>

          {/* Location & Club Tag (For Posts) */}
          {createType !== 'story' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Tag Club (Optional)</label>
                <select
                  value={taggedClubId}
                  onChange={(e) => setTaggedClubId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                >
                  <option value="">None</option>
                  {clubs.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Story Poll Options (If Story) */}
          {createType === 'story' && (
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/40">
              <label className="font-bold text-purple-700 dark:text-purple-300 block mb-1">
                Add Interactive Story Poll (Optional)
              </label>
              <input
                type="text"
                value={storyPollQuestion}
                onChange={(e) => setStoryPollQuestion(e.target.value)}
                placeholder="Ask a question (e.g. Coming to the fest?)"
                className="w-full p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs mb-2"
              />
              {storyPollQuestion.trim() && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={storyPollOpt1}
                    onChange={(e) => setStoryPollOpt1(e.target.value)}
                    className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 border text-xs"
                  />
                  <input
                    type="text"
                    value={storyPollOpt2}
                    onChange={(e) => setStoryPollOpt2(e.target.value)}
                    className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 border text-xs"
                  />
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl sw-gradient-bg text-white font-bold text-xs shadow-lg shadow-purple-600/25 mt-2 hover:opacity-95 active:scale-98 transition-all"
          >
            Publish to Campus
          </button>
        </form>
      </div>
    </div>
  );
};
