# PROJECT_AUDIT.md

## 1) Project overview

- **Framework / versions (verified in `package.json` + `package-lock.json`)**
  - Next.js: `^14.2.13` → installed **14.2.13** (`@next/env`, `eslint-config-next`, `@next/swc-*` all pinned to 14.2.13)
  - React / ReactDOM: `18.3.1` / `^18.3.1`
  - TypeScript: `5.4.5` (dev)
  - Tailwind CSS: `^3.4.12`; Sass `^1.79.2`; PostCSS `^8.4.47`; Autoprefixer `^10.4.20`
  - Key runtime deps: framer-motion `11.5.5`, swiper `11.1.14`, @tanstack/react-query `5.56.2`, zod `^3.23.8`, nanoid `^5.0.7`, eventsource-parser `^2.0.1`
- **Package manager:** npm (`package-lock.json` present; no yarn/pnpm lockfile)
- **Router:** App Router (route group `app/(pages)/…`, root `app/layout.tsx`, API route handlers under `app/api/`). No Pages Router remnants.
- **Main folders / architecture** (actual on-disk layout, all under `app/`):
  - `app/(pages)/` — feature routes: `about/`, `anime/`, `games/`, `guestbook/`, `license/`, `skills/`, `specs/`
  - `app/api/chat/route.ts` — OpenAI streaming endpoint (raw `fetch`, no SDK)
  - `app/auth/callback/route.ts` — OAuth code-exchange handler
  - `app/components/` — shared UI (`Navbar`, `Header`, `Footer`, `Providers`, `chatbot/`, `content/`, `icons/`, `ui/`)
  - `app/lib/supabase/` — client, server, `types/`; `app/lib/chatbot/`, `app/lib/openai-stream.ts`, `app/lib/server-actions.ts`, `app/lib/helpers.ts`, `app/lib/validators/`
  - `app/config/` — static data (`meta.ts`, `repos.ts`, `skills.ts`, `navigation.ts`, …)
  - `public/static/` — assets; `docs/` — migration notes; `.github/FUNDING.yml`; no CI workflows.

## 2) Current project health

Scripts defined in `package.json`: `dev`, `build`, `start`, `lint`. **No** `test` script and **no test framework installed** (jest/vitest/playwright absent); the `test/` folder contains only a PNG. **No** `type-check` script (would be `npx tsc --noEmit`; `tsconfig.json` already sets `noEmit`).

| Command | Status this session |
|---|---|
| `npm run lint` (`next lint`) | Not executed — no terminal tool available here |
| type-check (`tsc --noEmit`) | Not executed |
| test | **Not runnable** — no tests/framework exist |
| `npm run build` (prod) | Not executed |

Static signal: editor diagnostics via `get_errors` → **"No errors found"** across the workspace. Treat this as clean-at-rest, not a validated green build. Re-run all four commands in an environment with shell access before declaring health; expect the only scripted gate to be `next lint`, and note `eslint.ignoreDuringBuilds: true` in `next.config.mjs` means ESLint errors do **not** fail the production build.

## 3) Next.js upgrade

- **Current:** Next `14.2.13`, React `18.3.1`.
- **Outdated related packages:** `eslint-config-next ^14.2.13` (tracks Next), ESLint `^8.57.1`. Upgrading to Next 15 requires **React 19** (`react`/`react-dom`) and a matching `@types/react` bump.
- **Deprecated features / config:**
  - `next lint` script — being phased out in the Next 15 line (ESLint flat-config migration); `.eslintrc.json` uses legacy extends format.
  - No other deprecated `next.config.mjs` options present (images `remotePatterns`, `eslint.ignoreDuringBuilds` are valid).
- **Files likely requiring changes:**
  - `app/lib/supabase/server.ts` — `const cookieStore = cookies();` is the **Next 14** sync pattern. In Next 15, `cookies()` returns a Promise and must be awaited (`await cookies()`), then `.getAll()`. This is a hard breaking change.
  - Any other call sites of `cookies()`/`headers()` (only `server.ts` uses them in-repo).
- **Expected upgrade risks:** React 18→19 peer changes for framer-motion/swiper/react-query (react-query already allows `^18 || ^19`; verify framer-motion 11 + swiper 11 against React 19); removal of `next lint` script; App Router async-server-utility changes (`cookies`, `headers`, `redirect`). Low risk otherwise since the app is fully App Router.

## 4) Supabase usage

**Packages:** `@supabase/ssr ^0.5.1`, `@supabase/supabase-js ^2.45.4` (transitive: auth-js, functions-js, node-fetch, postgrest-js, realtime-js, storage-js).

**Config / env files:** `.env.example`, `.env.local`. **Env var names (values not shown):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`; OAuth: `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`.

**Exact file paths of every Supabase use:**
- `app/lib/supabase/client.ts` — `createBrowserClient` (uses URL + ANON key)
- `app/lib/supabase/server.ts` — `createServerClient` with cookie store (URL + ANON key)
- `app/lib/supabase/types/supabase.ts`, `app/lib/supabase/types/custom.ts` (`Guestbook`, `Profiles` types)
- `app/(pages)/guestbook/action.ts` — select/insert/delete on `gbook_omar11`; `auth.getUser()`
- `app/(pages)/guestbook/page.tsx` — `auth.getUser()` (server component)
- `app/(pages)/guestbook/login/actions.ts` — `signOut()`, `signInWithOAuth(provider)`
- `app/(pages)/guestbook/login/OAuthButtons.tsx` — imports `Provider` type
- `app/auth/callback/route.ts` — `auth.exchangeCodeForSession(code)`
- `app/lib/chatbot/actions.ts` — **browser** client for `chatbot_omar11` select/insert/update (runs in browser via `AIBotAssistant.tsx`)

**Tables / queries / mutations:** `gbook_omar11` (select-all ordered by `inserted_at`, insert, delete match on `user_id`+`cid`); `chatbot_omar11` (single-select by `chat_id`, then update-or-insert); `profiles` and `guestbook_demo` defined in types (demo not referenced in app logic). Relationships reference the auth `users` table (`profiles.id_fkey`, `gbook_omar11_user_id_fkey`).

**Auth providers / flows:** OAuth via `signInWithOAuth` with Supabase `Provider` type — **Google + GitHub** (per `.env.example` clients). Flow: `/auth/callback` exchanges code → redirect to `/guestbook`; sign-out on guestbook; per-request `getUser()` in the protected page.

**Storage / Realtime / middleware / RLS / triggers / server functions:**
- Storage, Realtime channels, and Edge Functions: **not used** in source (only transitive deps present).
- Middleware: **no `middleware.ts` exists** (confirmed by search); session is refreshed on-demand inside server components/actions, not via Next middleware. The comment in `server.ts` about "middleware refreshing sessions" has no corresponding file.
- RLS / triggers / FKs live in the **Supabase Postgres project**, not this repo (profiles auto-maintained per standard Supabase pattern).

## 5) Neon migration requirements

Per `docs/PROJECT_MODERNIZATION_PLAN.md` + `docs/promot.txt`: use `@neondatabase/serverless` for DB, Neon Auth for auth; remove all Supabase afterward. Reference docs cited: serverless-driver, auth/migrate/from-supabase, auth quick-start nextjs-api-only.

- **Move to `@neondatabase/serverless`:** all Postgres data access — `gbook_omar11` (list/insert/delete) and `chatbot_omar11` (select/insert/update). Replace `.from().select()/insert()/update()` with SQL via the Neon driver.
- **Move to Neon Auth:** guestbook sign-in (`signInWithOAuth`), `signOut`, `getUser`, and the `/auth/callback` code-exchange → Neon Auth social login; maintain `profiles` on sign-in in app/DB triggers instead of Supabase's auto trigger.
- **Schema + data needing migration:** tables `gbook_omar11`, `chatbot_omar11`, `profiles`, `guestbook_demo`; the auth `users` table (→ Neon Auth user store); FKs `profiles.id → users.id`, `gbook.user_id → users.id`. Row data in all four tables + user identities must be copied.
- **No direct Neon replacement:** none for Storage/Realtime (unused — clean). The auto-maintained `profiles` row and OAuth `user_metadata` (`name`, `avatar_url`) have no 1:1 automatic equivalent; they become explicit app-code steps after sign-in.
- **Manual actions / credentials:** create Neon project + pooler connection string; provision a Neon Auth app (client id/secret); configure Google/GitHub OAuth client IDs/secrets and authorized redirect URIs in Neon Auth; copy Supabase `auth.users` → Neon Auth; dump/copy the four tables; set **server-only** env vars; then delete `@supabase/*` packages + `NEXT_PUBLIC_SUPABASE_*`/`SUPABASE_SERVICE_ROLE_KEY` from code and `.env.example`.

## 6) Performance (code-supported only)

- **Large client deps:** framer-motion `11.5.5`, swiper `11.1.14`, react-github-calendar (`react-activity-calendar` + chroma-js). Notably heavy for a portfolio; consider subpath/tree-shaken imports where possible.
- **Client components:** 20 `"use client"` files, including small leaf UI like `app/components/ui/Heading.tsx` and `ui/Tooltip.tsx`; if they don't use hooks/interactivity, the directive needlessly inflates the client bundle.
- **Slow / repeated requests:**
  - `app/(pages)/games/actions.ts` → `getStatsPerGame` fires **3 parallel Steam API calls per selected game** with **no caching**; re-fires on each selection (driven by context in `GameStats.tsx`).
  - Inconsistent ISR in `getAllGames`: only the first fetch uses `{ next: { revalidate: 43200 } }`; the second (`GetOwnedGames`) is uncached.
  - Games data is fetched **client-side** in a `useEffect` inside `Games.tsx`, so initial paint is empty then hydrates — could be server-rendered with ISR for better TTFB.
  - Chatbot: `getBotMessage` hits `/api/chat` (OpenAI) on every message with no caching; `saveBotMessage` runs in the **browser** (anon key exposed, extra round-trips select→insert/update).
- **Rendering / image / font / cache:** Font self-hosted via `next/font/google` (good); images use `next/image` + configured `remotePatterns` (fine). Main gaps are the uncached Steam calls and client-side fetch pattern above.

## 7) Final summary

**Recommended order of work**
1. Baseline: run lint/type-check/build in a shell-enabled env; add a real test setup if any gate is required by the plan.
2. Next.js 14→15 (+React 19), fixing `await cookies()` in `app/lib/supabase/server.ts` and the `next lint` script.
3. Neon migration: guestbook + chatbot DB via `@neondatabase/serverless`; OAuth sign-in/out/user via Neon Auth; then remove all Supabase code/deps/env.
4. Performance: server-render games with consistent ISR, cache `getStatsPerGame`, move chatbot persistence to server-only.

**High-risk changes**
- Supabase→Neon **user + data migration** (manual, irreversible if done wrong) and OAuth redirect/origin reconfiguration in Neon Auth.
- Moving the client-side browser Supabase client (`app/lib/chatbot/actions.ts`) to a server-only path.
- React 19 upgrade touching framer-motion/swiper peers.

**Missing information / blockers**
- No terminal execution available this session → lint/type-check/build/test **could not be run**; only static diagnostics were clean.
- `test/` holds only a PNG and there is **no test framework or script**, yet the plan expects "tests" — this is undefined.
- `.env.local` contains real values (not shown); `SUPABASE_SERVICE_ROLE_KEY` is declared but **unused** in app code.
- No Next middleware exists for session refresh, so protected pages call `getUser()` on every render of the guestbook page.

*Note: returned inline per your read-only constraint; no file was created/modified/moved/formatted.*
