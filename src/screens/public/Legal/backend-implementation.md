# Backend implementation — E7 Legal pages

## Overview
Privacy and Terms at `/legal/privacy` and `/legal/terms`. Static content with last-updated date.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| View document | Page load | Render legal copy |
| Switch tab | Privacy / Terms links | Navigate sibling slug |

## Data requirements
### Reads
- Static markdown/JSON or CMS (`GET /legal/:slug`)

### Writes
None (public read-only).

## API endpoints (proposed)
| Method | Path | Response |
|--------|------|----------|
| GET | `/legal/:slug` | `{ title, updatedAt, sections[] }` |

## Auth & permissions
Public.

## Dependencies
- Footer links from E1
- Mobile A12 terms acceptance copy alignment

## Open questions
1. Locale-specific legal (Urdu) when i18n ships?
