// —— Teacher profile & classes ——

import { mockTimetableBySection, type TimetablePeriod } from './schoolAdminG4G12.mock';

export const teacherDemoProfile = {
  name: 'Ayesha Khan',
  email: 'ayesha.khan@school.edu.pk',
  subjects: ['Physics', 'Science'],
  classSections: ['9-A', '10-A'],
};

export type TodayClass = {
  id: string;
  time: string;
  classSection: string;
  subject: string;
  room: string;
  isNow: boolean;
};

export const mockTodayClasses: TodayClass[] = [
  { id: 'tc-1', time: '08:00 – 08:45', classSection: '9-A', subject: 'Physics', room: 'Lab 1', isNow: true },
  { id: 'tc-2', time: '09:40 – 10:25', classSection: '10-A', subject: 'Physics', room: 'Lab 1', isNow: false },
  { id: 'tc-3', time: '11:15 – 12:00', classSection: '9-B', subject: 'Science (cover)', room: '102', isNow: false },
];

// —— I2/I3 Homework ——

export type HomeworkStatus = 'draft' | 'published' | 'closed';

export type TeacherHomework = {
  id: string;
  title: string;
  classSection: string;
  dueDate: string;
  status: HomeworkStatus;
  submittedCount: number;
  totalStudents: number;
};

export const mockTeacherHomework: TeacherHomework[] = [
  { id: 'hw-1', title: 'Chapter 5 — Laws of motion', classSection: '9-A', dueDate: 'May 26, 2026', status: 'published', submittedCount: 18, totalStudents: 32 },
  { id: 'hw-2', title: 'Lab report: pendulum experiment', classSection: '10-A', dueDate: 'May 28, 2026', status: 'published', submittedCount: 12, totalStudents: 28 },
  { id: 'hw-3', title: 'Revision worksheet', classSection: '9-A', dueDate: 'May 30, 2026', status: 'draft', submittedCount: 0, totalStudents: 32 },
  { id: 'hw-4', title: 'Electricity MCQs', classSection: '10-A', dueDate: 'May 20, 2026', status: 'closed', submittedCount: 27, totalStudents: 28 },
];

// —— I4 Submissions ——

export type SubmissionStatus = 'pending' | 'graded';

export type HomeworkSubmission = {
  id: string;
  homeworkId: string;
  homeworkTitle: string;
  studentName: string;
  classSection: string;
  submittedAt: string;
  status: SubmissionStatus;
  grade: string | null;
  preview: string;
};

export const mockSubmissions: HomeworkSubmission[] = [
  { id: 'sub-1', homeworkId: 'hw-1', homeworkTitle: 'Chapter 5 — Laws of motion', studentName: 'Omar Khan', classSection: '9-A', submittedAt: 'May 24, 10:22', status: 'pending', grade: null, preview: 'Attached: problem_set.pdf' },
  { id: 'sub-2', homeworkId: 'hw-1', homeworkTitle: 'Chapter 5 — Laws of motion', studentName: 'Fatima Ahmed', classSection: '9-A', submittedAt: 'May 24, 09:15', status: 'pending', grade: null, preview: 'Completed all exercises in notebook photos.' },
  { id: 'sub-3', homeworkId: 'hw-2', homeworkTitle: 'Lab report: pendulum', studentName: 'Ayesha Siddiqui', classSection: '10-A', submittedAt: 'May 23, 16:40', status: 'graded', grade: 'A', preview: 'Lab report with graphs attached.' },
  { id: 'sub-4', homeworkId: 'hw-1', homeworkTitle: 'Chapter 5 — Laws of motion', studentName: 'Hassan Raza', classSection: '9-A', submittedAt: 'May 24, 11:05', status: 'pending', grade: null, preview: 'Short answers for Q1–Q5.' },
];

// —— I5 Class roster ——

export type RosterStudent = {
  id: string;
  studentId: string;
  name: string;
  classSection: string;
  parentPhone: string;
};

export const mockRosterByClass: Record<string, RosterStudent[]> = {
  '9-A': [
    { id: 'r-1', studentId: 'GV-2026-001', name: 'Omar Khan', classSection: '9-A', parentPhone: '+92 300 1234567' },
    { id: 'r-2', studentId: 'GV-2026-002', name: 'Fatima Ahmed', classSection: '9-A', parentPhone: '+92 321 9876543' },
    { id: 'r-3', studentId: 'GV-2026-003', name: 'Hassan Raza', classSection: '9-A', parentPhone: '+92 333 5551212' },
  ],
  '10-A': [
    { id: 'r-4', studentId: 'GV-2026-004', name: 'Ayesha Siddiqui', classSection: '10-A', parentPhone: '+92 345 7778899' },
    { id: 'r-5', studentId: 'GV-2026-006', name: 'Sara Bilal', classSection: '10-A', parentPhone: '+92 301 2223344' },
  ],
};

export const teacherClassOptions = ['9-A', '10-A'];

// —— I6 Class chat ——

export type ChatAttachment = {
  name: string;
  previewUrl?: string;
  mimeType?: string;
};

export type ChatMessage = {
  id: string;
  senderName: string;
  senderRole: 'teacher' | 'student';
  body: string;
  time: string;
  isOwn?: boolean;
  attachment?: ChatAttachment;
};

export const mockChatByClass: Record<string, ChatMessage[]> = {
  '9-A': [
    { id: 'm-1', senderName: 'Ayesha Khan', senderRole: 'teacher', body: 'Reminder: submit Chapter 5 by Monday.', time: '09:00', isOwn: true },
    { id: 'm-2', senderName: 'Omar Khan', senderRole: 'student', body: 'Ma’am, can we use graph paper for Q3?', time: '09:12' },
    { id: 'm-3', senderName: 'Fatima Ahmed', senderRole: 'student', body: 'Yes, graph paper is fine for Q3.', time: '09:18' },
    { id: 'm-4', senderName: 'Ayesha Khan', senderRole: 'teacher', body: 'Graph paper is fine for Q3. Upload clear photos.', time: '09:20', isOwn: true },
  ],
  '10-A': [
    { id: 'm-5', senderName: 'Ayesha Khan', senderRole: 'teacher', body: 'Lab report template is in the homework attachment.', time: 'Yesterday', isOwn: true },
    { id: 'm-6', senderName: 'Ayesha Siddiqui', senderRole: 'student', body: 'Submitted my report — please check.', time: 'Yesterday' },
  ],
};

// —— I7 Teacher timetable ——

export function getTeacherTimetable(): TimetablePeriod[] {
  return mockTimetableBySection['9-A'] ?? [];
}

// —— I8 Class announcement ——

export const classAnnouncementAudiences = [
  { id: '9-A', label: 'Grade 9-A' },
  { id: '10-A', label: 'Grade 10-A' },
];

export type ClassAnnouncement = {
  id: string;
  title: string;
  classSection: string;
  sentAt: string;
};

export const mockClassAnnouncements: ClassAnnouncement[] = [
  { id: 'ca-1', title: 'Lab safety briefing tomorrow', classSection: '9-A', sentAt: 'May 22, 2026' },
  { id: 'ca-2', title: 'Bring calculators for unit test', classSection: '10-A', sentAt: 'May 20, 2026' },
];
