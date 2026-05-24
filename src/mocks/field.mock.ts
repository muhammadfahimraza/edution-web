// —— Field assessor profile ——

export const fieldAssessorProfile = {
  name: 'Imran Shah',
  email: 'imran.shah@edustation.pk',
  region: 'Lahore North',
};

export type VisitStatus = 'scheduled' | 'checked_in' | 'in_progress' | 'completed';

export type FieldVisit = {
  id: string;
  schoolName: string;
  schoolSlug: string;
  scheduledTime: string;
  address: string;
  contactName: string;
  purpose: string;
  status: VisitStatus;
  classCount: number;
};

export const mockTodayVisits: FieldVisit[] = [
  {
    id: 'visit-1',
    schoolName: 'Green Valley International',
    schoolSlug: 'green-valley',
    scheduledTime: '09:30',
    address: 'Block 12, DHA Phase 5, Lahore',
    contactName: 'Principal Sara Malik',
    purpose: 'Merit program assessment',
    status: 'scheduled',
    classCount: 4,
  },
  {
    id: 'visit-2',
    schoolName: 'Sunrise Academy',
    schoolSlug: 'sunrise-academy',
    scheduledTime: '13:00',
    address: 'Main Gulberg Road, Lahore',
    contactName: 'Admin Hassan Ali',
    purpose: 'Follow-up visit',
    status: 'scheduled',
    classCount: 3,
  },
  {
    id: 'visit-3',
    schoolName: 'City Model School',
    schoolSlug: 'city-model',
    scheduledTime: '15:30',
    address: 'Model Town, Lahore',
    contactName: 'Coordinator Ayesha Khan',
    purpose: 'Initial onboarding assessment',
    status: 'completed',
    classCount: 2,
  },
];

export function getVisitById(visitId: string): FieldVisit | undefined {
  return mockTodayVisits.find(v => v.id === visitId);
}

// —— J3 Class list ——

export type VisitClass = {
  id: string;
  label: string;
  grade: string;
  section: string;
  studentCount: number;
  assessed: boolean;
};

export const mockVisitClasses: Record<string, VisitClass[]> = {
  'visit-1': [
    { id: 'cls-9a', label: 'Grade 9-A', grade: '9', section: 'A', studentCount: 32, assessed: false },
    { id: 'cls-9b', label: 'Grade 9-B', grade: '9', section: 'B', studentCount: 30, assessed: false },
    { id: 'cls-10a', label: 'Grade 10-A', grade: '10', section: 'A', studentCount: 28, assessed: true },
    { id: 'cls-10b', label: 'Grade 10-B', grade: '10', section: 'B', studentCount: 27, assessed: false },
  ],
  'visit-2': [
    { id: 'cls-8a', label: 'Grade 8-A', grade: '8', section: 'A', studentCount: 35, assessed: false },
    { id: 'cls-8b', label: 'Grade 8-B', grade: '8', section: 'B', studentCount: 33, assessed: false },
    { id: 'cls-9a', label: 'Grade 9-A', grade: '9', section: 'A', studentCount: 31, assessed: false },
  ],
  'visit-3': [
    { id: 'cls-7a', label: 'Grade 7-A', grade: '7', section: 'A', studentCount: 40, assessed: true },
    { id: 'cls-7b', label: 'Grade 7-B', grade: '7', section: 'B', studentCount: 38, assessed: true },
  ],
};

// —— J4 Assessment ——

export const assessmentTopics = [
  'Classroom engagement',
  'Homework culture',
  'Digital literacy',
  'Science lab participation',
  'Rewards program adoption',
];

export const rubricLevels = [
  { score: 1, label: 'Needs improvement' },
  { score: 2, label: 'Developing' },
  { score: 3, label: 'Satisfactory' },
  { score: 4, label: 'Strong' },
  { score: 5, label: 'Exemplary' },
];

export type ClassStudent = {
  id: string;
  name: string;
};

export const mockClassStudents: Record<string, ClassStudent[]> = {
  'cls-9a': [
    { id: 'st-1', name: 'Omar Khan' },
    { id: 'st-2', name: 'Fatima Ahmed' },
    { id: 'st-3', name: 'Hassan Raza' },
  ],
  default: [
    { id: 'st-1', name: 'Student A' },
    { id: 'st-2', name: 'Student B' },
    { id: 'st-3', name: 'Student C' },
  ],
};

export function getStudentsForClass(classId: string): ClassStudent[] {
  return mockClassStudents[classId] ?? mockClassStudents.default;
}

export const defaultPointsAward = 10;

export type SyncState = 'synced' | 'syncing' | 'offline' | 'pending';
