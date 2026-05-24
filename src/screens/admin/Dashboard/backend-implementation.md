# Backend implementation — F1 Platform dashboard

## Overview
Super-admin home at `/admin` — KPI cards, schools onboarded chart, and L2 ticket SLA table.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Add school | Header CTA | Navigate to F3 `/admin/schools/new` |
| View ticket row | (future) | Open F14 ticket detail |

## Data requirements
### Reads
- `GET /admin/platform/kpis` — active schools, student count, open L2 tickets, pending videos
- `GET /admin/platform/schools-chart?months=6` — monthly onboard count
- `GET /admin/tickets?level=2&status=open,escalated&sort=age` — SLA queue preview

### Writes
None on dashboard.

## API endpoints (proposed)
- `GET /admin/platform/summary`
- `GET /admin/analytics/schools-onboarded`
- `GET /admin/tickets/sla-preview`

## Auth & permissions
- Platform super-admin JWT/session only
- Rate-limit and audit log all access

## Dependencies
- F2 schools list, F3 onboarding, F14 escalated tickets (full queue)

## Open questions
1. Real-time KPI refresh vs cached aggregates?
2. Chart granularity: calendar month vs rolling 30 days?
