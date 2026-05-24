# Backend implementation — E2 Staff login

## Overview
School staff authentication at `/login` — email, password, optional school slug.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Sign in | Form submit | Authenticate → school role dashboard |
| Forgot password | Link | Navigate E4 |
| Admin login | Link | Navigate E3 |
| OTP fallback | Password `otp-demo` (UI) | Navigate E5 |

## Data requirements
### Reads
None on form.

### Writes
- `POST /auth/staff/login` — `{ email, password, schoolSlug? }`

## API endpoints (proposed)
| Method | Path | Request | Response | Errors |
|--------|------|---------|----------|--------|
| POST | `/auth/staff/login` | credentials | `{ accessToken, role, schoolSlug }` | 401, 403 |

## Auth & permissions
Returns JWT scoped to school + role (teacher, principal, admin).

## Edge cases
| Case | Behavior |
|------|----------|
| Wrong password | 401 message |
| MFA required | Redirect E5 OTP |
| Unknown slug | 404 school |

## Dependencies
- School staff accounts (G5)
- Role-based redirect to `/s/[slug]/teacher` etc.

## Open questions
1. SSO for larger school groups?
