import { mockAdminSchools, type AdminPlanTier } from './adminPlatform.mock';

// —— F4 Billing ——

export type BillingRow = {
  schoolId: string;
  schoolName: string;
  plan: AdminPlanTier;
  studentCount: number;
  seatLimit: number;
  mrrPkr: number;
  nextInvoiceDate: string;
  paymentStatus: 'paid' | 'due' | 'overdue';
  overSeat: boolean;
};

export const mockBillingRows: BillingRow[] = mockAdminSchools.map(s => ({
  schoolId: s.id,
  schoolName: s.name,
  plan: s.plan,
  studentCount: s.studentCount,
  seatLimit: s.seatLimit,
  mrrPkr:
    s.plan === 'starter' ? 15000 : s.plan === 'growth' ? 35000 : 85000,
  nextInvoiceDate: 'Jun 1, 2026',
  paymentStatus:
    s.status === 'suspended'
      ? 'overdue'
      : s.studentCount > s.seatLimit * 0.95
        ? 'due'
        : 'paid',
  overSeat: s.studentCount >= s.seatLimit,
}));

// —— F5 User search ——

export type PlatformUserRole =
  | 'student'
  | 'parent'
  | 'teacher'
  | 'principal'
  | 'school_admin'
  | 'platform_admin';

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: PlatformUserRole;
  schoolName: string | null;
  schoolSlug: string | null;
  lastActive: string;
  status: 'active' | 'suspended';
};

export const mockPlatformUsers: PlatformUser[] = [
  {
    id: 'u-1',
    name: 'Ayesha Khan',
    email: 'ayesha.k@greenvalley.edu.pk',
    phone: '+92 300 1112233',
    role: 'teacher',
    schoolName: 'Green Valley International School',
    schoolSlug: 'green-valley',
    lastActive: '2 hours ago',
    status: 'active',
  },
  {
    id: 'u-2',
    name: 'Hassan Ali',
    email: 'hassan.parent@gmail.com',
    phone: '+92 321 4455667',
    role: 'parent',
    schoolName: 'Sunrise Academy',
    schoolSlug: 'sunrise-academy',
    lastActive: 'Yesterday',
    status: 'active',
  },
  {
    id: 'u-3',
    name: 'Fatima Noor',
    email: 'fatima.n@student.pk',
    phone: '+92 333 9988776',
    role: 'student',
    schoolName: 'City Model School',
    schoolSlug: 'city-model',
    lastActive: '5 min ago',
    status: 'active',
  },
  {
    id: 'u-4',
    name: 'Dr. Imran Shah',
    email: 'principal@al-noor.edu.pk',
    phone: '+92 300 5544332',
    role: 'principal',
    schoolName: 'Al-Noor High School',
    schoolSlug: 'al-noor',
    lastActive: '3 days ago',
    status: 'active',
  },
  {
    id: 'u-5',
    name: 'Sara Malik',
    email: 'admin@edustation.pk',
    phone: '+92 300 0000001',
    role: 'platform_admin',
    schoolName: null,
    schoolSlug: null,
    lastActive: 'Just now',
    status: 'active',
  },
  {
    id: 'u-6',
    name: 'Omar Raza',
    email: 'omar@beaconhouse.edu.pk',
    phone: '+92 345 1122334',
    role: 'school_admin',
    schoolName: 'Beacon House Campus',
    schoolSlug: 'beacon-house',
    lastActive: 'Jan 2026',
    status: 'suspended',
  },
];

export function searchPlatformUsers(query: string): PlatformUser[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return mockPlatformUsers;
  }
  return mockPlatformUsers.filter(
    u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      u.id.toLowerCase().includes(q) ||
      (u.schoolName?.toLowerCase().includes(q) ?? false),
  );
}

export function getPlatformUserById(id: string): PlatformUser | undefined {
  return mockPlatformUsers.find(u => u.id === id);
}

// —— F6 / F7 Videos ——

export type VideoReviewStatus = 'pending' | 'approved' | 'rejected';

export type PlatformVideo = {
  id: string;
  title: string;
  teacherName: string;
  schoolName: string;
  subject: string;
  topic: string;
  durationSec: number;
  status: VideoReviewStatus;
  submittedAt: string;
  reviewedAt?: string;
  rejectReason?: string;
  description: string;
  videoUrl: string;
};

export const mockPlatformVideos: PlatformVideo[] = [
  {
    id: 'vid-1',
    title: 'Quadratic equations — factoring',
    teacherName: 'Ayesha Khan',
    schoolName: 'Green Valley International',
    subject: 'Mathematics',
    topic: 'Algebra',
    durationSec: 842,
    status: 'pending',
    submittedAt: 'May 22, 2026',
    description: 'Grade 10 lesson covering factorisation methods.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    id: 'vid-2',
    title: 'Photosynthesis overview',
    teacherName: 'Bilal Ahmed',
    schoolName: 'Sunrise Academy',
    subject: 'Biology',
    topic: 'Plant science',
    durationSec: 620,
    status: 'pending',
    submittedAt: 'May 21, 2026',
    description: 'Introductory lab prep video for Class 9.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'vid-3',
    title: 'Urdu grammar: مفعول بہ',
    teacherName: 'Sadia Hussain',
    schoolName: 'Al-Noor High School',
    subject: 'Urdu',
    topic: 'Grammar',
    durationSec: 540,
    status: 'approved',
    submittedAt: 'May 18, 2026',
    reviewedAt: 'May 19, 2026',
    description: 'Short revision clip for board exam prep.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 'vid-4',
    title: 'Projectile motion demo',
    teacherName: 'Kamran Siddiqui',
    schoolName: 'City Model School',
    subject: 'Physics',
    topic: 'Mechanics',
    durationSec: 410,
    status: 'rejected',
    submittedAt: 'May 15, 2026',
    reviewedAt: 'May 16, 2026',
    rejectReason: 'Audio quality too low; re-record required.',
    description: 'Lab demonstration with tennis ball launcher.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 'vid-5',
    title: 'Islamiyat — Surah Al-Fatiha tafsir',
    teacherName: 'Hafiz Usman',
    schoolName: 'Green Valley International',
    subject: 'Islamiyat',
    topic: 'Quranic studies',
    durationSec: 1200,
    status: 'pending',
    submittedAt: 'May 23, 2026',
    description: 'Week 4 sermon-style explanation for seniors.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
];

export function getPlatformVideoById(id: string): PlatformVideo | undefined {
  return mockPlatformVideos.find(v => v.id === id);
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// —— F8 Vetted teachers ——

export type VettedTeacher = {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  verified: boolean;
  schoolsServed: number;
  rating: number;
  bio: string;
  joinedAt: string;
};

export const mockVettedTeachers: VettedTeacher[] = [
  {
    id: 'vt-1',
    name: 'Ayesha Khan',
    email: 'ayesha.k@edustation.vetted',
    subjects: ['Mathematics', 'Physics'],
    verified: true,
    schoolsServed: 12,
    rating: 4.9,
    bio: '10+ years teaching O/A Levels mathematics in Lahore.',
    joinedAt: 'Sep 2024',
  },
  {
    id: 'vt-2',
    name: 'Bilal Ahmed',
    email: 'bilal.a@edustation.vetted',
    subjects: ['Biology', 'Chemistry'],
    verified: true,
    schoolsServed: 8,
    rating: 4.7,
    bio: 'Former lab coordinator; specialises in practical demos.',
    joinedAt: 'Nov 2024',
  },
  {
    id: 'vt-3',
    name: 'Sadia Hussain',
    email: 'sadia.h@edustation.vetted',
    subjects: ['Urdu', 'Pakistan Studies'],
    verified: true,
    schoolsServed: 15,
    rating: 4.8,
    bio: 'Curriculum writer for Sindh board Urdu textbooks.',
    joinedAt: 'Jan 2025',
  },
  {
    id: 'vt-4',
    name: 'Kamran Siddiqui',
    email: 'kamran.s@edustation.vetted',
    subjects: ['Physics'],
    verified: false,
    schoolsServed: 2,
    rating: 4.2,
    bio: 'Pending background check; trial period.',
    joinedAt: 'May 2026',
  },
];

export function getVettedTeacherById(id: string): VettedTeacher | undefined {
  return mockVettedTeachers.find(t => t.id === id);
}

// —— F9 Topic taxonomy ——

export type TaxonomyTopic = {
  id: string;
  name: string;
  videoCount: number;
};

export type TaxonomySubject = {
  id: string;
  name: string;
  topics: TaxonomyTopic[];
};

export const mockTaxonomy: TaxonomySubject[] = [
  {
    id: 'sub-math',
    name: 'Mathematics',
    topics: [
      { id: 't-alg', name: 'Algebra', videoCount: 42 },
      { id: 't-geo', name: 'Geometry', videoCount: 28 },
      { id: 't-calc', name: 'Calculus', videoCount: 19 },
    ],
  },
  {
    id: 'sub-phy',
    name: 'Physics',
    topics: [
      { id: 't-mech', name: 'Mechanics', videoCount: 35 },
      { id: 't-elec', name: 'Electricity', videoCount: 22 },
    ],
  },
  {
    id: 'sub-bio',
    name: 'Biology',
    topics: [
      { id: 't-cell', name: 'Cell biology', videoCount: 18 },
      { id: 't-plant', name: 'Plant science', videoCount: 24 },
    ],
  },
  {
    id: 'sub-urdu',
    name: 'Urdu',
    topics: [
      { id: 't-gram', name: 'Grammar', videoCount: 31 },
      { id: 't-lit', name: 'Literature', videoCount: 27 },
    ],
  },
  {
    id: 'sub-isl',
    name: 'Islamiyat',
    topics: [
      { id: 't-quran', name: 'Quranic studies', videoCount: 40 },
      { id: 't-hadith', name: 'Hadith', videoCount: 15 },
    ],
  },
];
