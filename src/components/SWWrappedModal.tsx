import React, { useState } from 'react';
import { 
  Sparkles, 
  Share2, 
  Calendar, 
  Trophy, 
  Flame, 
  Award, 
  X, 
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface SWWrappedProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SWWrappedModal: React.FC<SWWrappedProps> = ({ isOpen, onClose }) => {
  const { currentUser, events, clubs } = useApp();
  const [slide, setSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "Your SSPU Campus Story",
      subtitle: "2026 Semester Recap",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="w-20 h-20 rounded-3xl sw-gradient-bg flex items-center justify-center text-white text-3xl font-black shadow-2xl mb-4 animate-bounce">
            ⚡️
          </div>
          <h3 className="text-xl font-black text-white mb-2 font-heading">
            {currentUser.name}
          </h3>
          <p className="text-xs text-zinc-300 max-w-xs leading-relaxed">
            You lived campus life outside the lecture halls to the absolute fullest! Here is your official recap.
          </p>
        </div>
      )
    },
    {
      title: "Campus Events Attended",
      subtitle: "Never missed the hype",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 font-tabular mb-2">
            {currentUser.eventsAttendedCount}
          </span>
          <div className="text-sm font-bold text-white mb-1">Total Verified Events</div>
          <p className="text-xs text-zinc-400 max-w-xs">
            From Pulse 2026 to late-night incubation hackathons & acoustic nights on Central Lawns.
          </p>
        </div>
      )
    },
    {
      title: "Top Campus Tribe",
      subtitle: "Your favorite community",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-2xl font-black mb-3">
            👨‍💻
          </div>
          <div className="text-lg font-black text-white font-heading">ByteCraft Tech Club</div>
          <div className="text-xs text-purple-400 font-bold mb-2">Core Tech Lead</div>
          <p className="text-xs text-zinc-400 max-w-xs">
            Your most frequented club ecosystem this semester.
          </p>
        </div>
      )
    },
    {
      title: "Student XP & Rank",
      subtitle: "Campus Culture Star",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Top 5% Student Engagement
          </div>
          <div className="text-4xl font-black text-white font-tabular mb-1">
            2,480 XP
          </div>
          <div className="text-xs text-emerald-400 font-bold mb-4">
            🔥 18-Day Campus Streak
          </div>
          <button
            onClick={() => {
              confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
              alert('SW Wrapped card copied! Ready to share to your Instagram Stories.');
            }}
            className="py-3 px-6 rounded-2xl sw-gradient-bg text-white font-bold text-xs shadow-xl flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share to Instagram Story</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm rounded-3xl p-6 bg-gradient-to-b from-purple-950 via-zinc-950 to-black text-white border border-purple-500/30 shadow-2xl flex flex-col justify-between min-h-[480px]">
        {/* Progress bars */}
        <div className="flex gap-1.5 mb-4">
          {slides.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: i <= slide ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 font-heading">
              {slides[slide].subtitle}
            </span>
            <h2 className="text-base font-black text-white font-heading">
              {slides[slide].title}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="my-auto">
          {slides[slide].content}
        </div>

        {/* Bottom Nav Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            disabled={slide === 0}
            onClick={() => setSlide(s => Math.max(0, s - 1))}
            className="p-2 rounded-xl bg-white/10 disabled:opacity-30 hover:bg-white/20 text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-mono font-bold text-zinc-400">
            {slide + 1} / {slides.length}
          </span>

          <button
            onClick={() => {
              if (slide < slides.length - 1) {
                setSlide(s => s + 1);
              } else {
                onClose();
              }
            }}
            className="p-2 rounded-xl sw-gradient-bg hover:opacity-90 text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
