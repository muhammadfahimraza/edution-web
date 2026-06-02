# Backend implementation — Order 0 Foundation (design system)

## Overview

Web UI foundation: CSS design tokens, reusable primitives (`Button`, `Input`, `Card`, `Badge`, `Spinner`), and `EduStationLogo` (`public/edu-station-logo.png`, same asset as mobile). No API calls in this phase.

## User actions (UI → future API)

| UI action | Trigger | Expected behavior |
|-----------|---------|-------------------|
| None | — | Showcase only |

## Data requirements

None for Order 0.

## API endpoints (proposed)

| Method | Path | Response | Notes |
|--------|------|----------|-------|
| GET | `/schools/:slug/branding` | `{ logoUrl?, primaryColor, displayName }` | Future white-label; web layout injects CSS variables |

## Auth & permissions

Not applicable.

## Dependencies

All future web screens under `src/app` should consume `src/components/ui` and CSS variables from `globals.css`.

## Open questions

1. Replace inline SVG component with `next/image` when final logo asset is provided?
2. Add shadcn/ui generator for advanced data tables in school admin screens?
