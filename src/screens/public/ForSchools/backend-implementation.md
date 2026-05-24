# Backend implementation — E6 For schools lead form

## Overview
Sales lead capture at `/for-schools` — school name, contact, email, phone, size, message.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Request demo | Submit | Create CRM lead + confirmation email |

## Data requirements
### Writes
- `POST /leads/schools` — form payload

## API endpoints (proposed)
| Method | Path | Request | Response |
|--------|------|---------|----------|
| POST | `/leads/schools` | `{ schoolName, contactName, email, phone?, size, message? }` | `{ leadId }` |

## Auth & permissions
Public. Rate limit by IP.

## Real-time / jobs
Notify sales team (email/Slack). Optional HubSpot/CRM sync.

## Edge cases
| Case | Behavior |
|------|----------|
| Duplicate school | Merge or flag in CRM |
| Spam | CAPTCHA (future) |

## Open questions
1. Auto-schedule Calendly on submit?
