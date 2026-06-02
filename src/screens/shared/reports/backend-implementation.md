# Backend implementation — Shared school reports (G13–G19 / H2–H9)

## Overview
`HomeworkReportView`, `EngagementReportView`, `AttendanceReportView`, etc. Used by school admin and principal routes.

## Query parameters
- `preset`: `7d` | `30d` | `90d` | `term`
- `termId`: academic term id
- `classId`: `all` or section id (e.g. `9-A`)

## Reads
- `GET /schools/{slug}/reports/homework?preset=&termId=&classId=`
- `GET /schools/{slug}/reports/engagement?…`
- `GET /schools/{slug}/reports/attendance?…`
- `GET /schools/{slug}/reports/export?type=homework|engagement|roster|leaderboard|tickets`

## Auth
- `school_admin`: full access + export
- `principal`: read reports enabled by school policy (G12 / analytics settings future)
