# Edu Station — front-end demo guide

This document describes how to exercise **UI-only** flows in `edution-web` and `edution-app`. There is no backend: files stay on-device, and web state resets on browser refresh (session-only `DemoSessionProvider`).

## Demo credentials

| Flow | How to sign in |
|------|----------------|
| Staff password | Any email with password ≥ 6 chars; optional school slug (default `green-valley`) |
| Staff OTP | Password `otp-demo` on login → OTP `123456` on `/login/otp` |
| Staff role routing | Email contains `teacher`, `principal`, `field`, or `assessor` to route portals |
| Mobile OTP | `123456` on student/parent auth screens |

Default country code: **+92** (Pakistan).

## Web — what is functional

| Area | Screen IDs | Behavior |
|------|------------|----------|
| Toast feedback | All former `alert()` screens | Bottom-right toast; validation uses `error` variant |
| Session store | Branding, tickets, timetable, video moderation, user suspend | `DemoSessionProvider` in root layout |
| G2 Branding | Logo preview (data URL), save toast, live preview |
| G6 Students | Export CSV download from filtered roster |
| G7 CSV import | Papa Parse → preview rows from uploaded file |
| G10 Timetable | Modal edit slot → updates grid in session |
| I2 Homework create | Real file attachments with previews |
| I3 Homework list | Opens submission inbox filtered by homework id |
| I6 Class chat | Attach images/PDF; preview in thread |
| F7 Video detail | HTML5 `<video>` + approve/reject toasts |
| E5 Staff OTP | Navigates to role portal after `123456` |
| K1 Tickets | Reply appends to thread; escalate updates state |
| H9 Export center | Downloads CSV/text blobs |
| F14 Escalated tickets | Links to school ticket detail |

## Mobile — what is functional

| Area | Screen IDs | Behavior |
|------|------------|----------|
| A11 | OS permission prompts via `react-native-permissions` |
| B5, C8 | Image/document pickers, thumbnails |
| B10, C6 | Attach, voice (nitro-sound), copy toast |
| B12 | Image/audio playback when `uri` passed |
| B14 | `react-native-video` with mock `videoUrl` |
| B4 | Homework attachments → MediaViewer |
| C9 | Ticket reply appends to thread |
| D4 | Report submit → toast (not Alert) |

## Manual test matrix (smoke)

### Web

1. `/login` → teacher email → dashboard loads.
2. `/login` with `otp-demo` → OTP `123456` → teacher portal.
3. `/s/green-valley/admin/branding` → upload logo → Save → preview updates.
4. `/s/green-valley/admin/import` → upload CSV → preview shows parsed rows → confirm → toast.
5. `/s/green-valley/admin/timetable` → click cell → edit → grid updates.
6. `/s/green-valley/teacher/homework/new` → attach file → publish → toast + redirect.
7. `/s/green-valley/teacher/chat` → attach image → send → bubble shows preview.
8. `/admin/videos/[pending-id]` → video plays → Approve → toast + queue redirect.
9. `/s/green-valley/tickets/tk-1` → reply → message appears in thread.

### Mobile (device recommended)

1. A11 → tap each permission card → OS dialog.
2. B5 → add photo + document → thumbnails visible.
3. B10 → attach photo → appears in thread; long-press voice → playable message.
4. B14 → open learn video → playback controls work.
5. C9 → reply on open ticket → new message in thread.

## Native setup (mobile)

After pulling media dependencies, run `pod install` in `edution-app/ios`. Test camera/mic/voice on a physical device; simulators have limited support.
