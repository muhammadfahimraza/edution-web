import type { PlatformVideo } from '@/mocks/adminF4F9.mock';
import type { PlatformUser } from '@/mocks/adminF4F9.mock';
import { mockPlatformUsers } from '@/mocks/adminF4F9.mock';
import { getSchoolBranding, type SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';
import { mockTimetableBySection } from '@/mocks/schoolAdminG4G12.mock';
import type { TimetableCell, TimetableDay, TimetablePeriod } from '@/mocks/schoolAdminG4G12.mock';
import {
  mockSchoolTickets,
  type SchoolTicketDetail,
  type TicketMessage,
} from '@/mocks/sharedK.mock';

export type SchoolBrandingSession = SchoolBranding & {
  logoDataUrl?: string;
};

export type DemoSessionState = {
  brandingBySlug: Record<string, SchoolBrandingSession>;
  tickets: Record<string, SchoolTicketDetail>;
  timetable: Record<string, TimetablePeriod[]>;
  videoStatus: Record<string, PlatformVideo['status']>;
  platformUsers: PlatformUser[];
};

function cloneTimetable(): Record<string, TimetablePeriod[]> {
  return JSON.parse(JSON.stringify(mockTimetableBySection)) as Record<string, TimetablePeriod[]>;
}

export function createInitialDemoSession(): DemoSessionState {
  return {
    brandingBySlug: {},
    tickets: JSON.parse(JSON.stringify(mockSchoolTickets)) as Record<string, SchoolTicketDetail>,
    timetable: cloneTimetable(),
    videoStatus: {},
    platformUsers: [...mockPlatformUsers],
  };
}

export function getBrandingForSlug(
  state: DemoSessionState,
  slug: string,
): SchoolBrandingSession {
  return state.brandingBySlug[slug] ?? getSchoolBranding(slug);
}

export function appendTicketMessage(
  tickets: Record<string, SchoolTicketDetail>,
  ticketId: string,
  message: TicketMessage,
): Record<string, SchoolTicketDetail> {
  const ticket = tickets[ticketId];
  if (!ticket) {
    return tickets;
  }
  return {
    ...tickets,
    [ticketId]: {
      ...ticket,
      messages: [...ticket.messages, message],
      status: ticket.status === 'open' ? 'in_progress' : ticket.status,
    },
  };
}

export function escalateTicketInState(
  tickets: Record<string, SchoolTicketDetail>,
  ticketId: string,
): Record<string, SchoolTicketDetail> {
  const ticket = tickets[ticketId];
  if (!ticket) {
    return tickets;
  }
  const systemMsg: TicketMessage = {
    id: `m-${Date.now()}`,
    author: 'System',
    role: 'system',
    body: 'Ticket escalated to Edu Station L2 queue.',
    sentAt: 'Just now',
  };
  return {
    ...tickets,
    [ticketId]: {
      ...ticket,
      escalated: true,
      status: 'escalated',
      messages: [...ticket.messages, systemMsg],
    },
  };
}

export function updateTimetableCell(
  timetable: Record<string, TimetablePeriod[]>,
  section: string,
  period: number,
  day: TimetableDay,
  cell: TimetableCell,
): Record<string, TimetablePeriod[]> {
  const periods = timetable[section];
  if (!periods) {
    return timetable;
  }
  return {
    ...timetable,
    [section]: periods.map(p => {
      if (p.period !== period) {
        return p;
      }
      return {
        ...p,
        slots: { ...p.slots, [day]: cell },
      };
    }),
  };
}
