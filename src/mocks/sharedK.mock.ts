// —— K1 School-side tickets ——

export type TicketMessage = {
  id: string;
  author: string;
  role: 'parent' | 'staff' | 'system';
  body: string;
  sentAt: string;
};

export type SchoolTicketDetail = {
  id: string;
  subject: string;
  category: string;
  requester: string;
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  escalated: boolean;
  messages: TicketMessage[];
};

export const mockSchoolTickets: Record<string, SchoolTicketDetail> = {
  'tk-1': {
    id: 'tk-1',
    subject: 'Parent cannot see homework grades',
    category: 'Account',
    requester: 'Hassan Ali (parent)',
    status: 'open',
    priority: 'medium',
    createdAt: 'May 22, 2026',
    escalated: false,
    messages: [
      { id: 'm-1', author: 'Hassan Ali', role: 'parent', body: 'I can see homework listed but grades show as blank for my son Omar.', sentAt: 'May 22, 09:14' },
      { id: 'm-2', author: 'School support', role: 'staff', body: 'Thanks for reporting. We are checking the grade sync for Class 9-A.', sentAt: 'May 22, 11:30' },
      { id: 'm-3', author: 'Hassan Ali', role: 'parent', body: 'Any update? Still not visible on my end.', sentAt: 'May 24, 08:02' },
    ],
  },
  'tk-2': {
    id: 'tk-2',
    subject: 'SMS notifications not received',
    category: 'Technical',
    requester: 'Fatima Noor (parent)',
    status: 'escalated',
    priority: 'high',
    createdAt: 'May 19, 2026',
    escalated: true,
    messages: [
      { id: 'm-4', author: 'Fatima Noor', role: 'parent', body: 'Not receiving SMS for homework reminders since last week.', sentAt: 'May 19, 14:20' },
      { id: 'm-5', author: 'School support', role: 'staff', body: 'Verified your number is correct. Escalated to platform support.', sentAt: 'May 20, 10:00' },
      { id: 'm-6', author: 'System', role: 'system', body: 'Ticket escalated to Edu Station L2 queue.', sentAt: 'May 20, 10:01' },
    ],
  },
  'tk-3': {
    id: 'tk-3',
    subject: 'Request seat increase',
    category: 'Billing',
    requester: 'School admin',
    status: 'in_progress',
    priority: 'low',
    createdAt: 'May 23, 2026',
    escalated: false,
    messages: [
      { id: 'm-7', author: 'Admin', role: 'staff', body: 'We need 50 additional seats for new Grade 6 intake.', sentAt: 'May 23, 09:00' },
    ],
  },
  'tk-4': {
    id: 'tk-4',
    subject: 'Student app login issue',
    category: 'Account',
    requester: 'Omar Khan (student)',
    status: 'resolved',
    priority: 'medium',
    createdAt: 'May 16, 2026',
    escalated: false,
    messages: [
      { id: 'm-8', author: 'Omar Khan', role: 'parent', body: 'OTP not arriving on trusted device.', sentAt: 'May 16, 16:45' },
      { id: 'm-9', author: 'School support', role: 'staff', body: 'Reset trusted device flag. Please try login again.', sentAt: 'May 16, 17:10' },
      { id: 'm-10', author: 'Omar Khan', role: 'parent', body: 'Working now, thank you!', sentAt: 'May 16, 17:22' },
    ],
  },
};

export function getSchoolTicket(ticketId: string): SchoolTicketDetail | undefined {
  return mockSchoolTickets[ticketId];
}

// —— K2 User profile ——

export type StaffProfile = {
  name: string;
  email: string;
  role: string;
  phone: string;
  schoolName: string;
};

export function getStaffProfile(_slug: string): StaffProfile {
  return {
    name: 'Sara Malik',
    email: 'sara.malik@school.edu.pk',
    role: 'Principal',
    phone: '+92 300 1112233',
    schoolName: 'Green Valley International School',
  };
}

// —— K3 Notifications ——

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  href?: string;
};

export const mockNotifications: NotificationItem[] = [
  { id: 'n-1', title: 'Ticket escalated', body: 'SMS notifications — Fatima Noor', time: '2h ago', read: false, href: '/tickets/tk-2' },
  { id: 'n-2', title: 'New homework submission', body: '18 submissions in Grade 9-A', time: '4h ago', read: false },
  { id: 'n-3', title: 'Field visit scheduled', body: 'City Model School — May 28', time: 'Yesterday', read: true },
  { id: 'n-4', title: 'Import completed', body: '142 students added successfully', time: 'May 22', read: true },
  { id: 'n-5', title: 'Chat flagged', body: 'Message pending review in Grade 9-A', time: 'May 21', read: true },
];
