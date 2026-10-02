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
  Filter
} from 'lucide-react';
import { EventItem, EventCategory } from '../types';
import { useApp } from '../context/AppContext';
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

  const featuredEvent = events.find(e => e.isFeatured) || events[0];

  const handleRegister = (ev: EventItem) => {
    const result = registerForEvent(ev.id);
    if (result.success) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Show QR Ticket
      setShowQrModal({
        ...ev,
        isRegistered: true,
        registrationTicketId: result.ticketId
      });
    }
  };

  // Generate .ics calendar download
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
      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden mb-6 p-6 md:p-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-zinc-950 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black uppercase tracking-wider mb-3 backdrop-blur-sm border border-pink-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Campus Events Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
            What's Happening at SSPU
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
            Fests, hackathons, open mics, dance battles, and guest sessions. Reserve your spot with your institutional student pass.
          </p>

          {/* Featured Event Quick Card */}
          {featuredEvent && (
            <div 
              onClick={() => setSelectedEventId(featuredEvent.id)}
              className="glass-panel p-3.5 rounded-2xl cursor-pointer hover:scale-[1.01] transition-transform flex items-center justify-between border border-white/10"
            >
              <div className="flex items-center gap-3">
                <img
                  src={featuredEvent.posterUrl}
                  alt={featuredEvent.title}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] font-bold text-pink-400 uppercase">Featured Headline</span>
                  <h4 className="text-sm font-bold text-white truncate max-w-xs">{featuredEvent.title}</h4>
                  <div className="text-[11px] text-zinc-300 flex items-center gap-2 mt-0.5">
                    <span>{featuredEvent.date}</span>
                    <span>•</span>
                    <span>{featuredEvent.venue}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-300 hidden sm:inline">Details →</span>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, clubs, or venues..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'sw-gradient-bg text-white shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
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
              className="bg-white dark:bg-zinc-900/60 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Event Poster Header */}
              <div 
                className="relative h-48 w-full overflow-hidden cursor-pointer"
                onClick={() => setSelectedEventId(ev.id)}
              >
                <img
                  src={ev.posterUrl}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                    {ev.category}
                  </span>
                  {ev.isTrending && (
                    <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-black">
                      Trending 🔥
                    </span>
                  )}
                </div>

                {/* Organizer Club Badge */}
                <div 
                  className="absolute bottom-3 left-3 flex items-center gap-2 cursor-pointer hover:opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClubId(ev.clubId);
                  }}
                >
                  <img
                    src={ev.clubLogo}
                    alt={ev.clubName}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-white/50"
                  />
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
                    className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors leading-snug mb-1"
                  >
                    {ev.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                    {ev.subtitle}
                  </p>

                  <div className="flex flex-col gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 mb-4 bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-3.5 h-3.5 text-purple-500" />
                      <span className="font-semibold">{ev.date} • {ev.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-pink-500" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <Users className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{ev.rsvpCount} students registered</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/70">
                  {ev.isRegistered ? (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => setShowQrModal(ev)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-500/25 transition-all"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>View Pass</span>
                      </button>

                      <button
                        onClick={() => downloadCalendarFile(ev)}
                        title="Add to Calendar (.ics)"
                        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => cancelEventRegistration(ev.id)}
                        className="py-2.5 px-3 text-[11px] text-zinc-400 hover:text-rose-500"
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
                        <span>Register (Free)</span>
                      </button>

                      <button
                        onClick={() => downloadCalendarFile(ev)}
                        title="Add to Calendar"
                        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <CalendarIcon className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({ title: ev.title, text: ev.description, url: window.location.href });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link copied!');
                          }
                        }}
                        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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

      {/* QR Ticket Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-sm w-full p-6 text-center border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
            <button
              onClick={() => setShowQrModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl sw-gradient-bg mx-auto flex items-center justify-center text-white font-black text-xl mb-3 shadow-lg">
              SW
            </div>

            <div className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
              Official Campus Event Pass
            </div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white leading-tight mb-1">
              {showQrModal.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              {showQrModal.date} • {showQrModal.startTime} • {showQrModal.venue}
            </p>

            {/* QR Code SVG Generation */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-inner border border-zinc-200 mb-4">
              <QRCodeSVG
                value={`SSPU-TICKET-${showQrModal.registrationTicketId || showQrModal.id}`}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 py-1.5 px-3 rounded-lg mb-3">
              PASS ID: {showQrModal.registrationTicketId || 'SSPU-PASS-9081'}
            </div>

            <p className="text-[10px] text-zinc-400 leading-tight mb-4">
              Present this digital pass at the entrance gate. Valid for SSPU verified students only.
            </p>

            <button
              onClick={() => setShowQrModal(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs hover:opacity-90 transition-opacity"
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
        >
          ✕
        </button>

        <div className="relative h-64 w-full">
          <img src={ev.posterUrl} alt={ev.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-2.5 py-1 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-wider">
              {ev.category}
            </span>
            <h2 className="text-xl font-extrabold mt-1 text-white">{ev.title}</h2>
          </div>
        </div>

        <div className="p-6">
          <div 
            onClick={() => {
              onClose();
              setSelectedClubId(ev.clubId);
            }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 mb-5 cursor-pointer hover:bg-zinc-100"
          >
            <img src={ev.clubLogo} alt={ev.clubName} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="text-xs text-zinc-400">Organized by</div>
              <div className="text-sm font-bold text-zinc-900 dark:text-white">{ev.clubName}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/40">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-bold">Date & Time</span>
              <span className="font-bold text-purple-700 dark:text-purple-300">{ev.date} • {ev.startTime}</span>
            </div>
            <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200/40">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-bold">Venue</span>
              <span className="font-bold text-pink-700 dark:text-pink-300 truncate block">{ev.venue}</span>
            </div>
          </div>

          <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5">About the Event</h4>
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
            <div className="mb-6 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 text-[11px] text-zinc-500 dark:text-zinc-400">
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
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                View Registered Pass
              </button>
            ) : (
              <button
                onClick={() => onRegister(ev)}
                className="flex-1 py-3 rounded-xl sw-gradient-bg text-white font-bold text-xs"
              >
                Confirm Free Registration
              </button>
            )}
            <button
              onClick={() => onDownloadCalendar(ev)}
              className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
