import {
  getSchoolAttendanceReport,
  getSchoolHomeworkReport,
} from '@/mocks/analytics/schoolAnalytics.mock';
import type { AnalyticsFilters } from '@/lib/analytics/types';
import {
  mockHomeworkCompletion,
  mockEngagementByClass,
  mockPrincipalTickets,
  mockClassLeaderboard,
  mockRecentAnnouncements,
  type LeaderboardEntry,
  type PrincipalLeaderboardScope,
} from '@/mocks/principal.mock';

export type { PrincipalLeaderboardScope };
import { mockFieldVisits } from '@/mocks/adminF10F17.mock';

const defaultFilters: AnalyticsFilters = { preset: '30d' };

// —— H11 Class health ——

export type ClassHealthRow = {
  id: string;
  classSection: string;
  homeworkPct: number;
  attendancePct: number;
  engagementPct: number;
  openTickets: number;
  needsAttention: boolean;
};

export function getClassHealthRows(_slug: string): ClassHealthRow[] {
  const hw = getSchoolHomeworkReport(_slug, defaultFilters).rows;
  const att = getSchoolAttendanceReport(_slug, defaultFilters).rows;
  const eng = mockEngagementByClass;

  const sections = new Set([
    ...hw.map(r => r.classSection),
    ...att.map(r => r.classSection),
    ...eng.map(r => r.classSection),
  ]);

  return Array.from(sections).map(section => {
    const h = hw.find(r => r.classSection === section);
    const a = att.find(r => r.classSection === section);
    const e = eng.find(r => r.classSection === section);
    const homeworkPct = h?.completionPct ?? 0;
    const attendancePct = a?.presentPct ?? 0;
    const engagementPct = e?.engagementPct ?? 0;
    const openTickets = mockPrincipalTickets.filter(
      t => t.status !== 'resolved' && t.subject.toLowerCase().includes(section.split('-')[0]),
    ).length;
    const needsAttention = homeworkPct < 70 || attendancePct < 85 || engagementPct < 70;
    return {
      id: section,
      classSection: section,
      homeworkPct,
      attendancePct,
      engagementPct,
      openTickets,
      needsAttention,
    };
  });
}

export function getClassesNeedingAttention(slug: string, limit = 3): ClassHealthRow[] {
  return getClassHealthRows(slug)
    .filter(r => r.needsAttention)
    .sort(
      (a, b) =>
        a.homeworkPct + a.attendancePct + a.engagementPct -
        (b.homeworkPct + b.attendancePct + b.engagementPct),
    )
    .slice(0, limit);
}

// —— H12 At-risk students ——

export type AtRiskReason = 'homework' | 'attendance' | 'engagement';

export type AtRiskStudentRow = {
  id: string;
  name: string;
  studentId: string;
  classSection: string;
  grade: string;
  reasons: AtRiskReason[];
  detail: string;
};

export const mockAtRiskStudents: AtRiskStudentRow[] = [
  {
    id: 'ar-1',
    name: 'Ali Hassan',
    studentId: 'GV-2026-005',
    classSection: '10-B',
    grade: '10',
    reasons: ['homework', 'engagement'],
    detail: '3 overdue assignments; no quiz activity in 14 days',
  },
  {
    id: 'ar-2',
    name: 'Hassan Raza',
    studentId: 'GV-2026-003',
    classSection: '9-B',
    grade: '9',
    reasons: ['homework'],
    detail: '2 pending submissions past due date',
  },
  {
    id: 'ar-3',
    name: 'Omar Khan',
    studentId: 'GV-2026-001',
    classSection: '9-A',
    grade: '9',
    reasons: ['attendance'],
    detail: 'Absent 4 days this month',
  },
  {
    id: 'ar-4',
    name: 'Fatima Ahmed',
    studentId: 'GV-2026-002',
    classSection: '9-A',
    grade: '9',
    reasons: ['engagement'],
    detail: 'No Learn videos watched in 21 days',
  },
  {
    id: 'ar-5',
    name: 'Ayesha Siddiqui',
    studentId: 'GV-2026-004',
    classSection: '10-A',
    grade: '10',
    reasons: ['homework', 'attendance'],
    detail: 'Late submissions; 2 unexcused absences',
  },
  {
    id: 'ar-6',
    name: 'Sara Bilal',
    studentId: 'GV-2026-006',
    classSection: '11-A',
    grade: '11',
    reasons: ['engagement'],
    detail: 'Spotlight views dropped 60% vs class avg',
  },
  {
    id: 'ar-7',
    name: 'Student #4421',
    studentId: 'GV-2026-091',
    classSection: '10-B',
    grade: '10',
    reasons: ['homework', 'engagement'],
    detail: 'Flagged chat + missing homework',
  },
  {
    id: 'ar-8',
    name: 'Hina Shah',
    studentId: 'GV-2026-088',
    classSection: '10-A',
    grade: '10',
    reasons: ['attendance'],
    detail: 'Present rate 68% this term',
  },
];

// —— H13 Points & merit ——

export type SchoolMeritEvent = {
  id: string;
  date: string;
  studentName: string;
  classSection: string;
  source: 'homework' | 'visit' | 'quiz' | 'field';
  points: number;
  note: string;
};

export const mockSchoolMeritEvents: SchoolMeritEvent[] = [
  { id: 'm-1', date: 'May 24', studentName: 'Fatima Ahmed', classSection: '9-A', source: 'homework', points: 15, note: 'On-time submission streak' },
  { id: 'm-2', date: 'May 23', studentName: 'Omar Khan', classSection: '9-A', source: 'quiz', points: 25, note: 'Science quiz — Medium' },
  { id: 'm-3', date: 'May 20', studentName: 'Grade 9-A', classSection: '9-A', source: 'visit', points: 40, note: 'Field visit class award' },
  { id: 'm-4', date: 'May 18', studentName: 'Ayesha Siddiqui', classSection: '10-A', source: 'homework', points: 10, note: 'Quality feedback bonus' },
  { id: 'm-5', date: 'May 15', studentName: 'Hassan Raza', classSection: '9-B', source: 'field', points: 20, note: 'Merit rubric — participation' },
];

export const mockGradeLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Grade 9', classSection: 'Grade 9', points: 4120, change: 8 },
  { rank: 2, name: 'Grade 10', classSection: 'Grade 10', points: 3890, change: 3 },
  { rank: 3, name: 'Grade 11', classSection: 'Grade 11', points: 2100, change: 5 },
];

export const mockSchoolLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Fatima Ahmed', classSection: '9-A', points: 842, change: 12 },
  { rank: 2, name: 'Omar Khan', classSection: '9-A', points: 810, change: 8 },
  { rank: 3, name: 'Ayesha Siddiqui', classSection: '10-A', points: 790, change: -2 },
  { rank: 4, name: 'Hassan Raza', classSection: '9-B', points: 755, change: 15 },
  { rank: 5, name: 'Sara Bilal', classSection: '11-A', points: 720, change: 5 },
  { rank: 6, name: 'Ali Hassan', classSection: '10-B', points: 680, change: -8 },
];

export function getLeaderboardByScope(scope: PrincipalLeaderboardScope): LeaderboardEntry[] {
  if (scope === 'class') return mockClassLeaderboard;
  if (scope === 'grade') return mockGradeLeaderboard;
  return mockSchoolLeaderboard;
}

// —— H15 Parent engagement ——

export type ParentEngagementByClass = {
  classSection: string;
  parentAccountsPct: number;
  avgWeeklyOpens: number;
  unreadMessages: number;
};

export const mockParentEngagementByClass: ParentEngagementByClass[] = [
  { classSection: '9-A', parentAccountsPct: 92, avgWeeklyOpens: 4.2, unreadMessages: 3 },
  { classSection: '9-B', parentAccountsPct: 85, avgWeeklyOpens: 3.8, unreadMessages: 7 },
  { classSection: '10-A', parentAccountsPct: 88, avgWeeklyOpens: 3.5, unreadMessages: 2 },
  { classSection: '10-B', parentAccountsPct: 62, avgWeeklyOpens: 1.9, unreadMessages: 14 },
  { classSection: '11-A', parentAccountsPct: 90, avgWeeklyOpens: 4.0, unreadMessages: 1 },
];

export const parentEngagementTrend = [
  { label: 'W1', value: 78 },
  { label: 'W2', value: 80 },
  { label: 'W3', value: 82 },
  { label: 'W4', value: 85 },
];

export function getTicketVolumeByCategory() {
  const counts: Record<string, number> = {};
  for (const t of mockPrincipalTickets) {
    counts[t.category] = (counts[t.category] ?? 0) + 1;
  }
  return Object.entries(counts).map(([label, value]) => ({ label, value }));
}

// —— H16 Learn & Spotlight ——

export type LearnTopicRow = {
  subject: string;
  watchHours: number;
  studentsReached: number;
};

export const mockLearnTopics: LearnTopicRow[] = [
  { subject: 'Science', watchHours: 420, studentsReached: 180 },
  { subject: 'Mathematics', watchHours: 380, studentsReached: 165 },
  { subject: 'English', watchHours: 290, studentsReached: 150 },
  { subject: 'Urdu', watchHours: 210, studentsReached: 140 },
];

export type LearnByClassRow = {
  classSection: string;
  curriculumVideos: number;
  spotlightViews: number;
  adoptionPct: number;
};

export const mockLearnByClass: LearnByClassRow[] = [
  { classSection: '9-A', curriculumVideos: 320, spotlightViews: 180, adoptionPct: 88 },
  { classSection: '9-B', curriculumVideos: 280, spotlightViews: 150, adoptionPct: 82 },
  { classSection: '10-A', curriculumVideos: 290, spotlightViews: 160, adoptionPct: 85 },
  { classSection: '10-B', curriculumVideos: 120, spotlightViews: 45, adoptionPct: 48 },
  { classSection: '11-A', curriculumVideos: 170, spotlightViews: 90, adoptionPct: 78 },
];

export const learnUsageTrend = [
  { label: 'Jan', value: 820 },
  { label: 'Feb', value: 910 },
  { label: 'Mar', value: 980 },
  { label: 'Apr', value: 1050 },
  { label: 'May', value: 1120 },
];

// —— H17 Rewards ——

export type SchoolRedemptionRow = {
  id: string;
  studentName: string;
  classSection: string;
  rewardName: string;
  pointsSpent: number;
  status: 'pending' | 'processing' | 'delivered';
  orderedAt: string;
};

export const mockSchoolRedemptions: SchoolRedemptionRow[] = [
  { id: 'rd-1', studentName: 'Fatima Ahmed', classSection: '9-A', rewardName: 'School notebook set', pointsSpent: 120, status: 'processing', orderedAt: 'May 24' },
  { id: 'rd-2', studentName: 'Omar Khan', classSection: '9-A', rewardName: 'Science kit voucher', pointsSpent: 250, status: 'pending', orderedAt: 'May 23' },
  { id: 'rd-3', studentName: 'Sara Bilal', classSection: '11-A', rewardName: 'Canteen credit', pointsSpent: 80, status: 'delivered', orderedAt: 'May 20' },
  { id: 'rd-4', studentName: 'Ali Hassan', classSection: '10-B', rewardName: 'Extra sports period', pointsSpent: 300, status: 'pending', orderedAt: 'May 22' },
];

export const popularRewards = [
  { label: 'Notebook set', value: 42 },
  { label: 'Canteen credit', value: 38 },
  { label: 'Science kit', value: 24 },
  { label: 'Sports period', value: 18 },
];

// —— H7 Chat activity ——

export type ChatActivitySummary = {
  messagesPerDay: number;
  activeChannels: number;
  flaggedPct: number;
  parentMessages: number;
};

export function getChatActivitySummary(): ChatActivitySummary {
  return {
    messagesPerDay: 1240,
    activeChannels: 28,
    flaggedPct: 0.4,
    parentMessages: 380,
  };
}

// —— Dashboard widgets ——

export function getUpcomingFieldVisit() {
  const scheduled = mockFieldVisits.filter(v => v.status === 'scheduled').sort((a, b) => a.date.localeCompare(b.date));
  return scheduled[0] ?? null;
}

export function getRecentAnnouncementsForDashboard(limit = 3) {
  return mockRecentAnnouncements.slice(0, limit);
}
