export type AdminSchoolStatus = 'active' | 'trial' | 'suspended' | 'onboarding';

export type AdminPlanTier = 'starter' | 'growth' | 'enterprise';

export type AdminSchool = {
  id: string;
  name: string;
  slug: string;
  plan: AdminPlanTier;
  studentCount: number;
  seatLimit: number;
  status: AdminSchoolStatus;
  country: string;
  createdAt: string;
};

export type PlatformKpi = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
};

export type SchoolsChartPoint = {
  month: string;
  schools: number;
};

export type TicketSlaRow = {
  id: string;
  schoolName: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  ageHours: number;
  status: 'open' | 'escalated';
};

export const platformKpis: PlatformKpi[] = [
  { label: 'Active schools', value: '48', change: '+3 this month', trend: 'up' },
  { label: 'Students on platform', value: '12,840', change: '+8.2% vs last month', trend: 'up' },
  { label: 'Open L2 tickets', value: '7', change: '2 escalated', trend: 'neutral' },
  { label: 'Videos pending review', value: '14', change: 'SLA: 6 overdue', trend: 'down' },
];

export const schoolsChartData: SchoolsChartPoint[] = [
  { month: 'Dec', schools: 2 },
  { month: 'Jan', schools: 4 },
  { month: 'Feb', schools: 3 },
  { month: 'Mar', schools: 6 },
  { month: 'Apr', schools: 5 },
  { month: 'May', schools: 8 },
];

export const ticketSlaRows: TicketSlaRow[] = [
  {
    id: 't-101',
    schoolName: 'Green Valley International',
    subject: 'SMS delivery failures',
    priority: 'high',
    ageHours: 52,
    status: 'escalated',
  },
  {
    id: 't-102',
    schoolName: 'Sunrise Academy',
    subject: 'Parent cannot link second child',
    priority: 'medium',
    ageHours: 18,
    status: 'open',
  },
  {
    id: 't-103',
    schoolName: 'City Model School',
    subject: 'Billing seat count mismatch',
    priority: 'high',
    ageHours: 30,
    status: 'open',
  },
  {
    id: 't-104',
    schoolName: 'Al-Noor High School',
    subject: 'White-label logo not updating',
    priority: 'low',
    ageHours: 6,
    status: 'open',
  },
];

export const mockAdminSchools: AdminSchool[] = [
  {
    id: 'sch-1',
    name: 'Green Valley International School',
    slug: 'green-valley',
    plan: 'enterprise',
    studentCount: 1240,
    seatLimit: 1500,
    status: 'active',
    country: 'Pakistan',
    createdAt: 'Jan 12, 2025',
  },
  {
    id: 'sch-2',
    name: 'Sunrise Academy',
    slug: 'sunrise-academy',
    plan: 'growth',
    studentCount: 680,
    seatLimit: 800,
    status: 'active',
    country: 'Pakistan',
    createdAt: 'Mar 3, 2025',
  },
  {
    id: 'sch-3',
    name: 'City Model School',
    slug: 'city-model',
    plan: 'growth',
    studentCount: 420,
    seatLimit: 500,
    status: 'trial',
    country: 'Pakistan',
    createdAt: 'Apr 18, 2026',
  },
  {
    id: 'sch-4',
    name: 'Al-Noor High School',
    slug: 'al-noor',
    plan: 'starter',
    studentCount: 210,
    seatLimit: 300,
    status: 'active',
    country: 'Pakistan',
    createdAt: 'May 2, 2026',
  },
  {
    id: 'sch-5',
    name: 'Beacon House Campus',
    slug: 'beacon-house',
    plan: 'enterprise',
    studentCount: 890,
    seatLimit: 1000,
    status: 'suspended',
    country: 'Pakistan',
    createdAt: 'Nov 8, 2024',
  },
];

export const planOptions: {
  tier: AdminPlanTier;
  label: string;
  seats: number;
  priceLabel: string;
  features: string[];
}[] = [
  {
    tier: 'starter',
    label: 'Starter',
    seats: 300,
    priceLabel: 'PKR 15,000 / month',
    features: ['Homework & chat', 'Parent app', 'Email support'],
  },
  {
    tier: 'growth',
    label: 'Growth',
    seats: 800,
    priceLabel: 'PKR 35,000 / month',
    features: ['Everything in Starter', 'Rewards catalog', 'Principal reports'],
  },
  {
    tier: 'enterprise',
    label: 'Enterprise',
    seats: 2000,
    priceLabel: 'Custom pricing',
    features: ['White-label', 'Field visits', 'Dedicated success manager'],
  },
];

export function slugifySchoolName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

export function isSlugAvailable(slug: string, excludeId?: string): boolean {
  if (!slug) {
    return false;
  }
  return !mockAdminSchools.some(
    s => s.slug === slug && s.id !== excludeId,
  );
}
