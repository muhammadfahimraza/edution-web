# Backend implementation — G2 Branding & white-label

## Overview
Branding editor at `/s/{slug}/admin/branding` — display name, logo upload, primary color, live preview.

## User actions (UI → future API)
| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| Save changes | Header CTA | Persist branding settings |
| Logo upload | File input | Upload to object storage, return URL |
| Color pick | Swatch / color input | Update primary brand color |

## Data requirements
### Reads
- `GET /schools/{slug}/branding` — displayName, logoUrl, primaryColor, plan tier

### Writes
- `PUT /schools/{slug}/branding` — update branding fields
- `POST /schools/{slug}/branding/logo` — multipart upload

## API endpoints (proposed)
- `GET /schools/{slug}/branding`
- `PUT /schools/{slug}/branding`
- `POST /schools/{slug}/branding/logo`

## Auth & permissions
- School admin only
- Enterprise-only fields (custom domain) gated by plan

## Dependencies
- WhiteLabelPreview component (mobile + web mock)
- CDN for logo assets

## Open questions
1. Secondary/accent colors needed for v1?
2. Logo crop/aspect ratio requirements for mobile header?
