'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { filtersToSearchParams, parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { defaultFilters, type AnalyticsFilters } from '@/lib/analytics/types';

export function useAnalyticsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseAnalyticsFilters(searchParams),
    [searchParams],
  );

  const [draft, setDraft] = useState<AnalyticsFilters>(filters);

  const syncDraft = useCallback(() => {
    setDraft(filters);
  }, [filters]);

  const apply = useCallback(() => {
    const qs = filtersToSearchParams(draft);
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }, [draft, pathname, router]);

  const reset = useCallback(() => {
    setDraft(defaultFilters);
    router.push(pathname);
  }, [pathname, router]);

  return {
    filters,
    draft,
    setDraft,
    apply,
    reset,
    syncDraft,
  };
}
