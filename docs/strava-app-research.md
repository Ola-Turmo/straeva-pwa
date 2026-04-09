# Building a Strava-connected analysis app

Last verified: 2026-03-29

## Bottom line

You can build this, but the shape of the product is constrained by Strava's platform rules:

- Authentication is OAuth 2.0 authorization code flow with short-lived access tokens and rotating refresh tokens.
- New apps start in single-user mode. You can only authenticate yourself until Strava reviews the app.
- The safe product category is "personal analysis for the authenticated athlete", not "new social network around Strava data".
- Raw Strava data should be treated as a short-lived cache, not a permanent warehouse.

That makes the best v1:

1. A personal analytics dashboard for the logged-in athlete.
2. Webhook-driven incremental sync.
3. Short-term raw cache plus derived metrics for charts and insights.
4. No public feeds, no cross-user comparisons, no Strava-like social features.

## Current platform constraints

### 1. Auth and token lifecycle

Strava uses OAuth 2.0. The user authorizes your app, Strava redirects back with a code, and your backend exchanges that code for:

- an access token
- a refresh token
- an expiry timestamp

Important details:

- Access tokens expire after 6 hours.
- Refresh tokens rotate. When Strava returns a new refresh token, you should persist the newest one and stop using the old one.
- Users can deny individual scopes, so your app must verify what was actually granted.

Implication for the app:

- Token exchange and refresh must happen on the server.
- Refresh logic should run before any Strava API call if the token is close to expiry.
- Store accepted scopes per athlete so you can explain missing data cleanly.

### 2. Scope choices for an analysis product

For a serious analysis app, request:

- `read`
- `activity:read_all`
- optionally `profile:read_all`

Why:

- `activity:read_all` is what lets you analyze private and "Only You" activities.
- `activity:read` alone is not enough for private activities or privacy-zone-inclusive analysis.
- `profile:read_all` is useful if profile visibility affects what you want to show.

Do not request write scopes unless the product actually edits or uploads to Strava.

### 3. Rate limits and app capacity

Current default limits are:

- 200 requests per 15 minutes
- 2,000 requests per day
- plus a lower read/non-upload budget of 100 per 15 minutes and 1,000 per day

Also:

- New apps start with athlete capacity `1` ("Single Player Mode").
- To let more athletes connect, the app must go through Strava review.

Implication for architecture:

- Build v1 as a personal dashboard first.
- Do not poll aggressively.
- Use webhooks for change detection.
- Backfills must be paginated, throttled, resumable, and preferably spread over time.

### 4. Webhooks are part of the normal design

Strava supports one webhook subscription per app. It emits activity create/update/delete events and deauthorization events.

Important implementation detail:

- Subscription validation requires your callback URL to answer the verification GET within 2 seconds.

Implication:

- Your app should expose a webhook route from day one.
- The webhook should acknowledge quickly and enqueue work instead of processing inline.

### 5. Legal and product constraints

The Strava API Agreement is restrictive enough that it should shape the product:

- You may not create an app that competes with or replicates Strava functionality.
- Data from one user can only be displayed to that same user unless you have explicit consent.
- If a user revokes access, you must delete their personal data.
- Strava data may not remain in cache longer than 7 days.
- Your app needs a privacy policy and a deletion path.
- You cannot use "Strava" or a confusingly similar mark in the shipped product name/branding.

Important inference:

The safest design is to treat raw activity payloads and streams as a refreshable cache, and persist only the minimum derived analytics you need after legal review. I would not design v1 around permanent storage of raw Strava history.

Note on the current project name:

The current folder name is visually and phonetically close enough to `Strava` that I would not ship it as the product name.

## What data to pull

For a user-focused analysis app, these endpoints matter most:

- `GET /athlete`
- `GET /athlete/activities`
- `GET /activities/{id}`
- `GET /activities/{id}/streams`
- `GET /athletes/{id}/stats`
- webhook subscription endpoints

How to use them:

- `/athlete` gives the authenticated athlete profile.
- `/athlete/activities` is the core feed for backfill and incremental sync.
- `/activities/{id}` gives detailed activity metadata.
- `/activities/{id}/streams` gives time-series data like lat/lng, heartrate, watts, cadence, altitude, moving data, etc.
- `/athletes/{id}/stats` is useful, but it only includes activities visible to Everyone, so it is not sufficient for a private personal analysis product by itself.

## Recommended product shape

### Good v1

Build a "my training analysis" app with features like:

- weekly/monthly distance, elevation, moving time trends
- sport-specific breakdowns
- rolling load and consistency metrics
- long run / long ride detection
- pace, heart rate, cadence, and power distributions
- route and climb summaries
- gear usage summaries
- "what changed lately?" insights after new activities sync

### Avoid in v1

These are either legally risky or likely to trigger review friction:

- public leaderboards built from Strava athlete data
- a feed that mirrors Strava's activity experience
- cross-user comparison dashboards without explicit user consent and careful policy review
- permanent warehousing of raw Strava activity data
- branding that makes the app look like an official Strava product

## Recommended architecture

### Stack

For a blank project, I would start here:

- `Next.js` with TypeScript for web app + backend routes
- `PostgreSQL` for users, tokens, sync state, derived metrics, and audit records
- `Prisma` or `Drizzle` for schema management
- `pg-boss` or `BullMQ` for background jobs
- `Chart.js`, `Recharts`, or `ECharts` for analytics visualizations
- `MapLibre` or `Leaflet` for route maps

Hosting recommendation:

- Use a platform that can handle inbound webhooks and background workers cleanly, such as Render, Railway, or Fly.io.
- If you want Vercel for the frontend, keep the webhook receiver and worker in a process that is not dependent on short serverless execution windows.

### System design

```text
Browser
  -> Next.js UI
  -> Next.js auth routes

Strava OAuth
  -> callback route
  -> token exchange
  -> store athlete + scopes + refresh token

Sync engine
  -> initial backfill job
  -> paginated /athlete/activities fetch
  -> on-demand /activities/{id} details
  -> selective /activities/{id}/streams fetch

Webhook route
  -> verify challenge
  -> receive create/update/delete/deauth events
  -> enqueue sync or delete jobs

Postgres
  -> athletes
  -> strava_connections
  -> sync_runs
  -> activity_cache
  -> stream_cache
  -> derived_metrics
  -> insight_snapshots
```

### Suggested database model

Minimal tables:

- `users`
- `strava_connections`
- `athletes`
- `activity_cache`
- `stream_cache`
- `sync_jobs`
- `sync_cursors`
- `derived_daily_metrics`
- `derived_activity_metrics`
- `insights`
- `audit_events`

Notes:

- `strava_connections` stores athlete id, scopes, refresh token, access token expiry, deauthorized timestamp.
- `activity_cache` and `stream_cache` should include `fetched_at` and `delete_after` timestamps to enforce retention.
- `derived_*` tables should store your app's computed outputs, not full raw payloads.

### Sync strategy

Recommended flow:

1. User clicks "Connect with Strava".
2. Backend exchanges code and stores tokens/scopes.
3. Queue an initial backfill for the last 90-365 days.
4. Fetch `/athlete/activities` page by page with rate-limit-aware throttling.
5. For each activity, store summary fields in cache and compute derived metrics.
6. Fetch detailed activity data only when needed.
7. Fetch streams only for activities where stream-based analysis is required.
8. Register one webhook subscription for the app.
9. On webhook events, enqueue narrow sync jobs for the changed activity.
10. On deauthorization, delete user-linked personal data promptly.

Why this is the right shape:

- It fits Strava's rate limits.
- It avoids polling.
- It keeps expensive stream fetches selective.
- It aligns with the retention/deletion obligations.

## Recommended API routes

If you build this in Next.js, these routes are enough for v1:

- `GET /api/auth/strava/start`
- `GET /api/auth/strava/callback`
- `POST /api/auth/strava/disconnect`
- `GET /api/strava/webhook`
- `POST /api/strava/webhook`
- `GET /api/me`
- `GET /api/activities`
- `GET /api/activities/:id`
- `GET /api/insights/overview`
- `GET /api/insights/trends`
- `GET /api/insights/distributions`
- `GET /api/insights/routes`

## Security and compliance checklist

- Keep `STRAVA_CLIENT_SECRET` server-side only.
- Encrypt refresh tokens at rest.
- Store token expiry and always use the latest refresh token.
- Log granted scopes and deauthorization events.
- Publish a privacy policy before real users connect.
- Add an account deletion flow.
- Add a job that enforces the 7-day cache retention window.
- Add a "disconnect Strava" button in the UI.
- Use the official "Connect with Strava" button and attribution rules.
- Do not ship the app under the current project name.

## Practical MVP roadmap

### Phase 1: personal prototype

- Register the Strava app.
- Build OAuth connect/disconnect.
- Sync athlete profile and recent activities.
- Show a clean dashboard with activity trends and weekly summaries.

### Phase 2: useful analytics

- Add heart rate / pace / power distributions.
- Add long-term consistency and training load charts.
- Add route maps and climb summaries.
- Add webhook-driven incremental updates.

### Phase 3: production readiness

- Implement deletion workflows.
- Implement retention cleanup.
- Add rate-limit observability and sync retries.
- Prepare screenshots and compliance docs for Strava review.

## What I would build first

If this were my project, I would build:

1. Next.js app shell
2. Strava OAuth server flow
3. Postgres schema for users, tokens, sync state
4. `/athlete/activities` backfill job
5. dashboard with weekly/monthly summaries
6. webhook receiver
7. stream-based advanced analysis

That order gets you to a working personal product quickly while staying inside the platform constraints.

## Sources

- Strava Getting Started: https://developers.strava.com/docs/getting-started/
- Strava Authentication: https://developers.strava.com/docs/authentication/
- Strava API Reference: https://developers.strava.com/docs/reference/
- Strava Webhooks: https://developers.strava.com/docs/webhooks/
- Strava Rate Limits: https://developers.strava.com/docs/rate-limits/
- Strava API Agreement: https://www.strava.com/legal/api
- Strava Brand Guidelines: https://developers.strava.com/guidelines
