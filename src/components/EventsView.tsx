import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Share2, 
  CheckCircle, 
  QrCode, 
  Download, 
  Sparkles,
  Search,
  ChevronRight,
  Clock,
  Radio
} from 'lucide-react';
import { EventItem, EventCategory } from '../types';
import { useApp } from '../context/AppContext';
import { LazyImage } from './LazyImage';
import { formatHumanDate, pluralize } from '../utils/formatters';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

const CATEGORIES: { id: EventCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Events' },
  { id: 'fest', label: 'Fests & Galas' },
  { id: 'tech', label: 'Tech & Hackathons' },
  { id: 'cultural', label: 'Music & Cultural' },
  { id: 'sports', label: 'Sports & Matches' },
  { id: 'workshop', label: 'Masterclasses' },
  { id: 'social', label: 'Social & Fun' }
];

export const EventsView: React.FC = () => {
  const { 
    events, 
    registerForEvent, 
    cancelEventRegistration, 
    setSelectedClubId,
    selectedEventId,
    setSelectedEventId
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [showQrModal, setShowQrModal] = useState<EventItem | null>(null);

  const filteredEvents = events.filter((ev) => {
    const matchesCategory = activeCategory === 'all' || ev.category === activeCategory;
    const matchesSearch = 
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase()) ||
      ev.clubName.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = events.filter(e => e.isFeatured || e.isTrending);
  const heroEvent = featuredEvents[0] || events[0];

  const handleRegister = (ev: EventItem) => {
    const result = registerForEvent(ev.id);
    if (result.success) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Show Apple-Wallet-styled QR Ticket
      setShowQrModal({
        ...ev,
        isRegistered: true,
        registrationTicketId: result.ticketId
      });
    }
  };

  // Generate RFC 5545 .ics calendar download
  const downloadCalendarFile = (ev: EventItem) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Symbis World//SSPU Pune Events//EN
BEGIN:VEVENT
SUMMARY:${ev.title}
DESCRIPTION:${ev.subtitle}\\nOrganized by: ${ev.clubName}
LOCATION:${ev.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full pb-16">
      {/* Hero Cinematic Carousel Banner */}
      {heroEvent && (
        <div className="relative rounded-3xl overflow-hidden mb-6 p-6 sm:p-8 bg-gradient-to-br from-purple-950 via-indigo-950 to-zinc-950 text-white shadow-2xl border border-white/20 dark:border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black uppercase tracking-wider mb-3 backdrop-blur-sm border border-pink-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              SSPU Headline Event
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-white font-heading">
              {heroEvent.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed line-clamp-2">
              {heroEvent.subtitle} • {heroEvent.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSelectedEventId(heroEvent.id)}
                className="py-3 px-6 rounded-2xl sw-gradient-bg text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                Event Details & Pass
              </button>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                <span>{formatHumanDate(heroEvent.date, heroEvent.startTime)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, organizers, or campus venues..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-panel text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((ev) => {
          return (
            <div
              key={ev.id}
              className="glass-panel spotlight-card rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Event Poster Header */}
              <div 
                className="relative h-48 w-full overflow-hidden cursor-pointer"
                onClick={() => setSelectedEventId(ev.id)}
              >
                <LazyImage
                  src={ev.posterUrl}
                  alt={ev.title}
                  fallbackText={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                    {ev.category}
                  </span>
                  {ev.isTrending && (
                    <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-black shadow">
                      Trending 🔥
                    </span>
                  )}
                </div>

                {/* Organizer Club Badge */}
                <div 
                  className="absolute bottom-3 left-3 flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClubId(ev.clubId);
                  }}
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white/60">
                    <LazyImage
                      src={ev.clubLogo}
                      alt={ev.clubName}
                      fallbackText={ev.clubName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white text-xs font-bold drop-shadow">
                    {ev.clubName}
                  </span>
                </div>
              </div>

              {/* Event Info Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => setSelectedEventId(ev.id)}
                    className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors leading-snug mb-1 font-heading"
                  >
                    {ev.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                    {ev.subtitle}
                  </p>

                  <div className="flex flex-col gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 mb-4 bg-zinc-100/70 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                      <span className="font-semibold">{formatHumanDate(ev.date, ev.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <Users className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                      <span className="font-tabular">{pluralize(ev.rsvpCount, 'student')} registered</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/70">
                  {ev.isRegistered ? (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => setShowQrModal(ev)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-500/25 transition-all shadow-xs"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>View Pass</span>
                      </button>

                      <button
                        onClick={() => downloadCalendarFile(ev)}
                        title="Add to Calendar (.ics)"
                        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => cancelEventRegistration(ev.id)}
                        className="py-2.5 px-3 text-[11px] text-zinc-400 hover:text-rose-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => handleRegister(ev)}
                        className="flex-1 py-2.5 px-4 rounded-xl sw-gradient-bg text-white font-bold text-xs shadow-md shadow-purple-600/20 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Register (Free Pass)</span>
                      </button>

                      <button
                        onClick={() => downloadCalendarFile(ev)}
                        title="Add to Calendar"
                        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <CalendarIcon className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({ title: ev.title, text: ev.description, url: window.location.href });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Event link copied!');
                          }
                        }}
                        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Apple Wallet-Style Holographic Event Pass Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl relative holo-ticket border border-white/30 text-white">
            <button
              onClick={() => setShowQrModal(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {/* Apple Wallet style header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl sw-gradient-bg flex items-center justify-center text-white font-black text-xs shadow">
                  SW
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-pink-300">
                  Campus Pass
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-md font-bold">
                SSPU VERIFIED
              </span>
            </div>

            <h3 className="text-base font-extrabold leading-tight mb-1 text-white font-heading">
              {showQrModal.title}
            </h3>
            <p className="text-xs text-white/80 mb-4 font-semibold">
              {formatHumanDate(showQrModal.date, showQrModal.startTime)} • {showQrModal.venue}
            </p>

            {/* Perforated Divider Simulation */}
            <div className="relative my-4 border-t-2 border-dashed border-white/30 flex items-center justify-between -mx-6">
              <div className="w-6 h-6 rounded-full bg-black/90 -ml-3" />
              <div className="w-6 h-6 rounded-full bg-black/90 -mr-3" />
            </div>

            {/* QR Code SVG Generation */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl border border-white/40 my-2">
              <QRCodeSVG
                value={`SSPU-PASS-${showQrModal.registrationTicketId || showQrModal.id}`}
                size={170}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="font-mono text-xs font-bold text-white bg-black/40 py-2 px-3 rounded-xl mb-3 border border-white/10 mt-3 font-tabular">
              TICKET ID: {showQrModal.registrationTicketId || 'SSPU-PASS-9081'}
            </div>

            <p className="text-[10px] text-white/70 leading-tight mb-4">
              Hold near turnstile or gate scanner. Valid for SSPU students.
            </p>

            <button
              onClick={() => setShowQrModal(null)}
              className="w-full py-2.5 rounded-xl bg-white text-zinc-900 font-extrabold text-xs hover:bg-white/90 transition-opacity shadow"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Event Detail Full View Modal */}
      {selectedEventId && (
        <EventDetailModal
          eventId={selectedEventId}
          onClose={() => setSelectedEventId(null)}
          onRegister={handleRegister}
          onDownloadCalendar={downloadCalendarFile}
          onShowQr={(ev) => setShowQrModal(ev)}
        />
      )}
    </div>
  );
};

const EventDetailModal: React.FC<{
  eventId: string;
  onClose: () => void;
  onRegister: (ev: EventItem) => void;
  onDownloadCalendar: (ev: EventItem) => void;
  onShowQr: (ev: EventItem) => void;
}> = ({ eventId, onClose, onRegister, onDownloadCalendar, onShowQr }) => {
  const { events, setSelectedClubId } = useApp();
  const ev = events.find((e) => e.id === eventId);
  if (!ev) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-dropdown rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-white/20 dark:border-white/10 shadow-2xl relative text-zinc-900 dark:text-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
        >
          ✕
        </button>

        <div className="relative h-64 w-full">
          <LazyImage 
            src={ev.posterUrl} 
            alt={ev.title} 
            fallbackText={ev.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-2.5 py-1 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-wider">
              {ev.category}
            </span>
            <h2 className="text-xl font-extrabold mt-1 text-white font-heading">{ev.title}</h2>
          </div>
        </div>

        <div className="p-6">
          <div 
            onClick={() => {
              onClose();
              setSelectedClubId(ev.clubId);
            }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/50 mb-5 cursor-pointer hover:bg-zinc-200/70 transition-colors"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <LazyImage 
                src={ev.clubLogo} 
                alt={ev.clubName} 
                fallbackText={ev.clubName}
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Organized by</div>
              <div className="text-sm font-bold text-zinc-900 dark:text-white font-heading">{ev.clubName}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/40">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-bold">Date & Time</span>
              <span className="font-bold text-purple-700 dark:text-purple-300">{formatHumanDate(ev.date, ev.startTime)}</span>
            </div>
            <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200/40">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-bold">Venue</span>
              <span className="font-bold text-pink-700 dark:text-pink-300 truncate block">{ev.venue}</span>
            </div>
          </div>

          <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5 font-heading">About the Event</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
            {ev.description}
          </p>

          {ev.scheduleHighlights && (
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Schedule Highlights</h4>
              <ul className="list-disc list-inside text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
                {ev.scheduleHighlights.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {ev.rules && (
            <div className="mb-6 p-3 rounded-2xl bg-zinc-100/60 dark:bg-zinc-800/40 text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Campus Guidelines</span>
              {ev.rules.map((r, i) => (
                <div key={i}>• {r}</div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            {ev.isRegistered ? (
              <button
                onClick={() => onShowQr(ev)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <QrCode className="w-4 h-4" />
                View Registered Pass
              </button>
            ) : (
              <button
                onClick={() => onRegister(ev)}
                className="flex-1 py-3 rounded-xl sw-gradient-bg text-white font-bold text-xs shadow-md"
              >
                Confirm Free Registration
              </button>
            )}
            <button
              onClick={() => onDownloadCalendar(ev)}
              className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
