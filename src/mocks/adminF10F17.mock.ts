import { mockAdminSchools } from './adminPlatform.mock';
import type { IconName } from '@/lib/icons';

// —— F10 Rewards catalog ——

export type RewardSku = {
  id: string;
  name: string;
  category: 'physical' | 'digital' | 'experience';
  pointsCost: number;
  stock: number;
  active: boolean;
  icon: IconName;
};

export const mockRewardSkus: RewardSku[] = [
  { id: 'sku-1', name: 'Edu Station water bottle', category: 'physical', pointsCost: 120, stock: 340, active: true, icon: 'package' },
  { id: 'sku-2', name: 'Amazon gift card PKR 500', category: 'digital', pointsCost: 200, stock: 999, active: true, icon: 'gift' },
  { id: 'sku-3', name: 'Science lab kit voucher', category: 'experience', pointsCost: 350, stock: 45, active: true, icon: 'flaskConical' },
  { id: 'sku-4', name: 'School hoodie (size M)', category: 'physical', pointsCost: 280, stock: 12, active: true, icon: 'package' },
  { id: 'sku-5', name: 'Premium study planner PDF', category: 'digital', pointsCost: 50, stock: 999, active: false, icon: 'bookOpen' },
  { id: 'sku-6', name: 'Cricket coaching session', category: 'experience', pointsCost: 420, stock: 8, active: true, icon: 'sparkles' },
];

// —— F11 Fulfillment queue ——

export type FulfillmentStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export type FulfillmentOrder = {
  id: string;
  studentName: string;
  schoolName: string;
  rewardName: string;
  pointsSpent: number;
  status: FulfillmentStatus;
  orderedAt: string;
};

export const mockFulfillmentOrders: FulfillmentOrder[] = [
  { id: 'ord-101', studentName: 'Fatima Noor', schoolName: 'City Model School', rewardName: 'Edu Station water bottle', pointsSpent: 120, status: 'pending', orderedAt: 'May 23, 2026' },
  { id: 'ord-102', studentName: 'Hassan Ali Jr.', schoolName: 'Sunrise Academy', rewardName: 'Amazon gift card PKR 500', pointsSpent: 200, status: 'processing', orderedAt: 'May 22, 2026' },
  { id: 'ord-103', studentName: 'Ayesha Raza', schoolName: 'Green Valley International', rewardName: 'School hoodie (size M)', pointsSpent: 280, status: 'shipped', orderedAt: 'May 20, 2026' },
  { id: 'ord-104', studentName: 'Omar Khan', schoolName: 'Al-Noor High School', rewardName: 'Science lab kit voucher', pointsSpent: 350, status: 'pending', orderedAt: 'May 21, 2026' },
  { id: 'ord-105', studentName: 'Sara Ahmed', schoolName: 'Sunrise Academy', rewardName: 'Cricket coaching session', pointsSpent: 420, status: 'delivered', orderedAt: 'May 15, 2026' },
];

// —— F12 Visit schedule ——

export type FieldVisit = {
  id: string;
  schoolName: string;
  date: string; // YYYY-MM-DD
  time: string;
  purpose: string;
  assignee: string;
  status: 'scheduled' | 'completed' | 'cancelled';
};

export const mockFieldVisits: FieldVisit[] = [
  { id: 'v-1', schoolName: 'Green Valley International', date: '2026-05-05', time: '10:00', purpose: 'Onboarding kickoff', assignee: 'Sara Malik', status: 'completed' },
  { id: 'v-2', schoolName: 'Sunrise Academy', date: '2026-05-12', time: '14:00', purpose: 'Principal training', assignee: 'Sara Malik', status: 'completed' },
  { id: 'v-3', schoolName: 'City Model School', date: '2026-05-20', time: '11:00', purpose: 'Rewards program launch', assignee: 'Imran Shah', status: 'scheduled' },
  { id: 'v-4', schoolName: 'Al-Noor High School', date: '2026-05-28', time: '09:30', purpose: 'Timetable setup support', assignee: 'Sara Malik', status: 'scheduled' },
  { id: 'v-5', schoolName: 'Beacon House Campus', date: '2026-05-15', time: '16:00', purpose: 'Billing reconciliation', assignee: 'Imran Shah', status: 'cancelled' },
];

// —— F13 Platform leaderboards ——

export type LeaderboardTerm = '2025-fall' | '2026-spring' | '2026-summer';

export type SchoolRanking = {
  rank: number;
  schoolName: string;
  avgPoints: number;
  activeStudents: number;
  engagementPct: number;
};

export const leaderboardTerms: { id: LeaderboardTerm; label: string }[] = [
  { id: '2026-spring', label: 'Spring 2026' },
  { id: '2026-summer', label: 'Summer 2026 (current)' },
  { id: '2025-fall', label: 'Fall 2025' },
];

export const mockSchoolRankings: Record<LeaderboardTerm, SchoolRanking[]> = {
  '2026-summer': [
    { rank: 1, schoolName: 'Green Valley International', avgPoints: 842, activeStudents: 1180, engagementPct: 94 },
    { rank: 2, schoolName: 'Sunrise Academy', avgPoints: 710, activeStudents: 620, engagementPct: 88 },
    { rank: 3, schoolName: 'Al-Noor High School', avgPoints: 680, activeStudents: 195, engagementPct: 91 },
    { rank: 4, schoolName: 'City Model School', avgPoints: 540, activeStudents: 380, engagementPct: 76 },
    { rank: 5, schoolName: 'Beacon House Campus', avgPoints: 420, activeStudents: 810, engagementPct: 62 },
  ],
  '2026-spring': [
    { rank: 1, schoolName: 'Sunrise Academy', avgPoints: 790, activeStudents: 600, engagementPct: 90 },
    { rank: 2, schoolName: 'Green Valley International', avgPoints: 760, activeStudents: 1150, engagementPct: 89 },
    { rank: 3, schoolName: 'City Model School', avgPoints: 620, activeStudents: 350, engagementPct: 80 },
    { rank: 4, schoolName: 'Al-Noor High School', avgPoints: 590, activeStudents: 180, engagementPct: 85 },
    { rank: 5, schoolName: 'Beacon House Campus', avgPoints: 380, activeStudents: 790, engagementPct: 58 },
  ],
  '2025-fall': [
    { rank: 1, schoolName: 'Green Valley International', avgPoints: 720, activeStudents: 1100, engagementPct: 87 },
    { rank: 2, schoolName: 'Beacon House Campus', avgPoints: 650, activeStudents: 850, engagementPct: 72 },
    { rank: 3, schoolName: 'Sunrise Academy', avgPoints: 610, activeStudents: 580, engagementPct: 84 },
    { rank: 4, schoolName: 'Al-Noor High School', avgPoints: 480, activeStudents: 170, engagementPct: 78 },
    { rank: 5, schoolName: 'City Model School', avgPoints: 410, activeStudents: 320, engagementPct: 70 },
  ],
};

// —— F14 Escalated tickets ——

export type EscalatedTicket = {
  id: string;
  schoolName: string;
  subject: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  ageHours: number;
  assignee: string | null;
  status: 'open' | 'in_progress' | 'escalated';
};

export const mockEscalatedTickets: EscalatedTicket[] = [
  { id: 't-201', schoolName: 'Green Valley International', subject: 'SMS delivery failures', category: 'Technical', priority: 'high', ageHours: 52, assignee: 'Sara Malik', status: 'escalated' },
  { id: 't-202', schoolName: 'Sunrise Academy', subject: 'Parent cannot link second child', category: 'Account', priority: 'medium', ageHours: 18, assignee: null, status: 'open' },
  { id: 't-203', schoolName: 'City Model School', subject: 'Billing seat count mismatch', category: 'Billing', priority: 'high', ageHours: 30, assignee: 'Imran Shah', status: 'in_progress' },
  { id: 't-204', schoolName: 'Al-Noor High School', subject: 'White-label logo not updating', category: 'Branding', priority: 'low', ageHours: 6, assignee: null, status: 'open' },
  { id: 't-205', schoolName: 'Beacon House Campus', subject: 'Bulk student import stuck', category: 'Data', priority: 'high', ageHours: 44, assignee: 'Sara Malik', status: 'escalated' },
];

// —— F15 Moderation queue ——

export type ModerationFlag = {
  id: string;
  schoolName: string;
  channelName: string;
  senderName: string;
  senderRole: 'student' | 'teacher' | 'parent';
  excerpt: string;
  reason: string;
  flaggedAt: string;
  status: 'pending' | 'dismissed' | 'action_taken';
};

export const mockModerationFlags: ModerationFlag[] = [
  { id: 'mod-1', schoolName: 'City Model School', channelName: 'Class 9-A General', senderName: 'Student #4421', senderRole: 'student', excerpt: 'Inappropriate language in homework thread…', reason: 'Profanity', flaggedAt: 'May 23, 2026 14:22', status: 'pending' },
  { id: 'mod-2', schoolName: 'Sunrise Academy', channelName: 'Parent-Teacher Chat', senderName: 'Hassan Ali', senderRole: 'parent', excerpt: 'Sharing personal phone number publicly…', reason: 'PII leak', flaggedAt: 'May 23, 2026 11:05', status: 'pending' },
  { id: 'mod-3', schoolName: 'Green Valley International', channelName: 'Grade 10 Physics', senderName: 'Ayesha Khan', senderRole: 'teacher', excerpt: 'Link to external unverified resource…', reason: 'Suspicious link', flaggedAt: 'May 22, 2026 16:40', status: 'pending' },
  { id: 'mod-4', schoolName: 'Al-Noor High School', channelName: 'Class 8-B', senderName: 'Student #1189', senderRole: 'student', excerpt: 'Repeated spam messages…', reason: 'Spam', flaggedAt: 'May 21, 2026 09:15', status: 'dismissed' },
];

// —— F16 Feature flags ——

export type FeatureFlagKey =
  | 'rewards_catalog'
  | 'parent_chat'
  | 'video_library'
  | 'platform_leaderboard'
  | 'sms_notifications';

export type SchoolFeatureFlag = {
  schoolId: string;
  schoolName: string;
  flags: Record<FeatureFlagKey, boolean>;
};

export const featureFlagLabels: Record<FeatureFlagKey, string> = {
  rewards_catalog: 'Rewards catalog',
  parent_chat: 'Parent chat',
  video_library: 'Video library',
  platform_leaderboard: 'Platform leaderboard',
  sms_notifications: 'SMS notifications',
};

export const mockSchoolFeatureFlags: SchoolFeatureFlag[] = mockAdminSchools.map(s => ({
  schoolId: s.id,
  schoolName: s.name,
  flags: {
    rewards_catalog: s.status !== 'suspended',
    parent_chat: true,
    video_library: s.plan !== 'starter',
    platform_leaderboard: s.plan === 'enterprise' || s.plan === 'growth',
    sms_notifications: s.status === 'active',
  },
}));

// —— F17 SMS health ——

export type SmsProviderStatus = 'healthy' | 'degraded' | 'down';

export type SmsHealthMetric = {
  provider: string;
  status: SmsProviderStatus;
  successRatePct: number;
  avgLatencyMs: number;
  sent24h: number;
  failed24h: number;
  lastIncident: string | null;
};

export const mockSmsHealth: SmsHealthMetric[] = [
  { provider: 'Twilio (primary)', status: 'healthy', successRatePct: 98.4, avgLatencyMs: 420, sent24h: 8420, failed24h: 134, lastIncident: null },
  { provider: 'Jazz SMS (PK fallback)', status: 'degraded', successRatePct: 91.2, avgLatencyMs: 890, sent24h: 2100, failed24h: 185, lastIncident: 'May 22, 2026 — intermittent timeouts' },
  { provider: 'OTP gateway', status: 'healthy', successRatePct: 99.1, avgLatencyMs: 310, sent24h: 1240, failed24h: 11, lastIncident: null },
];

export const smsDeliveryBySchool = [
  { schoolName: 'Green Valley International', sent: 420, failed: 8, rate: 98.1 },
  { schoolName: 'Sunrise Academy', sent: 280, failed: 12, rate: 95.7 },
  { schoolName: 'City Model School', sent: 190, failed: 22, rate: 88.4 },
  { schoolName: 'Al-Noor High School', sent: 95, failed: 3, rate: 96.9 },
  { schoolName: 'Beacon House Campus', sent: 0, failed: 0, rate: 0 },
];
