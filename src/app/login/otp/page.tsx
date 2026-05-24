import { Suspense } from 'react';
import { StaffOtpScreen } from '@/screens/public/StaffOtp/StaffOtpScreen';

export default function StaffOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-full items-center justify-center p-8">Loading…</div>
      }>
      <StaffOtpScreen />
    </Suspense>
  );
}
