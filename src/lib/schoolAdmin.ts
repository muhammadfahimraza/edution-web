import { mockAdminSchools, type AdminSchool } from '@/mocks/adminPlatform.mock';

export { schoolAdminBasePath } from '@/lib/schoolPortal';

export function getSchoolBySlug(slug: string): AdminSchool | undefined {
  return mockAdminSchools.find(s => s.slug === slug);
}

export function isValidSchoolSlug(slug: string): boolean {
  return mockAdminSchools.some(s => s.slug === slug);
}
