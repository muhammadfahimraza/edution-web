# Backend implementation — F2 Schools list

## Overview
Table of all tenant schools at `/admin/schools` with search, status filter, and link to onboarding.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Search | Input debounce | Filter by name, slug, country |
| Status filter | Chip click | Query `status` param |
| Add school | CTA | Navigate to F3 |
| View school | Row action | School admin shell `/s/{slug}/admin` (G1+) |

## Data requirements
### Reads
- `GET /admin/schools?search=&status=&page=&limit=` — paginated list with plan, seats, status

### Writes
None on list screen.

## API endpoints (proposed)
- `GET /admin/schools`
- `PATCH /admin/schools/{id}/status` — suspend/activate (future row menu)

## Auth & permissions
- Platform super-admin only

## Dependencies
- F3 create school
- G1 school admin dashboard per tenant

## Open questions
1. Export CSV for billing ops?
2. Impersonate school admin for support — audit trail required?
