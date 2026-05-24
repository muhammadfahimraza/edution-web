# Backend implementation — F3 School onboarding wizard

## Overview
Multi-step wizard at `/admin/schools/new`: school info → URL slug → branding preview → plan selection → provision tenant.

## User actions (UI → future API)
| Step | Fields | Expected behavior |
|------|--------|-------------------|
| Info | name, country, contactEmail | Validate; store draft |
| Slug | slug | `GET /admin/schools/slug-available?slug=` |
| Branding | primaryColor | Optional logo upload → storage (G2) |
| Plan | tier | Attach subscription template |
| Submit | — | `POST /admin/schools` — create tenant, DNS/subdomain, seed roles |

## Data requirements
### Reads
- Slug availability check
- `GET /admin/plans` — plan tiers and seat limits

### Writes
- `POST /admin/schools` body: `{ name, country, contactEmail, slug, branding, planTier }`
- Async jobs: invite email, default academic year, feature flags

## API endpoints (proposed)
- `GET /admin/schools/check-slug?slug=`
- `POST /admin/schools`
- `POST /admin/schools/{id}/invite-contact`

## Auth & permissions
- Platform super-admin only
- Idempotency key on create to prevent double-submit

## Dependencies
- F2 list refresh after create
- G2 branding screen for ongoing edits
- Billing (F4) for seat enforcement

## Open questions
1. Draft wizard state in DB vs session?
2. Logo upload in wizard or deferred to G2?
3. Default subdomain pattern: `slug.edustation.pk` vs path `/s/slug`?
