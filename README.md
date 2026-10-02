# 🚀 Symbi's World (SW) — Campus Social App for SSPU Pune

> **Student-built • Unofficial Platform**  
> Tailored specifically for **Symbiosis Skills and Professional University (SSPU), Pune**. Built for everything in student life *except* academics: fests, events, sports tournaments, clubs & societies, student culture, and extracurriculars.

---

## 🌟 Tech Stack Choices & Design Philosophy

| Layer | Choice | Why Chosen |
|---|---|---|
| **Frontend Framework** | **React 19 + TypeScript + Vite** | Blazing fast build & HMR times, type-safe domain models, zero-overhead developer experience. |
| **Styling & Theme** | **Tailwind CSS v4 + PostCSS** | Modern utility-first CSS engine with glassmorphic backdrop filters, custom color variables, and fluid responsive design. |
| **Motion & Micro-interactions** | **Framer Motion + Canvas Confetti** | 60fps spring transitions, double-tap heart explosions, swipe stories modal, and celebratory feedback on RSVP/Voting. |
| **PWA Capabilities** | **Web App Manifest + Service Worker (`sw.js`)** | Fully installable to home screen (iOS & Android standalone experience), offline app shell caching, viewport safe-area handling. |
| **QR Code & Calendaring** | **`qrcode.react` + RFC 5545 iCalendar (`.ics`)** | Digital verification passes for club gate check-ins, one-click calendar exports for events. |
| **Architecture & State Layer** | **Unified React Context + Reactive LocalStorage Engine** | Clean, swappable data layer with persistent storage and role dispatching. Completely decoupled for drop-in migration to Supabase/PostgreSQL. |

---

## 💎 Features Built & Implemented

### 1. 🔐 Auth, Roles & Institutional Verification
- **Institutional Email Guard**: Restricted to SSPU domain (`@sspu.ac.in`).
- **Onboarding Modal**: 3-step setup to pick academic program, graduation year, school (e.g. *School of CS & IT*, *School of Architecture*), and campus interests.
- **Instant Role Switcher**: Test the app as **Student**, **Club Admin**, or **Super Admin** directly from the sidebar.

### 2. 📱 Instagram-Familiar Feed & Stories
- **Stories Bar**: 24h expiration, distinct cyan-blue gradient rings for official clubs and amber-pink rings for students.
- **Interactive Story Viewer**: Fullscreen viewer with tap navigation, progress bars, pause-on-hold, heart reactions, and **live interactive campus polls**.
- **Feed**:
  - Image and multi-slide carousels.
  - **Double-tap heart burst** animation with celebratory particle confetti.
  - Interactive like, comment, and bookmark state.
  - Tagged clubs & events directly deep-linkable from post cards.

### 3. 📸 Instagram Linking (Ethical & TOS Compliant)
- Paste any Instagram Post or Reel URL when creating a post.
- Renders as a dedicated **"Linked from Instagram"** badge card with handle preview and a direct link to open in Instagram.
- Profile includes a **"View on Instagram"** badge linking the student's handle.

### 4. 🎪 Events Hub (The Hero Feature)
- Category filters: *All, Fests & Galas, Tech & Hackathons, Cultural & Music, Sports, Workshops, Social*.
- Full Event Detail modal: Date/time, venue, organizing club, attendee count, rules, and schedule.
- **One-Click Free RSVP**: Instantly issues a digital ticket with a **scannable QR code** (e.g., `SSPU-PULSE-9842`).
- **Add to Calendar**: Exports native `.ics` calendar file for Apple Calendar, Google Calendar, and Outlook.

### 5. 👥 Clubs & Societies Directory
- 12 authentic campus clubs pre-loaded (*ByteCraft Tech*, *Taal & Rhythm Dance*, *Dhwani Music*, *Aperture Photo*, *SSPU Knights Sports*, *E-Cell Apex*, *Rangmanch Nukkad*, *Nexus Esports*, etc.).
- Club profile views with leads, upcoming events, and official club noticeboards.
- **"Recruitment Open" Badges & In-App Application Modal**: Students apply directly with their portfolio and reasons; club admins receive and review them.

### 6. 🏆 Campus Sports Arena
- Live and upcoming matches across Football, Cricket, Basketball, and Badminton.
- Live score updates and venue guides.
- **Annual Inter-School Sports Championship Table**: Tracks played, won, lost, gold medals, and department points.

### 7. 🧭 Explore, Weekend Digest & Lost and Found
- Search across students, clubs, events, and hashtags.
- Instagram-style 3-column discovery grid.
- **Campus "What's happening this weekend" Digest**.
- **Interactive Lost & Found Board**: Post misplaced ID cards and items; mark as resolved.

### 8. 🛡️ Moderation, Safety & DPDP Compliance
- **Report Modal**: Available on every post with harassment, spam, and inappropriate behavior categories.
- **Block and Mute** controls on profiles and posts.
- **Super Admin Console**: Manage report queue, review content previews, and remove violating posts.
- **India Digital Personal Data Protection (DPDP) Act 2023 Controls**:
  - Public/Private profile toggle.
  - Hide events attended toggle.
  - **"Download My Data"** JSON export feature.
  - Account deletion request channel.

### 9. 💼 Club Admin Operations
- Create new events published live to the Events Hub.
- **Export Attendees CSV**: One-click download of student registration rosters for event check-in gates.
- Review club recruitment applications and post official notices.

---

## 🏃 Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Production build
npm run build
```

Open your browser at `http://localhost:5173`.

---

## 🔄 Backend Migration Roadmap

The prototype is engineered with a clean, decoupled data architecture in `src/context/AppContext.tsx` and domain models in `src/types/index.ts`. To connect a real backend:
1. **Database**: Swap `localStorage` with a PostgreSQL schema (Supabase / Prisma).
2. **Authentication**: Use Supabase Auth with Google OAuth restricted to domain `hd: sspu.ac.in`.
3. **Storage**: Store user-uploaded photos in Cloudflare R2 or AWS S3 buckets.
4. **Realtime**: Connect Supabase Realtime or WebSockets to stream live sports scores and comments.
