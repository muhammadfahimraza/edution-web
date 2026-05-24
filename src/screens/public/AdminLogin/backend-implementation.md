# Backend implementation — E3 Platform admin login

## Overview
Super-admin login at `/admin/login` with stricter dark header styling.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Sign in | Form submit | Authenticate → `/admin` dashboard (F1) |

## Data requirements
### Writes
- `POST /auth/admin/login` — `{ email, password }`

## API endpoints (proposed)
| Method | Path | Response |
|--------|------|----------|
| POST | `/auth/admin/login` | `{ accessToken, role: 'super_admin' }` |

## Auth & permissions
Platform super-admin only. Separate credential store from school staff.

## Edge cases
| Case | Behavior |
|------|----------|
| Brute force | Rate limit + lockout |
| Non-admin email | 403 |

## Dependencies
- F1 admin dashboard

## Open questions
1. IP allowlist for admin?
