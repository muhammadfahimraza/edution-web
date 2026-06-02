import { mockAdminSchools } from './adminPlatform.mock';

export type SchoolBranding = {
  primaryColor: string;
  displayName: string;
};

export type SchoolKpi = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
};

export type EnrollmentPoint = {
  month: string;
  students: number;
};

export type SchoolActivityRow = {
  id: string;
  action: string;
  detail: string;
  when: string;
};

export type AcademicYearStatus = 'current' | 'upcoming' | 'archived';

export type AcademicYear = {
  id: string;
  label: string;
  status: AcademicYearStatus;
  startDate: string;
  endDate: string;
};

export type AcademicTerm = {
  id: string;
  yearId: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

const brandingDefaults: Record<string, SchoolBranding> = {
  'green-valley': {
    primaryColor: '#449691',
    displayName: 'Green Valley International School',
  },
  'sunrise-academy': {
    primaryColor: '#EA580C',
    displayName: 'Sunrise Academy',
  },
  'city-model': {
    primaryColor: '#7C3AED',
    displayName: 'City Model School',
  },
  'al-noor': {
    primaryColor: '#059669',
    displayName: 'Al-Noor High School',
  },
  'beacon-house': {
    primaryColor: '#DC2626',
    displayName: 'Beacon House Campus',
  },
};

export function getSchoolBranding(slug: string): SchoolBranding {
  const school = mockAdminSchools.find(s => s.slug === slug);
  const defaults = brandingDefaults[slug];
  if (defaults) return defaults;
  return {
    primaryColor: '#449691',
    displayName: school?.name ?? slug,
  };
}

export function getSchoolKpis(slug: string): SchoolKpi[] {
  const school = mockAdminSchools.find(s => s.slug === slug);
  const students = school?.studentCount ?? 420;
  const seats = school?.seatLimit ?? 500;
  const pct = Math.round((students / seats) * 100);

  return [
    { label: 'Active students', value: students.toLocaleString(), change: '+12 this week', trend: 'up' },
    { label: 'Teachers', value: '38', change: '2 pending invites', trend: 'neutral' },
    { label: 'Classes', value: '24', change: '6 sections added', trend: 'up' },
    { label: 'Seat usage', value: `${pct}%`, change: `${(seats - students).toLocaleString()} seats left`, trend: pct > 90 ? 'down' : 'neutral' },
  ];
}

export const enrollmentChartBySlug: Record<string, EnrollmentPoint[]> = {
  default: [
    { month: 'Jan', students: 980 },
    { month: 'Feb', students: 1020 },
    { month: 'Mar', students: 1080 },
    { month: 'Apr', students: 1150 },
    { month: 'May', students: 1180 },
    { month: 'Jun', students: 1240 },
  ],
};

export function getEnrollmentChart(slug: string): EnrollmentPoint[] {
  return enrollmentChartBySlug[slug] ?? enrollmentChartBySlug.default;
}

export function getSchoolActivity(slug: string): SchoolActivityRow[] {
  const name = mockAdminSchools.find(s => s.slug === slug)?.name ?? 'School';
  return [
    { id: 'a-1', action: 'CSV import completed', detail: `142 students added to Grade 9`, when: '2 hours ago' },
    { id: 'a-2', action: 'Branding updated', detail: 'Primary color changed', when: 'Yesterday' },
    { id: 'a-3', action: 'Term activated', detail: 'Summer 2026 set as current term', when: 'May 20, 2026' },
    { id: 'a-4', action: 'Teacher invited', detail: 'ayesha.khan@' + slug + '.edu.pk', when: 'May 18, 2026' },
    { id: 'a-5', action: 'Class created', detail: 'Grade 10-A section added', when: 'May 15, 2026' },
  ].map(r => (r.detail.includes('@') ? r : { ...r, detail: r.detail.replace('School', name.split(' ')[0]) }));
}

export const mockAcademicYears: AcademicYear[] = [
  { id: 'ay-2026', label: '2025–2026', status: 'current', startDate: 'Aug 1, 2025', endDate: 'Jul 31, 2026' },
  { id: 'ay-2027', label: '2026–2027', status: 'upcoming', startDate: 'Aug 1, 2026', endDate: 'Jul 31, 2027' },
  { id: 'ay-2025', label: '2024–2025', status: 'archived', startDate: 'Aug 1, 2024', endDate: 'Jul 31, 2025' },
];

export const mockAcademicTerms: AcademicTerm[] = [
  { id: 't-summer-26', yearId: 'ay-2026', name: 'Summer 2026', startDate: 'May 1, 2026', endDate: 'Aug 15, 2026', isCurrent: true },
  { id: 't-spring-26', yearId: 'ay-2026', name: 'Spring 2026', startDate: 'Jan 15, 2026', endDate: 'Apr 30, 2026', isCurrent: false },
  { id: 't-fall-25', yearId: 'ay-2026', name: 'Fall 2025', startDate: 'Aug 15, 2025', endDate: 'Dec 20, 2025', isCurrent: false },
  { id: 't-fall-27', yearId: 'ay-2027', name: 'Fall 2026 (planned)', startDate: 'Aug 15, 2026', endDate: 'Dec 20, 2026', isCurrent: false },
];

export const presetBrandColors = [
  '#2563EB',
  '#059669',
  '#EA580C',
  '#7C3AED',
  '#DC2626',
  '#0891B2',
  '#CA8A04',
  '#4F46E5',
];
