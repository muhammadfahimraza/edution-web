// —— G4 Classes & sections ——

export type SchoolSection = {
  id: string;
  name: string;
  studentCount: number;
  homeroomTeacher: string;
};

export type SchoolClass = {
  id: string;
  gradeLabel: string;
  sections: SchoolSection[];
};

export const mockSchoolClasses: SchoolClass[] = [
  {
    id: 'cls-9',
    gradeLabel: 'Grade 9',
    sections: [
      { id: 'sec-9a', name: '9-A', studentCount: 32, homeroomTeacher: 'Ayesha Khan' },
      { id: 'sec-9b', name: '9-B', studentCount: 30, homeroomTeacher: 'Imran Shah' },
    ],
  },
  {
    id: 'cls-10',
    gradeLabel: 'Grade 10',
    sections: [
      { id: 'sec-10a', name: '10-A', studentCount: 28, homeroomTeacher: 'Sara Malik' },
      { id: 'sec-10b', name: '10-B', studentCount: 27, homeroomTeacher: 'Hassan Ali' },
    ],
  },
  {
    id: 'cls-11',
    gradeLabel: 'Grade 11',
    sections: [
      { id: 'sec-11a', name: '11-A', studentCount: 24, homeroomTeacher: 'Fatima Noor' },
    ],
  },
];

// —— G5 Teachers & assignments ——

export type SchoolTeacher = {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  classes: string[];
  status: 'active' | 'invited';
};

export const mockSchoolTeachers: SchoolTeacher[] = [
  { id: 't-1', name: 'Ayesha Khan', email: 'ayesha.khan@school.edu.pk', subjects: ['Physics', 'Science'], classes: ['9-A', '10-A'], status: 'active' },
  { id: 't-2', name: 'Imran Shah', email: 'imran.shah@school.edu.pk', subjects: ['Mathematics'], classes: ['9-B', '10-B'], status: 'active' },
  { id: 't-3', name: 'Sara Malik', email: 'sara.malik@school.edu.pk', subjects: ['English'], classes: ['10-A'], status: 'active' },
  { id: 't-4', name: 'Hassan Ali', email: 'hassan.ali@school.edu.pk', subjects: ['Urdu', 'Islamiat'], classes: ['10-B', '11-A'], status: 'active' },
  { id: 't-5', name: 'Fatima Noor', email: 'fatima.noor@school.edu.pk', subjects: ['Chemistry'], classes: ['11-A'], status: 'invited' },
];

// —— G6 Student roster ——

export type StudentRosterRow = {
  id: string;
  studentId: string;
  name: string;
  classSection: string;
  parentPhone: string;
  status: 'active' | 'inactive';
};

export const mockStudentRoster: StudentRosterRow[] = [
  { id: 'st-1', studentId: 'GV-2026-001', name: 'Omar Khan', classSection: '9-A', parentPhone: '+92 300 1234567', status: 'active' },
  { id: 'st-2', studentId: 'GV-2026-002', name: 'Fatima Ahmed', classSection: '9-A', parentPhone: '+92 321 9876543', status: 'active' },
  { id: 'st-3', studentId: 'GV-2026-003', name: 'Hassan Raza', classSection: '9-B', parentPhone: '+92 333 5551212', status: 'active' },
  { id: 'st-4', studentId: 'GV-2026-004', name: 'Ayesha Siddiqui', classSection: '10-A', parentPhone: '+92 345 7778899', status: 'active' },
  { id: 'st-5', studentId: 'GV-2026-005', name: 'Ali Hassan', classSection: '10-B', parentPhone: '+92 312 4445566', status: 'inactive' },
  { id: 'st-6', studentId: 'GV-2026-006', name: 'Sara Bilal', classSection: '11-A', parentPhone: '+92 301 2223344', status: 'active' },
];

// —— G7 CSV import ——

export const csvImportColumns = [
  'student_id',
  'full_name',
  'grade',
  'section',
  'parent_phone',
  'date_of_birth',
] as const;

export type CsvColumnKey = (typeof csvImportColumns)[number];

export const csvSampleRows = [
  { student_id: 'GV-2026-101', full_name: 'Zainab Ali', grade: '9', section: 'A', parent_phone: '03001234567', date_of_birth: '2010-05-12' },
  { student_id: 'GV-2026-102', full_name: 'Bilal Ahmed', grade: '9', section: 'B', parent_phone: '03219876543', date_of_birth: '2010-08-22' },
  { student_id: 'GV-2026-103', full_name: 'Maryam Khan', grade: '10', section: 'A', parent_phone: '03335551212', date_of_birth: '2009-03-01' },
];

// —— G8 Import errors ——

export type ImportErrorRow = {
  id: string;
  rowNumber: number;
  field: string;
  value: string;
  error: string;
  importBatch: string;
};

export const mockImportErrors: ImportErrorRow[] = [
  { id: 'err-1', rowNumber: 14, field: 'parent_phone', value: '0300-abc', error: 'Invalid phone format', importBatch: 'May 23, 2026' },
  { id: 'err-2', rowNumber: 27, field: 'student_id', value: '', error: 'Required field missing', importBatch: 'May 23, 2026' },
  { id: 'err-3', rowNumber: 31, field: 'grade', value: 'Year 9', error: 'Unknown grade label', importBatch: 'May 23, 2026' },
  { id: 'err-4', rowNumber: 45, field: 'section', value: 'C', error: 'Section does not exist for grade 10', importBatch: 'May 20, 2026' },
];

// —— G9 Parent-phone exceptions ——

export type ParentPhoneException = {
  id: string;
  studentName: string;
  studentId: string;
  classSection: string;
  attemptedPhone: string;
  reason: 'invalid_format' | 'duplicate' | 'not_found';
  status: 'pending' | 'resolved';
};

export const mockParentPhoneExceptions: ParentPhoneException[] = [
  { id: 'ex-1', studentName: 'Usman Tariq', studentId: 'GV-2026-088', classSection: '9-B', attemptedPhone: '0300-INVALID', reason: 'invalid_format', status: 'pending' },
  { id: 'ex-2', studentName: 'Hina Shah', studentId: 'GV-2026-091', classSection: '10-A', attemptedPhone: '+92 300 1234567', reason: 'duplicate', status: 'pending' },
  { id: 'ex-3', studentName: 'Kamran Ali', studentId: 'GV-2026-095', classSection: '11-A', attemptedPhone: '03451234567', reason: 'not_found', status: 'resolved' },
];

// —— G10 Timetable ——

export type TimetableDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TimetableCell = {
  subject: string;
  teacher: string;
  room: string;
};

export type TimetablePeriod = {
  period: number;
  startTime: string;
  endTime: string;
  slots: Partial<Record<TimetableDay, TimetableCell>>;
};

export const timetableDays: TimetableDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const mockTimetableBySection: Record<string, TimetablePeriod[]> = {
  '9-A': [
    {
      period: 1,
      startTime: '08:00',
      endTime: '08:45',
      slots: {
        Mon: { subject: 'Mathematics', teacher: 'Imran Shah', room: '101' },
        Tue: { subject: 'English', teacher: 'Sara Malik', room: '102' },
        Wed: { subject: 'Physics', teacher: 'Ayesha Khan', room: 'Lab 1' },
        Thu: { subject: 'Mathematics', teacher: 'Imran Shah', room: '101' },
        Fri: { subject: 'Urdu', teacher: 'Hassan Ali', room: '103' },
      },
    },
    {
      period: 2,
      startTime: '08:50',
      endTime: '09:35',
      slots: {
        Mon: { subject: 'English', teacher: 'Sara Malik', room: '102' },
        Tue: { subject: 'Physics', teacher: 'Ayesha Khan', room: 'Lab 1' },
        Wed: { subject: 'Mathematics', teacher: 'Imran Shah', room: '101' },
        Thu: { subject: 'Urdu', teacher: 'Hassan Ali', room: '103' },
        Fri: { subject: 'Islamiat', teacher: 'Hassan Ali', room: '103' },
      },
    },
    {
      period: 3,
      startTime: '09:40',
      endTime: '10:25',
      slots: {
        Mon: { subject: 'Physics', teacher: 'Ayesha Khan', room: 'Lab 1' },
        Tue: { subject: 'Mathematics', teacher: 'Imran Shah', room: '101' },
        Wed: { subject: 'English', teacher: 'Sara Malik', room: '102' },
        Thu: { subject: 'Physics', teacher: 'Ayesha Khan', room: 'Lab 1' },
        Fri: { subject: 'Mathematics', teacher: 'Imran Shah', room: '101' },
      },
    },
  ],
  '10-A': [
    {
      period: 1,
      startTime: '08:00',
      endTime: '08:45',
      slots: {
        Mon: { subject: 'Chemistry', teacher: 'Fatima Noor', room: 'Lab 2' },
        Tue: { subject: 'Mathematics', teacher: 'Imran Shah', room: '201' },
        Wed: { subject: 'English', teacher: 'Sara Malik', room: '202' },
        Thu: { subject: 'Chemistry', teacher: 'Fatima Noor', room: 'Lab 2' },
        Fri: { subject: 'Physics', teacher: 'Ayesha Khan', room: 'Lab 1' },
      },
    },
  ],
};

export const timetableSectionOptions = Object.keys(mockTimetableBySection);

// —— G11 Subscription ——

export type SeatUsageSnapshot = {
  used: number;
  limit: number;
  planLabel: string;
  renewsOn: string;
  billingEmail: string;
};

export function getSeatUsage(slug: string): SeatUsageSnapshot {
  const defaults: Record<string, SeatUsageSnapshot> = {
    'green-valley': { used: 1240, limit: 1500, planLabel: 'Enterprise', renewsOn: 'Jun 1, 2026', billingEmail: 'billing@greenvalley.edu.pk' },
    'sunrise-academy': { used: 680, limit: 800, planLabel: 'Growth', renewsOn: 'Jun 1, 2026', billingEmail: 'admin@sunrise.edu.pk' },
    'city-model': { used: 420, limit: 500, planLabel: 'Growth', renewsOn: 'Jun 15, 2026', billingEmail: 'finance@citymodel.edu.pk' },
    'al-noor': { used: 210, limit: 300, planLabel: 'Starter', renewsOn: 'Jul 1, 2026', billingEmail: 'office@alnoor.edu.pk' },
    'beacon-house': { used: 890, limit: 1000, planLabel: 'Enterprise', renewsOn: 'Jun 1, 2026', billingEmail: 'accounts@beaconhouse.edu.pk' },
  };
  return defaults[slug] ?? { used: 420, limit: 500, planLabel: 'Growth', renewsOn: 'Jun 1, 2026', billingEmail: 'billing@school.edu.pk' };
}

// —— G12 School settings ——

export type ChatPolicySettings = {
  parentTeacherChat: boolean;
  studentFileAttachments: boolean;
  voiceNotes: boolean;
  externalLinks: boolean;
  moderationAutoFlag: boolean;
};

export type SchoolSettings = {
  timezone: string;
  chat: ChatPolicySettings;
};

export const timezoneOptions = [
  'Asia/Karachi',
  'Asia/Dubai',
  'Asia/Kolkata',
  'UTC',
];

export const defaultSchoolSettings: SchoolSettings = {
  timezone: 'Asia/Karachi',
  chat: {
    parentTeacherChat: true,
    studentFileAttachments: true,
    voiceNotes: false,
    externalLinks: false,
    moderationAutoFlag: true,
  },
};

export const chatPolicyLabels: Record<keyof ChatPolicySettings, { label: string; description: string }> = {
  parentTeacherChat: { label: 'Parent–teacher chat', description: 'Allow parents to message teachers directly' },
  studentFileAttachments: { label: 'Student file attachments', description: 'Students can attach images and PDFs in class chat' },
  voiceNotes: { label: 'Voice notes', description: 'Allow voice message recording in chat' },
  externalLinks: { label: 'External links', description: 'Allow sharing URLs in chat channels' },
  moderationAutoFlag: { label: 'Auto-moderation', description: 'Automatically flag messages for review' },
};
