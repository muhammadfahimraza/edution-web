# Backend implementation — H1 Principal dashboard

## Overview
Principal landing: KPIs, enrollment/homework/engagement trends, alerts, classes needing attention, upcoming visit, recent announcements.

## Proposed API
`GET /schools/{slug}/principal/dashboard?from=&to=&termId=`

## Auth
Principal role scoped to tenant school (`slug`).
