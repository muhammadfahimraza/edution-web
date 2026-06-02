# Backend implementation — F18 Platform analytics

## Overview
Product analytics hub at `/admin/analytics` with tabs: Overview, Schools, Learning, Support, Comms.

## User actions
| UI action | Expected behavior |
|-----------|-------------------|
| Change tab | Load tab-specific aggregates |
| Apply filters | Refetch with `preset`, `termId`, `schoolId` query params |
| Export | (future) CSV per tab |

## Data requirements
### Reads
- `GET /admin/analytics/overview?from=&to=&schoolId=`
- `GET /admin/analytics/schools?from=&to=`
- `GET /admin/analytics/learning?from=&to=`
- `GET /admin/analytics/support?from=&to=`
- `GET /admin/analytics/comms?from=&to=`

### Writes
None.

## Auth & permissions
- `platform_admin` only

## Dependencies
- F1 dashboard, F17 SMS health, F14 tickets
