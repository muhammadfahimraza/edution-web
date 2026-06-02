/** Canonical roles for docs and future auth integration */
export type PlatformRole = 'platform_admin';
export type SchoolRole = 'school_admin' | 'principal' | 'teacher' | 'field';
export type AppRole = 'student' | 'parent';

export type EduStationRole = PlatformRole | SchoolRole | AppRole;

export const roleLabels: Record<EduStationRole, string> = {
  platform_admin: 'Platform admin',
  school_admin: 'School admin',
  principal: 'Principal',
  teacher: 'Teacher',
  field: 'Field assessor',
  student: 'Student',
  parent: 'Parent',
};
