# Backend implementation — G1 School admin dashboard

## Overview
School admin home at `/s/{slug}/admin` — KPI cards, enrollment chart, and recent activity feed.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Manage terms | Header CTA | Navigate to G3 |
| Quick setup links | Buttons | G2 branding, G3 terms, G7 import (future) |

## Data requirements
### Reads
- `GET /schools/{slug}/admin/summary` — students, teachers, classes, seat usage
- `GET /schools/{slug}/admin/enrollment-chart?months=6`
- `GET /schools/{slug}/admin/activity?limit=10`

### Writes
None on dashboard.

## API endpoints (proposed)
- `GET /schools/{slug}/admin/dashboard`

## Auth & permissions
- School admin role for the tenant only
- Slug must match user's assigned school

## Dependencies
- G3 academic years for term CTA
- G7 CSV import for quick setup

## Open questions
1. Should principals see a subset of these KPIs on H1?
2. Real-time activity feed vs daily digest?
