import { User, Club, EventItem, Post, StoryGroup, SportsFixture, SportsStanding, LostAndFoundItem, NotificationItem, ReportItem } from '../types';

export const INITIAL_CLUBS: Club[] = [
  {
    id: 'club-gdg',
    name: 'ByteCraft Tech Club',
    handle: '@bytecraft_sspu',
    category: 'Tech & Innovation',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    description: 'The premier student developer and design ecosystem at SSPU Pune. We build open-source projects, organize 36h hackathons, and host weekly tech jams.',
    membersCount: 428,
    isFollowed: true,
    isMember: false,
    recruitmentOpen: true,
    recruitmentRole: 'Fullstack Devs, AI Leads & UI Designers',
    recruitmentDeadline: 'Oct 20, 2026',
    contactEmail: 'tech@sspu-sw.club',
    instagramHandle: 'bytecraft.sspu',
    leads: [
      { name: 'Aarav Mehta', role: 'President', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      { name: 'Tanvi Shinde', role: 'Tech Lead', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' }
    ],
    announcements: [
      { id: 'ann-1', title: 'HackSprint 2026 Registrations Open!', date: 'Yesterday', content: 'SSPU’s biggest internal hackathon with cash prizes over ₹1,50,000! Check the Events tab.' }
    ]
  },
  {
    id: 'club-rhythm',
    name: 'Taal & Rhythm Dance Crew',
    handle: '@taal_rhythm_sspu',
    category: 'Cultural & Arts',
    logoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    description: 'Western, Hip-Hop, Bollywood & Classical dance society representing SSPU at Mood Indigo, Malhar, and national fests.',
    membersCount: 312,
    isFollowed: true,
    isMember: true,
    recruitmentOpen: true,
    recruitmentRole: 'Freestyle Dancers & Choreographers',
    recruitmentDeadline: 'Oct 15, 2026',
    contactEmail: 'dance@sspu-sw.club',
    instagramHandle: 'taalrhythm.sspu',
    leads: [
      { name: 'Rohan Deshmukh', role: 'Captain', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
    ],
    announcements: [
      { id: 'ann-2', title: 'Auditions in Central Amphitheatre', date: '2 days ago', content: 'Prepare 90-sec solo track. Spot entries allowed!' }
    ]
  },
  {
    id: 'club-dhwani',
    name: 'Dhwani Music Society',
    handle: '@dhwani_music',
    category: 'Cultural & Arts',
    logoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80',
    description: 'Acoustic jams, campus rock band, Indian classical orchestra, and sunset unplugged sessions on the library lawns.',
    membersCount: 290,
    isFollowed: false,
    recruitmentOpen: false,
    contactEmail: 'dhwani@sspu-sw.club',
    instagramHandle: 'dhwani.music.sspu',
    leads: [
      { name: 'Kavya Sharma', role: 'Lead Vocalist', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }
    ],
    announcements: []
  },
  {
    id: 'club-shutters',
    name: 'Aperture Shutterbugs (Photo & Film)',
    handle: '@aperture_sspu',
    category: 'Media & Design',
    logoUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&auto=format&fit=crop&q=80',
    description: 'Capturing memories of SSPU since 2017. Official media crew for campus fests, photo walks across Pune, and short film shoots.',
    membersCount: 245,
    isFollowed: true,
    recruitmentOpen: true,
    recruitmentRole: 'Cinematographers & Drone Pilots',
    recruitmentDeadline: 'Oct 25, 2026',
    contactEmail: 'aperture@sspu-sw.club',
    instagramHandle: 'aperture.sspu',
    leads: [
      { name: 'Kabir Verma', role: 'Head of Media', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
    ],
    announcements: []
  },
  {
    id: 'club-ecell',
    name: 'E-Cell Apex (Entrepreneurship)',
    handle: '@ecell_apex',
    category: 'Tech & Innovation',
    logoUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80',
    description: 'Empowering student startups with seed capital, mentor networks, and pitch competitions. Over 14 startups incubated!',
    membersCount: 380,
    isFollowed: false,
    recruitmentOpen: true,
    recruitmentRole: 'PR & Corporate Relations Lead',
    recruitmentDeadline: 'Oct 18, 2026',
    contactEmail: 'ecell@sspu-sw.club',
    instagramHandle: 'ecell.sspu',
    leads: [
      { name: 'Devika Patel', role: 'President', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    announcements: []
  },
  {
    id: 'club-sports',
    name: 'SSPU Knights Athletics & Sports Club',
    handle: '@sspu_knights',
    category: 'Sports & Fitness',
    logoUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1200&auto=format&fit=crop&q=80',
    description: 'Home of campus leagues in Football, Cricket, Badminton, Volleyball, and Athletics. Champions of West Zone Inter-Uni 2025!',
    membersCount: 520,
    isFollowed: true,
    recruitmentOpen: true,
    recruitmentRole: 'Team Captains & Event Coordinators',
    recruitmentDeadline: 'Oct 30, 2026',
    contactEmail: 'sports@sspu-sw.club',
    instagramHandle: 'sspu.knights',
    leads: [
      { name: 'Vikram Rajput', role: 'Sports Secretary', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80' }
    ],
    announcements: []
  },
  {
    id: 'club-nukkad',
    name: 'Rangmanch Nukkad & Dramatics',
    handle: '@rangmanch_sspu',
    category: 'Cultural & Arts',
    logoUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&auto=format&fit=crop&q=80',
    description: 'Street plays, stage plays, mono-acts, and scripting hard-hitting socially conscious campus stories.',
    membersCount: 195,
    isFollowed: false,
    recruitmentOpen: false,
    contactEmail: 'rangmanch@sspu-sw.club',
    instagramHandle: 'rangmanch.sspu',
    leads: [],
    announcements: []
  },
  {
    id: 'club-mun',
    name: 'SSPU Model United Nations & Debate Society',
    handle: '@sspu_mun',
    category: 'Debate & Literary',
    logoUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
    description: 'Fostering diplomatic discussion, parliamentary debates, youth parliament, and public speaking excellence.',
    membersCount: 210,
    isFollowed: false,
    recruitmentOpen: true,
    recruitmentRole: 'Committee Delegates & Secretariat',
    recruitmentDeadline: 'Nov 05, 2026',
    contactEmail: 'mun@sspu-sw.club',
    instagramHandle: 'mun.sspu',
    leads: [],
    announcements: []
  },
  {
    id: 'club-gaming',
    name: 'Nexus Gaming & Esports Syndicate',
    handle: '@nexus_esports_sspu',
    category: 'Tech & Innovation',
    logoUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    description: 'Valorant, BGMI, FIFA, Rocket League campus tourneys with live caster streams and LAN parties.',
    membersCount: 460,
    isFollowed: true,
    recruitmentOpen: true,
    recruitmentRole: 'Stream Casters & Tournament Admins',
    recruitmentDeadline: 'Oct 22, 2026',
    contactEmail: 'gaming@sspu-sw.club',
    instagramHandle: 'nexus.sspu',
    leads: [],
    announcements: []
  },
  {
    id: 'club-rotaract',
    name: 'Rotaract Youth Club SSPU',
    handle: '@rotaract_sspu',
    category: 'Social & Impact',
    logoUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?w=1200&auto=format&fit=crop&q=80',
    description: 'Blood donation drives, campus clean-ups, teaching under-served kids, animal welfare and tree plantations.',
    membersCount: 340,
    isFollowed: false,
    recruitmentOpen: true,
    recruitmentRole: 'Community Outreach Volunteers',
    recruitmentDeadline: 'Oct 30, 2026',
    contactEmail: 'rotaract@sspu-sw.club',
    instagramHandle: 'rotaract.sspu',
    leads: [],
    announcements: []
  },
  {
    id: 'club-literary',
    name: 'The Quill Society (Literary & Poetry)',
    handle: '@thequill_sspu',
    category: 'Debate & Literary',
    logoUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80',
    description: 'Open mic poetry nights, creative writing circles, book swaps, and annual campus literary zine publications.',
    membersCount: 165,
    isFollowed: false,
    recruitmentOpen: false,
    contactEmail: 'quill@sspu-sw.club',
    instagramHandle: 'thequill.sspu',
    leads: [],
    announcements: []
  },
  {
    id: 'club-design',
    name: 'Pixel & Vector Design Guild',
    handle: '@pixelvector_sspu',
    category: 'Media & Design',
    logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    description: '3D modeling, typography, motion graphics, poster design for campus events, and creative critique sessions.',
    membersCount: 220,
    isFollowed: false,
    recruitmentOpen: true,
    recruitmentRole: 'Motion Designers & Blender Artists',
    recruitmentDeadline: 'Nov 01, 2026',
    contactEmail: 'design@sspu-sw.club',
    instagramHandle: 'pixelvector.sspu',
    leads: [],
    announcements: []
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Pulse 2026: The Annual Cultural Fest',
    subtitle: '3 Days of Music, Dance, Fashion & Star Nights',
    posterUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-rhythm',
    clubName: 'Taal & Rhythm Dance Crew',
    clubLogo: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=80',
    category: 'fest',
    date: '2026-10-24',
    startTime: '4:00 PM',
    endTime: '10:30 PM',
    venue: 'Main Campus Grounds & Amphitheatre',
    description: 'The biggest spectacle on the SSPU Pune calendar! Featuring 20+ university dance crews, celebrity DJ performance on day 3, battle of the bands, fashion walkway, food street with 40+ stalls, and laser show.',
    rsvpCount: 1480,
    capacity: 2500,
    isRegistered: true,
    registrationTicketId: 'SSPU-PULSE-9842',
    isTrending: true,
    isFeatured: true,
    rules: [
      'SSPU Student ID mandatory at entry gates.',
      'No bags larger than A4 size permitted.',
      'Gates close strictly at 6:30 PM for safety protocols.'
    ],
    scheduleHighlights: [
      'Day 1 (4 PM): Inauguration & Battle of Bands',
      'Day 2 (5 PM): Western Group Dance & Fashion Walk',
      'Day 3 (6 PM): EDM Star Night & DJ Showcase'
    ]
  },
  {
    id: 'ev-2',
    title: 'HackSprint 36-Hour Hackathon',
    subtitle: 'Build with AI, Web3 & Cloud — Win ₹1.5L',
    posterUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-gdg',
    clubName: 'ByteCraft Tech Club',
    clubLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    category: 'tech',
    date: '2026-10-18',
    startTime: '9:00 AM',
    endTime: '9:00 PM (Next Day)',
    venue: 'Incubation Centre & CS Labs 4 & 5',
    description: 'Assemble your team of 2-4 and build production-ready solutions for real campus and societal problems. Free red bull, midnight pizza, mentor clinic with senior engineers, and internship sponsor tracks.',
    rsvpCount: 320,
    capacity: 400,
    isRegistered: false,
    isTrending: true,
    rules: [
      'Teams of 2 to 4 members. Cross-department allowed.',
      'All code must be written during the 36h sprint.'
    ]
  },
  {
    id: 'ev-3',
    title: 'Sunsets & Acoustic Unplugged',
    subtitle: 'Chill indie songs under the campus golden hour',
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-dhwani',
    clubName: 'Dhwani Music Society',
    clubLogo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    category: 'cultural',
    date: '2026-10-08',
    startTime: '5:30 PM',
    endTime: '7:45 PM',
    venue: 'Library Central Lawns',
    description: 'Grab a mat, a cup of chai from canteen, and join us for relaxed acoustic covers of Prateek Kuhad, Anuv Jain, and Coldplay as the sun sets over the Kiwale hills.',
    rsvpCount: 260,
    isRegistered: true,
    registrationTicketId: 'SSPU-DHWA-4112',
    isTrending: true
  },
  {
    id: 'ev-4',
    title: 'Inter-School Football Champions Trophy',
    subtitle: 'CS vs Architecture Quarter-Finals',
    posterUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-sports',
    clubName: 'SSPU Knights Athletics',
    clubLogo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&auto=format&fit=crop&q=80',
    category: 'sports',
    date: '2026-10-10',
    startTime: '4:30 PM',
    endTime: '6:30 PM',
    venue: 'Main Sports Complex Football Ground',
    description: 'High stakes match under the floodlights. Come cheer for your school in their journey to the trophy! Refreshments available.',
    rsvpCount: 410,
    isRegistered: false
  },
  {
    id: 'ev-5',
    title: 'UI/UX Masterclass: Designing with AI',
    subtitle: 'Figma to Code with Antigravity & LLMs',
    posterUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-design',
    clubName: 'Pixel & Vector Design Guild',
    clubLogo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80',
    category: 'workshop',
    date: '2026-10-14',
    startTime: '2:00 PM',
    endTime: '4:30 PM',
    venue: 'Design Studio Lab 102',
    description: 'Hands-on sprint where you will learn auto-layout, design tokens, micro-interactions, and how to export production code with cutting-edge AI pipelines.',
    rsvpCount: 145,
    capacity: 150,
    isRegistered: false
  },
  {
    id: 'ev-6',
    title: 'Campfire Open Mic: Stories & Spoken Word',
    subtitle: 'Heart-to-heart poetry & stand-up confessions',
    posterUrl: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-literary',
    clubName: 'The Quill Society',
    clubLogo: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&auto=format&fit=crop&q=80',
    category: 'social',
    date: '2026-10-16',
    startTime: '6:30 PM',
    endTime: '9:00 PM',
    venue: 'Campus OAT (Open Air Theatre)',
    description: 'Safe space to express your raw thoughts, hostel nostalgia, and comedy sets. Hot chocolate will be served!',
    rsvpCount: 195,
    isRegistered: false
  },
  {
    id: 'ev-7',
    title: 'Valorant Campus Showdown LAN',
    subtitle: '5v5 Tournament — ₹25,000 Prize Pool',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-gaming',
    clubName: 'Nexus Gaming & Esports',
    clubLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80',
    category: 'tech',
    date: '2026-10-22',
    startTime: '10:00 AM',
    endTime: '7:00 PM',
    venue: 'High-Performance Computing Lab',
    description: 'Bring your gear! Low latency gigabit LAN match setup with big screen casting and shoutcasters in the seminar hall.',
    rsvpCount: 280,
    isRegistered: false
  },
  {
    id: 'ev-8',
    title: 'Nukkad Natak Street Play: "Awaaz"',
    subtitle: 'A hard hitting performance on mental wellness',
    posterUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1000&auto=format&fit=crop&q=80',
    clubId: 'club-nukkad',
    clubName: 'Rangmanch Nukkad',
    clubLogo: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=150&auto=format&fit=crop&q=80',
    category: 'cultural',
    date: '2026-10-12',
    startTime: '1:15 PM',
    endTime: '1:45 PM',
    venue: 'SSPU Central Fountain / Canteen Plaza',
    description: 'A 25-minute high energy dholak street play confronting exam anxiety, social pressures, and finding your voice.',
    rsvpCount: 380,
    isRegistered: false
  }
];

export const CURRENT_USER: User = {
  id: 'usr-sspu-01',
  name: 'Aryan Kulkarni',
  username: 'aryank_sspu',
  email: 'aryan.kulkarni@sspu.ac.in',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  role: 'student',
  school: 'School of Computer Science & IT',
  program: 'B.Tech CS (AI & ML)',
  year: '3rd Year',
  bio: 'Living on campus cold coffee & late-night hackathons ☕️⚡️ Tech lead @bytecraft_sspu | Photographer on weekends 📸 Pune',
  instagramHandle: 'aryan.k_pune',
  interests: ['Tech & Coding', 'Dance', 'Photography', 'Gaming', 'Football', 'Campus Life'],
  badges: ['HackSprint Finalist', 'Pulse 25 Core Volunteer', 'Campus Culture Star', 'Top Contributor'],
  followersCount: 384,
  followingCount: 295,
  eventsAttendedCount: 14,
  isPrivate: false,
  hideEventsAttended: false
};

export const INITIAL_STORIES: StoryGroup[] = [
  {
    id: 'sg-me',
    userId: 'usr-sspu-01',
    userName: 'Your Story',
    userUsername: 'aryank_sspu',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    isClub: false,
    hasUnseen: false,
    stories: [
      {
        id: 'st-0',
        mediaUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        duration: 5,
        timestamp: '3h ago',
        caption: 'Night coding session at the incubation hub 💻',
        poll: {
          question: 'Are you coming to HackSprint 2026?',
          options: [{ text: 'Hell yeah 🚀', votes: 84 }, { text: 'Need a team 👀', votes: 38 }],
          userVotedIndex: 0
        }
      }
    ]
  },
  {
    id: 'sg-taal',
    userId: 'club-rhythm',
    userName: 'Taal & Rhythm',
    userUsername: 'taal_rhythm_sspu',
    userAvatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=80',
    isClub: true,
    clubBadge: 'Club',
    hasUnseen: true,
    stories: [
      {
        id: 'st-1',
        mediaUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        duration: 5,
        timestamp: '1h ago',
        caption: 'Pulse 2026 rehearsals in full swing! Who is hyped? 🔥'
      },
      {
        id: 'st-2',
        mediaUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        duration: 5,
        timestamp: '45m ago',
        caption: 'Sneak peek at our hip-hop routine 👀',
        poll: {
          question: 'Excited for the Star Night DJ announcement?',
          options: [{ text: 'YESSSS 🔥', votes: 142 }, { text: 'Who is it? 😱', votes: 95 }]
        }
      }
    ]
  },
  {
    id: 'sg-bytecraft',
    userId: 'club-gdg',
    userName: 'ByteCraft Tech',
    userUsername: 'bytecraft_sspu',
    userAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    isClub: true,
    clubBadge: 'Club',
    hasUnseen: true,
    stories: [
      {
        id: 'st-3',
        mediaUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        duration: 5,
        timestamp: '2h ago',
        caption: 'Workshop slots filled in 12 mins! Adding 40 extra seats.'
      }
    ]
  },
  {
    id: 'sg-ananya',
    userId: 'usr-2',
    userName: 'Ananya Roy',
    userUsername: 'ananyaroy_sspu',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isClub: false,
    hasUnseen: true,
    stories: [
      {
        id: 'st-4',
        mediaUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        duration: 5,
        timestamp: '4h ago',
        caption: 'Sunset vibes at the basketball court 🌅'
      }
    ]
  },
  {
    id: 'sg-knights',
    userId: 'club-sports',
    userName: 'SSPU Knights',
    userUsername: 'sspu_knights',
    userAvatar: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&auto=format&fit=crop&q=80',
    isClub: true,
    clubBadge: 'Club',
    hasUnseen: true,
    stories: [
      {
        id: 'st-5',
        mediaUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        duration: 5,
        timestamp: '5h ago',
        caption: 'Match day this Saturday! CS vs Architecture ⚽️'
      }
    ]
  },
  {
    id: 'sg-devika',
    userId: 'usr-3',
    userName: 'Devika Patel',
    userUsername: 'devika_p',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isClub: false,
    hasUnseen: true,
    stories: [
      {
        id: 'st-6',
        mediaUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        duration: 5,
        timestamp: '6h ago',
        caption: 'Canteen Maggie never disappoints 🍜'
      }
    ]
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'club-rhythm',
    authorName: 'Taal & Rhythm Dance Crew',
    authorUsername: 'taal_rhythm_sspu',
    authorAvatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=80',
    isClubAuthor: true,
    clubId: 'club-rhythm',
    media: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1000&auto=format&fit=crop&q=80'
    ],
    mediaType: 'carousel',
    caption: 'Official audition teaser for Pulse 2026! 💥 When the beat drops, everything stops. Tag your squad who needs to audition this Thursday! Recruitment link in bio. #SSPU #Pulse2026 #DanceCrew #PuneCampus',
    location: 'Central Amphitheatre, SSPU Pune',
    taggedClub: { id: 'club-rhythm', name: 'Taal & Rhythm' },
    taggedEvent: { id: 'ev-1', title: 'Pulse 2026: The Annual Cultural Fest' },
    likesCount: 342,
    isLiked: true,
    savedCount: 58,
    isSaved: false,
    commentsCount: 28,
    createdAt: '2 hours ago',
    comments: [
      {
        id: 'c-1',
        userId: 'usr-sspu-01',
        userName: 'Aryan Kulkarni',
        userUsername: 'aryank_sspu',
        userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
        text: 'The choreo on slide 2 is insane 🔥🔥🔥 can’t wait for Pulse!',
        createdAt: '1h ago',
        likesCount: 12,
        isLiked: true
      },
      {
        id: 'c-2',
        userId: 'usr-2',
        userName: 'Ananya Roy',
        userUsername: 'ananyaroy_sspu',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Best crew in Pune hands down 👑',
        createdAt: '30m ago',
        likesCount: 5
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'usr-sspu-01',
    authorName: 'Aryan Kulkarni',
    authorUsername: 'aryank_sspu',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    media: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    caption: '3 AM at the incubation lab debugging WebSockets. The campus hits different when everyone else is asleep 🌃 Campus life peak experience.',
    location: 'SSPU Skill Tech Lab',
    taggedClub: { id: 'club-gdg', name: 'ByteCraft Tech Club' },
    likesCount: 189,
    isLiked: false,
    savedCount: 22,
    isSaved: true,
    commentsCount: 14,
    createdAt: '5 hours ago',
    comments: [
      {
        id: 'c-3',
        userId: 'usr-4',
        userName: 'Rohan Deshmukh',
        userUsername: 'rohand_sspu',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Bro go to sleep you have a 9 AM presentation tomorrow 😂',
        createdAt: '4h ago',
        likesCount: 9
      }
    ]
  },
  {
    id: 'post-ig-1',
    authorId: 'club-aperture',
    authorName: 'Aperture Shutterbugs',
    authorUsername: 'aperture_sspu',
    authorAvatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=80',
    isClubAuthor: true,
    clubId: 'club-shutters',
    media: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    caption: 'Sunset skies over the SSPU architecture dome tonight. Shot on Sony A7IV by our media lead @kabir_v. Check out the full reel on our Instagram! 🌄✨',
    location: 'Kiwale Campus, Pune',
    likesCount: 512,
    isLiked: true,
    savedCount: 94,
    isSaved: true,
    commentsCount: 31,
    createdAt: 'Yesterday',
    isInstagramLinked: true,
    instagramUrl: 'https://www.instagram.com/p/DB1234sspu_sunset',
    instagramAuthorHandle: 'aperture.sspu',
    comments: []
  },
  {
    id: 'post-3',
    authorId: 'club-sports',
    authorName: 'SSPU Knights Athletics',
    authorUsername: 'sspu_knights',
    authorAvatar: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&auto=format&fit=crop&q=80',
    isClubAuthor: true,
    clubId: 'club-sports',
    media: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    caption: 'FINAL WHISTLE! School of CS defeats Architecture 3-1 in an absolute thriller quarter final! Match MVP: @aarav_m with 2 goals ⚽️🏆',
    location: 'SSPU Sports Ground',
    taggedEvent: { id: 'ev-4', title: 'Inter-School Football Champions Trophy' },
    likesCount: 620,
    isLiked: false,
    savedCount: 45,
    isSaved: false,
    commentsCount: 42,
    createdAt: '1 day ago',
    comments: []
  },
  {
    id: 'post-ig-2',
    authorId: 'usr-2',
    authorName: 'Ananya Roy',
    authorUsername: 'ananyaroy_sspu',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    media: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    caption: 'Throwback to last year’s Dhwani acoustic night. If you haven’t sat with chai on the grass listening to the violin solo, have you even experienced SSPU? 🎻☕️',
    location: 'Central Lawns',
    likesCount: 298,
    isLiked: true,
    savedCount: 38,
    isSaved: false,
    commentsCount: 19,
    createdAt: '2 days ago',
    isInstagramLinked: true,
    instagramUrl: 'https://www.instagram.com/p/DB9876dhwani_jam',
    instagramAuthorHandle: 'ananyaroy.official',
    comments: []
  },
  {
    id: 'post-4',
    authorId: 'club-ecell',
    authorName: 'E-Cell Apex',
    authorUsername: 'ecell_apex',
    authorAvatar: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&auto=format&fit=crop&q=80',
    isClubAuthor: true,
    clubId: 'club-ecell',
    media: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80'
    ],
    mediaType: 'image',
    caption: 'Big announcement: SSPU alumni founders raised \$2.4M seed round for their climate tech venture! Proving skills build the future 🚀🌱 Applications for our incubation batch are now live.',
    location: 'Auditorium 1',
    likesCount: 450,
    isLiked: false,
    savedCount: 88,
    isSaved: false,
    commentsCount: 23,
    createdAt: '3 days ago',
    comments: []
  }
];

export const INITIAL_FIXTURES: SportsFixture[] = [
  {
    id: 'fix-1',
    sport: 'Football',
    tournamentName: 'SSPU Inter-School Cup 2026',
    teamA: { name: 'CS & IT Knights', score: '3', logo: '💻', school: 'School of CS & IT' },
    teamB: { name: 'Arch & Design Titans', score: '1', logo: '📐', school: 'School of Architecture' },
    status: 'completed',
    date: 'Oct 01, 2026',
    time: '4:30 PM',
    venue: 'Main Football Turf',
    winner: 'CS & IT Knights'
  },
  {
    id: 'fix-2',
    sport: 'Cricket',
    tournamentName: 'SSPU Premier League (T10)',
    teamA: { name: 'Management Mavericks', score: '84/3 (8.2)', logo: '📈', school: 'School of Management' },
    teamB: { name: 'Automobile Strikers', score: '98/6 (10.0)', logo: '🏎️', school: 'School of Automobile' },
    status: 'live',
    date: 'Today',
    time: '5:00 PM',
    venue: 'Cricket Oval',
    liveUpdates: 'Management needs 15 runs from 10 balls. Exciting finish brewing!'
  },
  {
    id: 'fix-3',
    sport: 'Basketball',
    tournamentName: 'Autumn Hoops Championship',
    teamA: { name: 'Beauty & Wellness Stars', logo: '💄', school: 'School of Beauty & Wellness' },
    teamB: { name: 'CS Cyber Ballers', logo: '⚡️', school: 'School of CS & IT' },
    status: 'upcoming',
    date: 'Tomorrow, Oct 03',
    time: '6:00 PM',
    venue: 'Indoor Sports Complex Court 1'
  },
  {
    id: 'fix-4',
    sport: 'Badminton',
    tournamentName: 'Inter-Collegiate Doubles',
    teamA: { name: 'Architecture Smashers', logo: '🏸', school: 'School of Architecture' },
    teamB: { name: 'Retail Raiders', logo: '🛍️', school: 'School of Retail' },
    status: 'upcoming',
    date: 'Oct 05, 2026',
    time: '3:00 PM',
    venue: 'Wooden Badminton Hall'
  }
];

export const INITIAL_STANDINGS: SportsStanding[] = [
  { school: 'School of CS & IT', played: 6, won: 5, lost: 1, points: 15, gold: 3, silver: 1, bronze: 0 },
  { school: 'School of Architecture & Design', played: 6, won: 4, lost: 2, points: 12, gold: 2, silver: 2, bronze: 1 },
  { school: 'School of Management', played: 5, won: 3, lost: 2, points: 9, gold: 1, silver: 1, bronze: 2 },
  { school: 'School of Automobile Engineering', played: 5, won: 2, lost: 3, points: 6, gold: 1, silver: 0, bronze: 1 },
  { school: 'School of Retail & Commerce', played: 4, won: 1, lost: 3, points: 3, gold: 0, silver: 1, bronze: 1 },
  { school: 'School of Beauty & Wellness', played: 4, won: 1, lost: 3, points: 3, gold: 0, silver: 0, bronze: 1 }
];

export const INITIAL_LOST_FOUND: LostAndFoundItem[] = [
  {
    id: 'lf-1',
    type: 'lost',
    title: 'Blue Sony WH-1000XM4 Headphones',
    description: 'Left on the 2nd floor library reading table near window around 4 PM.',
    locationFound: 'Central Library, 2nd Floor',
    date: 'Oct 02, 2026',
    contactUsername: 'aryank_sspu',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80',
    isResolved: false
  },
  {
    id: 'lf-2',
    type: 'found',
    title: 'SSPU ID Card (Name: Priya Sharma, B.Des)',
    description: 'Found on the canteen stairs after lunch break. Deposited at Security Desk or DM me.',
    locationFound: 'Canteen Stairs',
    date: 'Oct 01, 2026',
    contactUsername: 'rohand_sspu',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
    isResolved: false
  },
  {
    id: 'lf-3',
    type: 'found',
    title: 'Silver Apple Pencil (2nd Gen)',
    description: 'Found plugged into charger dock in Design Studio 104.',
    locationFound: 'Design Studio Lab',
    date: 'Sep 29, 2026',
    contactUsername: 'ananyaroy_sspu',
    isResolved: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'like',
    actorName: 'Ananya Roy',
    actorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    actorUsername: 'ananyaroy_sspu',
    content: 'liked your post from the incubation lab.',
    timeAgo: '15m ago',
    read: false,
    targetThumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif-2',
    type: 'event_reminder',
    actorName: 'Pulse 2026 Fest',
    actorAvatar: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&auto=format&fit=crop&q=80',
    actorUsername: 'taal_rhythm_sspu',
    content: 'Pulse 2026 is approaching! You have an active VIP QR Pass.',
    timeAgo: '2h ago',
    read: false
  },
  {
    id: 'notif-3',
    type: 'club_opening',
    actorName: 'ByteCraft Tech Club',
    actorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    actorUsername: 'bytecraft_sspu',
    content: 'opened recruitment for Core Developers & UI Designers.',
    timeAgo: '4h ago',
    read: true
  },
  {
    id: 'notif-4',
    type: 'follow',
    actorName: 'Rohan Deshmukh',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    actorUsername: 'rohand_sspu',
    content: 'started following you.',
    timeAgo: '1d ago',
    read: true
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    targetType: 'post',
    targetId: 'post-test',
    targetPreview: 'Spam promotional link posted in comments',
    reporterUsername: 'tanvi_s',
    reason: 'spam',
    details: 'Repeated non-campus promotional links',
    timestamp: '2026-10-02 14:20',
    status: 'pending'
  }
];
