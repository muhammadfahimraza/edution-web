'use client';

import { EmptyState } from '@/components/admin/EmptyState';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';

export function PrincipalAttendanceScreen() {
  return (
    <>
      <AdminPageHeader
        title="Attendance"
        subtitle="Daily and period attendance tracking"
        actions={<Badge label="Coming soon" variant="accent" />}
      />
      <EmptyState
        title="Attendance reporting is coming soon"
        description="Track daily presence, late arrivals, and absence patterns by class. This module will integrate with your school’s attendance policy in a future release."
      />
    </>
  );
}
