import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export const StoryModalViewer: React.FC = () => {
  const { activeStoryGroup, closeStory, voteStoryPoll } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liked, setLiked] = useState(false);

  const stories = activeStoryGroup?.stories || [];
  const currentStory = stories[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
    setLiked(false);
  }, [activeStoryGroup]);

  useEffect(() => {
    if (!activeStoryGroup || !currentStory || isPaused) return;

    const duration = (currentStory.duration || 5) * 1000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            return 0;
          } else {
            closeStory();
            return 100;
          }
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStoryGroup, currentStory, currentIndex, stories.length, isPaused, closeStory]);

  if (!activeStoryGroup || !currentStory) return null;

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((i) => i + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setProgress(0);
    }
  };

  const handlePollVote = (optIdx: number) => {
    voteStoryPoll(activeStoryGroup.id, currentStory.id, optIdx);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-0 md:p-4 backdrop-blur-md"
      >
        {/* Close Button on Desktop */}
        <button
          onClick={closeStory}
          className="hidden md:flex absolute top-6 right-8 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Story Card Container */}
        <div
          className="relative w-full h-full md:max-w-md md:h-[86vh] md:rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl flex flex-col justify-between"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Progress Bars at top */}
          <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5">
            {stories.map((st, i) => (
              <div key={st.id} className="h-1 flex-1 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header Info */}
          <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between text-white drop-shadow-md">
            <div className="flex items-center gap-2.5">
              <img
                src={activeStoryGroup.userAvatar}
                alt={activeStoryGroup.userName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50"
              />
              <div className="leading-tight">
                <div className="text-xs font-bold flex items-center gap-1.5">
                  {activeStoryGroup.userName}
                  {activeStoryGroup.isClub && (
                    <span className="text-[9px] bg-cyan-500/80 px-1.5 py-0.5 rounded-full font-extrabold uppercase">
                      Club
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-white/70 font-medium">
                  {currentStory.timestamp}
                </div>
              </div>
            </div>

            <button
              onClick={closeStory}
              className="p-1 rounded-full text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Content */}
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img
              src={currentStory.mediaUrl}
              alt="Story"
              className="w-full h-full object-cover select-none"
            />

            {/* Tap areas for next / previous */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
              onClick={handlePrev}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
              onClick={handleNext}
            />

            {/* Poll Widget if present */}
            {currentStory.poll && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute z-20 w-11/12 max-w-xs bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center shadow-xl text-white"
              >
                <div className="text-xs font-black uppercase tracking-wider text-pink-400 mb-1">
                  Campus Poll
                </div>
                <div className="text-sm font-bold mb-3">{currentStory.poll.question}</div>

                <div className="flex flex-col gap-2">
                  {currentStory.poll.options.map((option, idx) => {
                    const hasVoted = currentStory.poll?.userVotedIndex !== undefined;
                    const totalVotes =
                      currentStory.poll?.options.reduce((acc, curr) => acc + curr.votes, 0) || 1;
                    const percentage = Math.round((option.votes / totalVotes) * 100);
                    const isSelected = currentStory.poll?.userVotedIndex === idx;

                    return (
                      <button
                        key={idx}
                        disabled={hasVoted}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePollVote(idx);
                        }}
                        className={`relative w-full py-2.5 px-3 rounded-xl text-xs font-semibold overflow-hidden transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-600/80 ring-2 ring-white/60 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {hasVoted && (
                          <div
                            className="absolute left-0 top-0 bottom-0 bg-white/20 pointer-events-none transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          {option.text}
                        </span>
                        {hasVoted && (
                          <span className="relative z-10 font-mono font-bold text-[11px]">
                            {percentage}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Story Caption */}
            {currentStory.caption && (
              <div className="absolute bottom-20 left-4 right-4 z-20 text-white bg-black/50 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-xs font-medium text-center shadow-lg">
                {currentStory.caption}
              </div>
            )}
          </div>

          {/* Bottom Interactive Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Reply to ${activeStoryGroup.userName}...`}
              className="flex-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
                if (!liked) {
                  confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
                }
              }}
              className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 active:scale-90 transition-all"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 active:scale-90 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
