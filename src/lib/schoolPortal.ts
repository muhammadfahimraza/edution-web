export function schoolFieldBasePath(slug: string): string {
  return `/s/${slug}/field`;
}

export type StaffPortalRole = 'admin' | 'principal' | 'teacher' | 'field';

/** Demo routing from staff login email */
export function inferStaffPortalRole(email: string): StaffPortalRole {
  const lower = email.toLowerCase();
  if (lower.includes('field') || lower.includes('assessor')) return 'field';
  if (lower.includes('principal') || lower.includes('head')) return 'principal';
  if (lower.includes('teacher')) return 'teacher';
  return 'admin';
}

export function staffPortalPath(slug: string, role: StaffPortalRole): string {
  if (role === 'field') return schoolFieldBasePath(slug);
  if (role === 'principal') return `/s/${slug}/principal`;
  if (role === 'teacher') return `/s/${slug}/teacher`;
  return `/s/${slug}/admin`;
}

// Re-export for existing imports
export function schoolTeacherBasePath(slug: string): string {
  return `/s/${slug}/teacher`;
}

export function schoolPrincipalBasePath(slug: string): string {
  return `/s/${slug}/principal`;
}

export function schoolAdminBasePath(slug: string): string {
  return `/s/${slug}/admin`;
}
