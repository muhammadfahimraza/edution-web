# Backend implementation — E5 Staff OTP

## Overview
OTP verification fallback at `/login/otp` when MFA or passwordless staff login is required.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Verify OTP | Submit 6 digits | Issue session |
| Resend | Link after countdown | Send new OTP |

## Data requirements
### Writes
- `POST /auth/staff/otp/verify` — `{ email, code }`
- `POST /auth/staff/otp/resend` — `{ email }`

## API endpoints (proposed)
| Method | Path | Response |
|--------|------|----------|
| POST | `/auth/staff/otp/verify` | Session tokens |
| POST | `/auth/staff/otp/resend` | 204 |

## Auth & permissions
Pre-auth challenge token from E2 login step.

## Edge cases
| Case | Behavior |
|------|----------|
| Expired OTP | Error + resend |
| Rate limit resend | 429 |

## Dependencies
- SMS/email OTP provider (shared with mobile parent OTP)

## Open questions
1. TOTP app support for staff?
