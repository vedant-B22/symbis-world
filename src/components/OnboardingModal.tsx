import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Mail, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

const SCHOOLS = [
  'School of Computer Science & IT',
  'School of Architecture & Planning',
  'School of Design & Creative Arts',
  'School of Management & Entrepreneurship',
  'School of Automobile & Mechatronics',
  'School of Beauty & Wellness',
  'School of Retail & E-Commerce'
];

const INTERESTS_LIST = [
  'Tech & Coding', 'Dance & Choreo', 'Music & Jamming', 'Photography & Film', 
  'Esports & Gaming', 'Football & Turf', 'Cricket', 'Debate & MUN', 
  'Drama & Theatre', 'Graphic Design & UI', 'Startups & Pitching', 'Social Impact'
];

export const OnboardingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentUser, setCurrentUser } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('aryan.kulkarni@sspu.ac.in');
  const [allowedDomain] = useState('@sspu.ac.in');
  const [school, setSchool] = useState(SCHOOLS[0]);
  const [year, setYear] = useState('3rd Year');
  const [program, setProgram] = useState('B.Tech Computer Science');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Tech & Coding', 'Photography & Film', 'Dance & Choreo'
  ]);

  if (!isOpen) return null;

  const toggleInterest = (tag: string) => {
    setSelectedInterests(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleFinish = () => {
    setCurrentUser(u => ({
      ...u,
      email,
      school,
      year,
      program,
      interests: selectedInterests
    }));
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative text-zinc-900 dark:text-white">
        {/* Header Branding */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl sw-gradient-bg flex items-center justify-center text-white font-black text-xl shadow-lg">
            SW
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-pink-500">
              Campus Student Verification
            </div>
            <h2 className="text-xl font-black">Welcome to Symbi's World</h2>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-purple-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-purple-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
        </div>

        {/* Step 1: Institutional Email verification */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold mb-1">Institutional Email Access</h3>
              <p className="text-xs text-zinc-500">
                To keep our campus safe and free of anonymous bots, access requires your official university domain ({allowedDomain}).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <label className="text-[11px] font-bold text-zinc-400 block mb-1">SSPU Student Email</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@sspu.ac.in"
                  className="flex-1 bg-transparent text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Restricted exclusively to SSPU students & staff.</span>
            </div>

            <button
              onClick={() => {
                if (!email.endsWith('sspu.ac.in')) {
                  alert('Please provide a valid institutional email ending in @sspu.ac.in');
                  return;
                }
                setStep(2);
              }}
              className="w-full py-3 rounded-2xl sw-gradient-bg text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Department & Program */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold mb-1">Academic Affiliation</h3>
              <p className="text-xs text-zinc-500">
                Shows on your campus pass and event team sign-ups.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1 text-zinc-400">School / Department</label>
              <select
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
              >
                {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold block mb-1 text-zinc-400">Program</label>
                <input
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1 text-zinc-400">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-3 rounded-2xl sw-gradient-bg text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <span>Next: Pick Campus Interests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold mb-1">What are you into?</h3>
              <p className="text-xs text-zinc-500">
                We will curate your feed with clubs and fests matching your vibe.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto p-1">
              {INTERESTS_LIST.map((tag) => {
                const isSelected = selectedInterests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleInterest(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'sw-gradient-bg text-white shadow'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-2xl sw-gradient-bg text-white font-bold text-xs shadow-lg shadow-purple-600/25"
            >
              Enter Symbi's World 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
