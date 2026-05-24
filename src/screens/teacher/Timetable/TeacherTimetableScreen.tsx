'use client';

import { TimetableGrid } from '@/components/admin/TimetableGrid';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { getTeacherTimetable } from '@/mocks/teacher.mock';

export function TeacherTimetableScreen() {
  const periods = getTeacherTimetable();

  return (
    <>
      <AdminPageHeader title="My timetable" subtitle="Weekly teaching schedule" />
      <TimetableGrid periods={periods} />
    </>
  );
}
