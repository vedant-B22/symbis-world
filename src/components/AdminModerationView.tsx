import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminModerationView: React.FC = () => {
  const { 
    reports, 
    resolveReport, 
    posts, 
    deletePost, 
    events, 
    clubs, 
    blockUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reports' | 'stats' | 'guidelines'>('reports');

  return (
    <div className="w-full pb-16">
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-rose-900 via-pink-900 to-zinc-950 text-white shadow-xl mb-6">
        <div className="flex items-center gap-2 text-rose-300 text-xs font-black uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>SSPU Campus Safety & Moderation Hub</span>
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Super Admin Console</h1>
        <p className="text-xs text-zinc-300 max-w-xl">
          Review community reports, enforce zero-tolerance harassment policies, approve clubs, and maintain a safe campus space.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('reports')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'reports' ? 'bg-rose-600 text-white shadow' : 'bg-white dark:bg-zinc-900 text-zinc-600'}`}
        >
          Reports Queue ({reports.filter(r => r.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'stats' ? 'bg-rose-600 text-white shadow' : 'bg-white dark:bg-zinc-900 text-zinc-600'}`}
        >
          Campus Safety Analytics
        </button>
        <button
          onClick={() => setActiveTab('guidelines')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'guidelines' ? 'bg-rose-600 text-white shadow' : 'bg-white dark:bg-zinc-900 text-zinc-600'}`}
        >
          Community Guidelines & DPDP
        </button>
      </div>

      {/* Reports Queue */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-xs">
              No open reports. Campus feed is safe and healthy!
            </div>
          ) : (
            reports.map(report => (
              <div
                key={report.id}
                className="p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold uppercase text-[10px]">
                    Flagged: {report.targetType} ({report.reason})
                  </span>
                  <span className="text-zinc-400">{report.timestamp}</span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-3">
                  "{report.targetPreview}"
                </div>

                <div className="text-xs text-zinc-500 mb-4">
                  Reported by: <span className="font-bold text-zinc-800 dark:text-zinc-200">@{report.reporterUsername}</span> • Status: <span className="capitalize font-semibold">{report.status}</span>
                </div>

                {report.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        resolveReport(report.id, 'resolved');
                        if (report.targetType === 'post') {
                          deletePost(report.targetId);
                        }
                        alert('Violation confirmed. Content removed.');
                      }}
                      className="py-2 px-3.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                    >
                      Remove Content & Warn
                    </button>
                    <button
                      onClick={() => resolveReport(report.id, 'dismissed')}
                      className="py-2 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold"
                    >
                      Dismiss Report
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-zinc-400 text-xs uppercase font-bold mb-1">Total Campus Posts</div>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{posts.length}</div>
            <div className="text-[11px] text-zinc-400 mt-1">100% Student Verified</div>
          </div>
          <div className="p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-zinc-400 text-xs uppercase font-bold mb-1">Active Clubs</div>
            <div className="text-2xl font-black text-cyan-500">{clubs.length}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Across Tech, Dance, Music</div>
          </div>
          <div className="p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-zinc-400 text-xs uppercase font-bold mb-1">Total Event Registrations</div>
            <div className="text-2xl font-black text-pink-500">
              {events.reduce((acc, curr) => acc + curr.rsvpCount, 0)}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">QR Passes issued</div>
          </div>
        </div>
      )}

      {/* Guidelines & Legal */}
      {activeTab === 'guidelines' && (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 space-y-4 leading-relaxed">
          <h3 className="text-base font-black text-zinc-900 dark:text-white">Community Standards & Safety Policy</h3>
          <p>
            Symbi's World is maintained by and for students of SSPU Pune. We enforce strict policies against cyberbullying, harassment, hate speech, unauthorized filming, and spam.
          </p>
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
            <div className="font-bold text-zinc-900 dark:text-white mb-1">India DPDP Act 2023 & Student Privacy Notice</div>
            <div>
              1. Institutional email verification ensures no anonymous predators.<br/>
              2. Minimum personal data collection; no continuous background geolocation tracking.<br/>
              3. Students hold irrevocable rights to download all their content and delete accounts upon graduation.<br/>
              4. Grievance Officer Contact: <span className="font-mono text-purple-600">grievance@sspu-sw.club</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
