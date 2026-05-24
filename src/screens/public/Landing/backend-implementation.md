# Backend implementation — E1 Marketing landing

## Overview
Public homepage at `/` — hero, feature grid, and for-schools CTA. No authentication required.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Request demo | Hero / CTA buttons | Navigate to E6 |
| Staff sign in | Button | Navigate to E2 |
| Header links | Nav | Route to E6, E2, legal |

## Data requirements
### Reads
None — static marketing content (CMS optional later).

### Writes
None.

## API endpoints (proposed)
Optional: `GET /cms/landing` for editable copy.

## Auth & permissions
Public.

## Dependencies
- E6 for-schools form
- E2 staff login

## Open questions
1. CMS-driven hero vs static?
