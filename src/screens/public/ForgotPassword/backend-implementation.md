# Backend implementation — E4 Forgot password

## Overview
Password reset request at `/login/forgot` — email input and confirmation state.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Send reset link | Submit | Email reset token (always show success for privacy) |

## Data requirements
### Writes
- `POST /auth/staff/forgot-password` — `{ email }`

## API endpoints (proposed)
| Method | Path | Response |
|--------|------|----------|
| POST | `/auth/staff/forgot-password` | 204 (always) |

## Auth & permissions
Public. Do not reveal whether email exists.

## Real-time / jobs
Email job with time-limited reset token.

## Dependencies
- Email provider
- Reset password confirm page (future)

## Open questions
1. Same flow for admin vs staff?
