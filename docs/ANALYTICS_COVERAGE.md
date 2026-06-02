# Analytics & control coverage (edution-web)

UI-first analytics layer with **Recharts**, shared **`AnalyticsToolbar`**, and parameterized mocks under `src/mocks/analytics/`.

## Roles

| Role | Platform `/admin` | School `/s/{slug}/admin` | Principal `/s/{slug}/principal` |
|------|-------------------|--------------------------|----------------------------------|
| `platform_admin` | F1, F18, F4/F13/F14/F17 charts | — | — |
| `school_admin` | — | G1, G13–G19 | — |
| `principal` | — | — | H1–H10 (shared report views) |

Canonical types: `src/lib/auth/roles.ts`

## Shared controls

- **Date range:** 7d / 30d / 90d / term (`AnalyticsToolbar`)
- **Term & class:** school-scoped reports
- **School filter:** platform F1, F18
- **URL params:** `?preset=&termId=&classId=&schoolId=`
- **Export CSV:** report pages + export center (`downloadCsv`)

## Screen matrix

| ID | Route | Charts | Filters | Export | Mock module |
|----|-------|--------|---------|--------|-------------|
| F1 | `/admin` | Line, stacked bar | Date, school | — | `platformAnalytics.mock.ts` |
| F18 | `/admin/analytics` | Line, bar, stacked, donut | Date, school | — | `platformAnalytics.mock.ts` |
| F4 | `/admin/billing` | Line, bar | — | — | `platformAnalytics.mock.ts` |
| F13 | `/admin/leaderboards` | Bar | Term (local) | — | `platformAnalytics.mock.ts` |
| F14 | `/admin/tickets` | Bar ×2 | — | — | `platformAnalytics.mock.ts` |
| F17 | `/admin/sms-health` | Line | — | — | `platformAnalytics.mock.ts` |
| G1 | `/s/{slug}/admin` | Line ×3 | Date, term, class | — | `schoolAnalytics.mock.ts` |
| G13 | `…/reports/homework` | Line, stacked | Full toolbar | CSV | `schoolAnalytics.mock.ts` |
| G14 | `…/reports/engagement` | Line, bar | Full toolbar | CSV | `schoolAnalytics.mock.ts` |
| G15 | `…/reports/leaderboards` | Table | Term | — | `schoolAnalytics.mock.ts` |
| G16 | `…/reports/visits` | Table | — | — | `schoolAnalytics.mock.ts` |
| G17 | `…/reports/attendance` | Line | Full toolbar | CSV | `schoolAnalytics.mock.ts` |
| G18 | `…/reports/chat` | Table | — | — | `schoolAnalytics.mock.ts` |
| G19 | `…/reports/export` | — | — | CSV (real) | `principal.mock.ts` + analytics |
| H2 | `…/principal/homework` | Same as G13 | Shared view | CSV | Shared |
| H8 | `…/principal/engagement` | Same as G14 | Shared view | CSV | Shared |
| H3 | `…/principal/attendance` | Same as G17 | Shared view | CSV | Shared |

Shared report components: `src/screens/shared/reports/`

## Proposed APIs (document only)

- `GET /admin/platform/kpis?from=&to=`
- `GET /admin/analytics/overview|schools|learning|support|comms`
- `GET /schools/{slug}/admin/analytics/homework|engagement|attendance?…`
- `GET /schools/{slug}/reports/export?type=`

See per-screen `backend-implementation.md` files.
