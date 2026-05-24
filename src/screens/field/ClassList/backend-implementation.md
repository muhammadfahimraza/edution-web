# Backend implementation — J3 Class list for visit

## Overview
Classes to assess during visit. Route: `/s/{slug}/field/visits/{id}/classes`.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Load screen | Page mount | Fetch scoped data for authenticated role |
| Primary CTA | Button / form submit | Persist change and refresh list/detail |
| Filters / tabs | Control change | Re-query with filter params |

## Data requirements
### Reads
- Role-scoped GET for list/detail entities shown on this screen
- Pagination, search, and sort query params where table/filters exist

### Writes
- POST/PATCH/DELETE for create, update, toggle, or workflow actions triggered in UI

## API endpoints (proposed)
| Method | Path | Request | Response | Errors |
|--------|------|---------|----------|--------|
| GET | Screen-specific collection or detail | Query/body per entity | JSON payload | 401, 403, 404 |

## Auth & permissions
- **Role:** Field assessor
- Tenant scoped by school `slug` where applicable

## Real-time / jobs
Optional push or websocket updates for queues/inboxes; background jobs for imports/exports.

## Edge cases
Empty lists, not found, validation errors, rate limits, offline sync (field assessor).

## Dependencies
Adjacent screens in the same portal; shared components (DataTable, TicketThread, etc.).

## Open questions
Product rules for validation, retention, and cross-portal visibility to confirm before backend build.
