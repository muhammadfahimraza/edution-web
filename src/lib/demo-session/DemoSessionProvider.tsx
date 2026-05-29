'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PlatformVideo } from '@/mocks/adminF4F9.mock';
import type { PlatformUser } from '@/mocks/adminF4F9.mock';
import type { SchoolTicketDetail, TicketMessage } from '@/mocks/sharedK.mock';
import type { TimetableCell, TimetableDay } from '@/mocks/schoolAdminG4G12.mock';
import {
  appendTicketMessage,
  createInitialDemoSession,
  escalateTicketInState,
  getBrandingForSlug,
  updateTimetableCell,
  type DemoSessionState,
  type SchoolBrandingSession,
} from './store';

type DemoSessionContextValue = {
  getBranding: (slug: string) => SchoolBrandingSession;
  saveBranding: (slug: string, branding: SchoolBrandingSession) => void;
  getTicket: (ticketId: string) => SchoolTicketDetail | undefined;
  appendTicketReply: (ticketId: string, body: string, author?: string) => void;
  escalateTicket: (ticketId: string) => void;
  getTimetable: (section: string) => DemoSessionState['timetable'][string];
  patchTimetableCell: (
    section: string,
    period: number,
    day: TimetableDay,
    cell: TimetableCell,
  ) => void;
  getVideoStatus: (videoId: string, fallback: PlatformVideo['status']) => PlatformVideo['status'];
  setVideoStatus: (videoId: string, status: PlatformVideo['status']) => void;
  platformUsers: PlatformUser[];
  setPlatformUserStatus: (userId: string, status: PlatformUser['status']) => void;
};

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null);

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(createInitialDemoSession);

  const getBranding = useCallback(
    (slug: string) => getBrandingForSlug(state, slug),
    [state],
  );

  const saveBranding = useCallback((slug: string, branding: SchoolBrandingSession) => {
    setState(prev => ({
      ...prev,
      brandingBySlug: { ...prev.brandingBySlug, [slug]: branding },
    }));
  }, []);

  const getTicket = useCallback(
    (ticketId: string) => state.tickets[ticketId],
    [state.tickets],
  );

  const appendTicketReply = useCallback(
    (ticketId: string, body: string, author = 'School support') => {
      const message: TicketMessage = {
        id: `m-${Date.now()}`,
        author,
        role: 'staff',
        body,
        sentAt: 'Just now',
      };
      setState(prev => ({
        ...prev,
        tickets: appendTicketMessage(prev.tickets, ticketId, message),
      }));
    },
    [],
  );

  const escalateTicket = useCallback((ticketId: string) => {
    setState(prev => ({
      ...prev,
      tickets: escalateTicketInState(prev.tickets, ticketId),
    }));
  }, []);

  const getTimetable = useCallback(
    (section: string) => state.timetable[section] ?? [],
    [state.timetable],
  );

  const patchTimetableCell = useCallback(
    (section: string, period: number, day: TimetableDay, cell: TimetableCell) => {
      setState(prev => ({
        ...prev,
        timetable: updateTimetableCell(prev.timetable, section, period, day, cell),
      }));
    },
    [],
  );

  const getVideoStatus = useCallback(
    (videoId: string, fallback: PlatformVideo['status']) =>
      state.videoStatus[videoId] ?? fallback,
    [state.videoStatus],
  );

  const setVideoStatus = useCallback((videoId: string, status: PlatformVideo['status']) => {
    setState(prev => ({
      ...prev,
      videoStatus: { ...prev.videoStatus, [videoId]: status },
    }));
  }, []);

  const setPlatformUserStatus = useCallback(
    (userId: string, status: PlatformUser['status']) => {
      setState(prev => ({
        ...prev,
        platformUsers: prev.platformUsers.map(u =>
          u.id === userId ? { ...u, status } : u,
        ),
      }));
    },
    [],
  );

  const value = useMemo<DemoSessionContextValue>(
    () => ({
      getBranding,
      saveBranding,
      getTicket,
      appendTicketReply,
      escalateTicket,
      getTimetable,
      patchTimetableCell,
      getVideoStatus,
      setVideoStatus,
      platformUsers: state.platformUsers,
      setPlatformUserStatus,
    }),
    [
      getBranding,
      saveBranding,
      getTicket,
      appendTicketReply,
      escalateTicket,
      getTimetable,
      patchTimetableCell,
      getVideoStatus,
      setVideoStatus,
      state.platformUsers,
      setPlatformUserStatus,
    ],
  );

  return (
    <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>
  );
}

export function useDemoSession() {
  const ctx = useContext(DemoSessionContext);
  if (!ctx) {
    throw new Error('useDemoSession must be used within DemoSessionProvider');
  }
  return ctx;
}
