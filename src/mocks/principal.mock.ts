// —— H1 Principal dashboard KPIs ——

export type PrincipalKpi = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
};

export function getPrincipalKpis(_slug: string): PrincipalKpi[] {
  return [
    { label: 'Homework completion', value: '87%', change: '+4% vs last week', trend: 'up' },
    { label: 'Open tickets', value: '12', change: '3 escalated', trend: 'neutral' },
    { label: 'Avg class engagement', value: '78%', change: 'Videos + quizzes', trend: 'up' },
    { label: 'Field visit score', value: '4.2', change: 'Last visit May 20', trend: 'neutral' },
  ];
}

export type PrincipalAlert = {
  id: string;
  type: 'warning' | 'info';
  message: string;
  href?: string;
};

export const principalAlerts: PrincipalAlert[] = [
  { id: 'a-1', type: 'warning', message: 'Grade 10-B homework completion below 60%', href: 'homework' },
  { id: 'a-2', type: 'info', message: '2 flagged chat messages pending review', href: 'chat-audit' },
  { id: 'a-3', type: 'info', message: 'Field assessor visit scheduled May 28', href: 'visits' },
];

// —— H2 Homework completion ——

export type HomeworkCompletionRow = {
  id: string;
  classSection: string;
  assigned: number;
  submitted: number;
  graded: number;
  completionPct: number;
};

export const mockHomeworkCompletion: HomeworkCompletionRow[] = [
  { id: 'hw-1', classSection: '9-A', assigned: 24, submitted: 22, graded: 20, completionPct: 92 },
  { id: 'hw-2', classSection: '9-B', assigned: 24, submitted: 19, graded: 18, completionPct: 79 },
  { id: 'hw-3', classSection: '10-A', assigned: 22, submitted: 20, graded: 19, completionPct: 91 },
  { id: 'hw-4', classSection: '10-B', assigned: 22, submitted: 12, graded: 10, completionPct: 55 },
  { id: 'hw-5', classSection: '11-A', assigned: 20, submitted: 18, graded: 17, completionPct: 90 },
];

export const homeworkCompletionChart = [
  { month: 'W1', schools: 82 },
  { month: 'W2', schools: 79 },
  { month: 'W3', schools: 85 },
  { month: 'W4', schools: 87 },
];

export const homeworkGradeFilters = ['All grades', 'Grade 9', 'Grade 10', 'Grade 11'];

// —— H4 Leaderboards ——

export type PrincipalLeaderboardScope = 'class' | 'grade' | 'school';

export type LeaderboardEntry = {
  rank: number;
  name: string;
  classSection: string;
  points: number;
  change: number;
};

export const mockClassLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Fatima Ahmed', classSection: '9-A', points: 842, change: 12 },
  { rank: 2, name: 'Omar Khan', classSection: '9-A', points: 810, change: 8 },
  { rank: 3, name: 'Ayesha Siddiqui', classSection: '10-A', points: 790, change: -2 },
  { rank: 4, name: 'Hassan Raza', classSection: '9-B', points: 755, change: 15 },
  { rank: 5, name: 'Sara Bilal', classSection: '11-A', points: 720, change: 5 },
];

// —— H5 Visit assessment summary ——

export type VisitAssessmentRow = {
  id: string;
  visitDate: string;
  assessor: string;
  classesVisited: number;
  avgScore: number;
  pointsAwarded: number;
  notes: string;
};

export const mockVisitAssessments: VisitAssessmentRow[] = [
  { id: 'v-1', visitDate: 'May 20, 2026', assessor: 'Imran Shah', classesVisited: 4, avgScore: 4.3, pointsAwarded: 120, notes: 'Strong participation in Grade 9 science' },
  { id: 'v-2', visitDate: 'May 12, 2026', assessor: 'Sara Malik', classesVisited: 3, avgScore: 3.9, pointsAwarded: 85, notes: 'Timetable gaps noted in Grade 10' },
  { id: 'v-3', visitDate: 'Apr 28, 2026', assessor: 'Imran Shah', classesVisited: 5, avgScore: 4.1, pointsAwarded: 150, notes: 'Rewards program well adopted' },
];

// —— H6 Tickets ——

export type PrincipalTicket = {
  id: string;
  subject: string;
  category: string;
  requester: string;
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  ageDays: number;
  priority: 'high' | 'medium' | 'low';
};

export const mockPrincipalTickets: PrincipalTicket[] = [
  { id: 'tk-1', subject: 'Parent cannot see homework grades', category: 'Account', requester: 'Hassan Ali (parent)', status: 'open', ageDays: 2, priority: 'medium' },
  { id: 'tk-2', subject: 'SMS notifications not received', category: 'Technical', requester: 'Fatima Noor (parent)', status: 'escalated', ageDays: 5, priority: 'high' },
  { id: 'tk-3', subject: 'Request seat increase', category: 'Billing', requester: 'School admin', status: 'in_progress', ageDays: 1, priority: 'low' },
  { id: 'tk-4', subject: 'Student app login issue', category: 'Account', requester: 'Omar Khan (student)', status: 'resolved', ageDays: 8, priority: 'medium' },
];

// —— H7 Chat audit ——

export type ChatAuditFlag = {
  id: string;
  channel: string;
  sender: string;
  excerpt: string;
  reason: string;
  flaggedAt: string;
  status: 'pending' | 'reviewed' | 'action_taken';
};

export const mockChatAuditFlags: ChatAuditFlag[] = [
  { id: 'cf-1', channel: 'Grade 9-A General', sender: 'Student #4421', excerpt: 'Inappropriate language in thread…', reason: 'Profanity', flaggedAt: 'May 23, 14:22', status: 'pending' },
  { id: 'cf-2', channel: 'Parent-Teacher Chat', sender: 'Parent', excerpt: 'Phone number shared publicly…', reason: 'PII leak', flaggedAt: 'May 22, 11:05', status: 'pending' },
  { id: 'cf-3', channel: 'Grade 10 Physics', sender: 'Teacher', excerpt: 'External link shared…', reason: 'Suspicious link', flaggedAt: 'May 21, 16:40', status: 'reviewed' },
];

// —— H8 Engagement ——

export type EngagementMetric = {
  id: string;
  label: string;
  value: string;
  sublabel: string;
};

export const mockEngagementMetrics: EngagementMetric[] = [
  { id: 'e-1', label: 'Videos watched', value: '1,240', sublabel: 'Last 30 days' },
  { id: 'e-2', label: 'Quiz attempts', value: '680', sublabel: 'Last 30 days' },
  { id: 'e-3', label: 'Avg watch time', value: '8.4 min', sublabel: 'Per session' },
  { id: 'e-4', label: 'Quiz pass rate', value: '72%', sublabel: 'First attempt' },
];

export type EngagementByClass = {
  classSection: string;
  videosWatched: number;
  quizAttempts: number;
  engagementPct: number;
};

export const mockEngagementByClass: EngagementByClass[] = [
  { classSection: '9-A', videosWatched: 320, quizAttempts: 180, engagementPct: 88 },
  { classSection: '9-B', videosWatched: 280, quizAttempts: 150, engagementPct: 82 },
  { classSection: '10-A', videosWatched: 290, quizAttempts: 160, engagementPct: 85 },
  { classSection: '10-B', videosWatched: 180, quizAttempts: 90, engagementPct: 62 },
  { classSection: '11-A', videosWatched: 170, quizAttempts: 100, engagementPct: 78 },
];

export const engagementChart = [
  { month: 'Jan', schools: 420 },
  { month: 'Feb', schools: 480 },
  { month: 'Mar', schools: 520 },
  { month: 'Apr', schools: 610 },
  { month: 'May', schools: 680 },
];

// —— H9 Export center ——

export type ExportReport = {
  id: string;
  name: string;
  description: string;
  format: 'CSV' | 'PDF' | 'XLSX';
  lastGenerated: string | null;
};

export const mockExportReports: ExportReport[] = [
  { id: 'ex-1', name: 'Homework completion', description: 'By class and date range', format: 'CSV', lastGenerated: 'May 22, 2026' },
  { id: 'ex-2', name: 'Student roster', description: 'All active students with parent contacts', format: 'XLSX', lastGenerated: 'May 20, 2026' },
  { id: 'ex-3', name: 'Engagement summary', description: 'Videos and quiz activity', format: 'PDF', lastGenerated: null },
  { id: 'ex-4', name: 'Leaderboard snapshot', description: 'Current term rankings', format: 'CSV', lastGenerated: 'May 15, 2026' },
  { id: 'ex-5', name: 'Ticket history', description: 'Open and resolved tickets', format: 'PDF', lastGenerated: null },
];

// —— H10 Announcements ——

export const announcementAudiences = [
  { id: 'all', label: 'Entire school' },
  { id: 'parents', label: 'All parents' },
  { id: 'students', label: 'All students' },
  { id: 'teachers', label: 'All teachers' },
  { id: 'grade-9', label: 'Grade 9 only' },
  { id: 'grade-10', label: 'Grade 10 only' },
];

export type RecentAnnouncement = {
  id: string;
  title: string;
  audience: string;
  sentAt: string;
  status: 'sent' | 'scheduled' | 'draft';
};

export const mockRecentAnnouncements: RecentAnnouncement[] = [
  { id: 'ann-1', title: 'Summer term begins May 1', audience: 'Entire school', sentAt: 'Apr 28, 2026', status: 'sent' },
  { id: 'ann-2', title: 'Parent-teacher meeting reminder', audience: 'All parents', sentAt: 'May 18, 2026', status: 'sent' },
  { id: 'ann-3', title: 'Sports day schedule', audience: 'Grade 9 only', sentAt: 'May 25, 2026', status: 'scheduled' },
];
