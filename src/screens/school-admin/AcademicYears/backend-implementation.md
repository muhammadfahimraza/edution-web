# Backend implementation — G3 Academic years / terms

## Overview
Calendar management at `/s/{slug}/admin/academic-years` — years table, terms per year, set current year/term.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Add year | Header CTA | Create academic year |
| Add term | Section CTA | Create term under selected year |
| Set current year | Row action | Mark one year as current, archive previous |
| Set current term | Row action | Mark one term as current globally |

## Data requirements
### Reads
- `GET /schools/{slug}/academic-years?include=terms`

### Writes
- `POST /schools/{slug}/academic-years`
- `POST /schools/{slug}/academic-years/{yearId}/terms`
- `PATCH /schools/{slug}/academic-years/{yearId}/current`
- `PATCH /schools/{slug}/terms/{termId}/current`

## API endpoints (proposed)
- `GET /schools/{slug}/academic-years`
- `POST /schools/{slug}/academic-years`
- `POST /schools/{slug}/academic-years/{yearId}/terms`
- `PATCH /schools/{slug}/terms/{termId}`

## Auth & permissions
- School admin only

## Dependencies
- G10 timetable, H2 reports, B7 student timetable — all scoped to current term

## Open questions
1. Overlapping terms allowed (e.g. summer + fall)?
2. Archive behavior for historical homework data?
