import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Users, 
  FileText, 
  Download, 
  CheckCircle,
  Megaphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClubAdminView: React.FC = () => {
  const { 
    clubs, 
    events, 
    addEvent, 
    clubApplications, 
    createClubAnnouncement,
    currentUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'events' | 'applications' | 'announcements'>('events');
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  // New event form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('2026-10-28');
  const [startTime, setStartTime] = useState('5:00 PM');
  const [venue, setVenue] = useState('Central Amphitheatre');
  const [category, setCategory] = useState<'cultural' | 'tech' | 'sports' | 'fest' | 'workshop' | 'social'>('tech');
  const [description, setDescription] = useState('');

  // Announcement state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');

  // Active club for current admin
  const managedClub = clubs.find(c => c.id === currentUser.administeredClubId) || clubs[0];
  const managedClubEvents = events.filter(e => e.clubId === managedClub.id);
  const managedClubApps = clubApplications.filter(a => a.clubId === managedClub.id);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addEvent({
      title,
      subtitle: subtitle || 'Campus Event at SSPU',
      posterUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80',
      clubId: managedClub.id,
      clubName: managedClub.name,
      clubLogo: managedClub.logoUrl,
      category,
      date,
      startTime,
      endTime: '8:00 PM',
      venue,
      description: description || 'Join us for this exciting campus experience!'
    });

    setShowNewEventModal(false);
    setTitle('');
    setSubtitle('');
    setDescription('');
    alert('Event created and published live on the SSPU Events Hub!');
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;
    createClubAnnouncement(managedClub.id, annTitle, annContent);
    setAnnTitle('');
    setAnnContent('');
    alert('Announcement published to club members!');
  };

  // CSV export for registrations
  const exportAttendeesCSV = (eventTitle: string, count: number) => {
    let csv = `Student Name,Roll No,Email,School,Ticket Status\n`;
    for (let i = 1; i <= Math.min(count, 15); i++) {
      csv += `Student ${i},SSPU2600${i},student${i}@sspu.ac.in,School of CS,CONFIRMED\n`;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventTitle.replace(/\s+/g, '_')}_Attendees.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-zinc-950 text-white shadow-xl mb-6">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider mb-2">
          <span>Club Admin Operations</span>
        </div>
        <div className="flex items-center gap-4">
          <img src={managedClub.logoUrl} alt={managedClub.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/50" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{managedClub.name}</h1>
            <p className="text-xs text-zinc-300">Manage club events, recruitment applicants, and member announcements.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('events')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'events' ? 'bg-blue-600 text-white shadow' : 'bg-white dark:bg-zinc-900 text-zinc-600'}`}
        >
          Club Events ({managedClubEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'applications' ? 'bg-blue-600 text-white shadow' : 'bg-white dark:bg-zinc-900 text-zinc-600'}`}
        >
          Recruitment Applications ({managedClubApps.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'announcements' ? 'bg-blue-600 text-white shadow' : 'bg-white dark:bg-zinc-900 text-zinc-600'}`}
        >
          Post Notice
        </button>
      </div>

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Published Events
            </h3>
            <button
              onClick={() => setShowNewEventModal(true)}
              className="py-2 px-3.5 rounded-xl sw-gradient-bg text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          </div>

          <div className="space-y-3">
            {managedClubEvents.map(ev => (
              <div
                key={ev.id}
                className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img src={ev.posterUrl} alt={ev.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{ev.title}</h4>
                    <div className="text-xs text-zinc-400">{ev.date} • {ev.venue}</div>
                    <div className="text-[11px] text-purple-600 dark:text-purple-400 font-bold mt-0.5">
                      {ev.rsvpCount} RSVPs confirmed
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => exportAttendeesCSV(ev.title, ev.rsvpCount)}
                  className="py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recruitment Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-3">
          {managedClubApps.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-xs">
              No pending applications at the moment.
            </div>
          ) : (
            managedClubApps.map(app => (
              <div
                key={app.id}
                className="p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{app.applicantName} (@{app.applicantUsername})</span>
                  <span className="text-[10px] text-zinc-400">{app.date}</span>
                </div>
                <div className="text-xs font-bold text-pink-500 mb-1">Applying for: {app.role}</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-2xl mb-3">
                  "{app.reason}"
                </p>
                <div className="flex gap-2 text-xs">
                  <button 
                    onClick={() => alert(`Accepted ${app.applicantName}! Invitation email sent.`)}
                    className="py-1.5 px-3 rounded-xl bg-emerald-600 text-white font-bold"
                  >
                    Accept Candidate
                  </button>
                  <button 
                    onClick={() => alert(`Application archived.`)}
                    className="py-1.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 font-bold"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-base font-black text-zinc-900 dark:text-white mb-4">Post Club Announcement</h3>
          <form onSubmit={handlePostAnnouncement} className="flex flex-col gap-3 text-xs">
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Title</label>
              <input
                required
                type="text"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. Next Weekly Jam in Amphitheatre"
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Content</label>
              <textarea
                required
                rows={3}
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Details of the announcement..."
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="py-3 rounded-xl sw-gradient-bg text-white font-bold"
            >
              Broadcast Notice
            </button>
          </form>
        </div>
      )}

      {/* Create Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
            <button
              onClick={() => setShowNewEventModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white mb-4">New Campus Event</h3>
            <form onSubmit={handleCreateEvent} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-bold block mb-1 text-zinc-700 dark:text-zinc-300">Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Robot Wars 2026"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1 text-zinc-700 dark:text-zinc-300">Date & Venue</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-xs"
                  />
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Venue"
                    className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1 text-zinc-700 dark:text-zinc-300">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What can attendees look forward to?"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-xs"
                />
              </div>
              <button
                type="submit"
                className="py-3 rounded-xl sw-gradient-bg text-white font-bold"
              >
                Publish Event Live
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
