# Project Modernization Plan

## Objective

Upgrade this portfolio from Next.js 14 to the latest stable Next.js version, migrate all Supabase database and authentication features to Neon, then improve verified performance problems without changing the design or intended behavior.

## Known Project State

- npm project using the Next.js App Router.
- Next.js 14.2.13, React 18.3.1, and TypeScript 5.4.5.
- No automated test framework or test script.
- Supabase provides Google/GitHub OAuth and PostgreSQL access.
- Supabase Storage, Realtime, and Edge Functions are not used.
- Database access exists for gbook_omar11 and chatbot_omar11.
- profiles is connected to Supabase Auth users.
- guestbook_demo exists in generated types but may not be used.
- The chatbot currently performs Supabase database operations from browser code.
- Steam game requests have inconsistent caching and some pages fetch their initial data from the browser.

Treat PROJECT_AUDIT.md as the starting reference, but verify affected code before editing it.

## Rules

- Complete phases in order.
- Read the version-matched Next.js documentation referenced by AGENTS.md before changing Next.js code.
- Use first-party workflow skills only where this plan requests them.
- Keep the existing UI, routes, features, and behavior unless a required migration changes them.
- Do not expose DATABASE_URL, auth secrets, service credentials, or other server secrets to client components.
- Do not add Prisma, Drizzle, or another ORM. Use @neondatabase/serverless and versioned SQL migrations.
- Never delete or modify source data in Supabase during migration. Copy it and verify Neon first.
- Preserve unrelated user changes.
- Fix failures before continuing to the next phase.

## AI Agent Setup

Next.js 16.3 provides version-matched documentation through a managed block in AGENTS.md.

Before the framework upgrade:

1. Run:

       npx @next/codemod@canary agents-md

2. Read AGENTS.md and the Next.js documentation it references before editing framework code.
3. Preserve the managed block exactly. Keep project-specific instructions outside its markers.

After upgrading to Next.js 16.3 or later:

1. Run next dev once so Next.js updates the managed AGENTS.md block to use the bundled documentation in node_modules/next/dist/docs/.
2. Read AGENTS.md again and confirm it matches the installed Next.js version.
3. Install the first-party runtime verification skill if the local agent supports Agent Skills:

       npm install -g agent-browser@^0.27
       npx skills add vercel/next.js --skill next-dev-loop

4. After each meaningful edit, use next-dev-loop to reload the affected route and inspect:
   - Compilation issues
   - Server logs
   - Browser console
   - Failed network requests
   - Rendered DOM
   - React component tree or re-renders when relevant
5. Use the running Next.js development diagnostics for fast checks while editing. Still run the full validation commands at phase boundaries.

Install the optional Phase 8 skills only if Phase 8 is approved.

## Existing Local Environment

These variables are already configured in the ignored .env.local file:

    NEXT_PUBLIC_SITE_URL=...
    GITHUB_TOKEN=...
    OPENAI_API_KEY=...
    STEAM_API_KEY=...
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    GITHUB_CLIENT_ID=...
    GITHUB_CLIENT_SECRET=...
    NEXT_PUBLIC_SUPABASE_URL=...
    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
    SUPABASE_SERVICE_ROLE_KEY=...
    SUPABASE_DB_URL=...
    DATABASE_URL=...
    DATABASE_URL_UNPOOLED=...

- Use SUPABASE_DB_URL only to inspect and migrate the existing Supabase database.
- Use DATABASE_URL_UNPOOLED for Neon schema migrations and data import.
- Use DATABASE_URL for application queries through @neondatabase/serverless.
- Preserve the other variables and use them only where the project requires them.
- Never print, expose, overwrite, or commit secret values.
- Do not add the duplicate Neon PG* or POSTGRES_* variables.
- If Neon Auth requires another variable, add only the exact variable required by its current official guide.

## Validation Commands

Run these at the start and after every implementation phase:

    npm run lint
    npx tsc --noEmit
    npm run build

There is currently no test script. Do not claim automated tests passed unless a real test command exists and was run. Also perform the phase-specific smoke checks listed below.

---

## Phase 1 — Baseline and Upgrade Preparation

1. Confirm the audit still matches package.json, the lockfile, next.config.mjs, and the affected source files.
2. Confirm the installed Node.js version satisfies the target Next.js requirement. Next.js 16 requires Node.js 20.9.0 or newer.
3. Run all validation commands and record pre-existing errors separately from errors introduced later.
4. Check current peer compatibility for React, TypeScript, ESLint, Framer Motion, Swiper, TanStack Query, and their type packages.
5. Read the official upgrade guides for every major version crossed:
   - https://nextjs.org/docs/app/guides/upgrading/version-15
   - https://nextjs.org/docs/app/guides/upgrading/version-16
6. Use AGENTS.md and the official upgrade guides as the source of truth. Do not install a Next.js knowledge skill.

Do not change application features in this phase.

### Phase 1 completion

- Current validation results are recorded.
- Runtime and package requirements are understood.
- The exact target versions and upgrade path are known.

---

## Phase 2 — Upgrade Next.js and React

Upgrade one major version at a time so failures are easy to identify.

### 2.1 Upgrade Next.js 14 to 15

1. Use the official upgrade codemod or equivalent documented npm commands.
2. Upgrade Next.js, React, ReactDOM, eslint-config-next, @types/react, and @types/react-dom to compatible versions.
3. Convert synchronous request APIs to their asynchronous forms. In particular, update cookies() usage in app/lib/supabase/server.ts.
4. Search for other uses of cookies(), headers(), draftMode(), params, and searchParams; update only affected code.
5. Resolve real peer-dependency problems. Do not use --force or --legacy-peer-deps to hide incompatibilities.
6. Run all validation commands and smoke-test the main pages.

### 2.2 Upgrade Next.js 15 to the latest stable Next.js 16

1. Follow the official Next.js 16 upgrade guide and run the recommended codemods.
2. Migrate the removed next lint command to the ESLint CLI.
3. Replace the legacy .eslintrc.json setup with the supported ESLint configuration when required.
4. Remove the unsupported eslint option, including ignoreDuringBuilds, from next.config.mjs.
5. Verify all request-time APIs are fully asynchronous; Next.js 16 no longer supports synchronous access.
6. Check Turbopack compatibility because Next.js 16 uses it by default for development and production builds.
7. Keep Webpack only if a verified incompatibility requires it, and document the reason.
8. Do not enable optional features such as React Compiler or Cache Components unless they solve a measured problem and pass validation.
9. Evaluate the official TypeScript 7 upgrade for faster Next.js build type checking. Upgrade only if the project and its type dependencies remain compatible.
10. Keep Next.js 16.3's default development-memory eviction, filesystem build cache, SSR improvements, and bundled prefetch behavior. These gains are automatic; do not add custom code or configuration for them.
10. Keep the default Turbopack development memory eviction and filesystem caches enabled. Do not add custom cache configuration unless a measured problem requires it.
11. Run next dev so Next.js 16.3 updates the managed AGENTS.md block to the bundled version-matched documentation.
12. Install and use next-dev-loop when the agent supports it.
13. Run all validation commands and use next-dev-loop to smoke-test:
   - Home and navigation
   - About, skills, specs, anime, and games pages
   - Guestbook display
   - Chatbot UI and streaming response

### Phase 2 completion

- The project uses the latest stable Next.js 16 release and compatible React packages.
- ESLint runs directly and is not skipped by production configuration.
- TypeScript 7 is either validated and adopted or its compatibility blocker is documented.
- Development and production builds start without framework migration errors.
- Existing pages still render and function.

---

## Phase 3 — Prepare the Neon Migration

Read the current official Neon documentation before making migration changes:

- https://neon.com/docs/serverless/serverless-driver.md
- https://neon.com/docs/auth/migrate/from-supabase.md
- https://neon.com/docs/auth/quick-start/nextjs-api-only.md

### 3.1 Verify the source schema and data

1. Confirm SUPABASE_DB_URL and DATABASE_URL_UNPOOLED are available without printing their values.
2. Confirm the PostgreSQL tools needed for inspection are available. Use psql, pg_dump, or the Supabase CLI. Do not install Docker or another large dependency without asking.
3. Connect to Supabase through SUPABASE_DB_URL. Start with read-only SELECT queries against information_schema, pg_catalog, and pg_policies.
4. Do not use NEXT_PUBLIC_SUPABASE_URL, the anon key, or the service-role key as a PostgreSQL connection string.
5. Inspect the real Supabase schema instead of relying only on generated TypeScript types.
6. Record columns, types, defaults, indexes, constraints, foreign keys, RLS policies, and triggers for:
   - gbook_omar11
   - chatbot_omar11
   - profiles
   - guestbook_demo, if it exists and contains data
7. Record row counts before migration.
8. Identify how profiles rows are created and how name and avatar_url are populated.
9. Identify the exact guestbook permissions currently enforced by RLS.
10. Inspect auth.users only as required by the official Neon Auth migration guide.
11. Never print passwords, tokens, OAuth credentials, password hashes, or complete user records.

### 3.2 Verify the Neon destination

1. Connect to the new Neon database with DATABASE_URL_UNPOOLED.
2. Confirm the database name, current user, PostgreSQL version, and whether the destination is empty.
3. Use DATABASE_URL_UNPOOLED for DDL, migrations, psql, and data import.
4. Use the pooled DATABASE_URL only for application runtime queries through @neondatabase/serverless.
5. Do not use the legacy PG* or POSTGRES_* aliases.

### 3.3 Prepare safe migrations

1. Add versioned SQL migration files for the Neon schema.
2. Preserve required columns, indexes, constraints, timestamps, and relationships.
3. Do not assume Neon Auth user IDs equal Supabase Auth user IDs.
4. Follow the official auth migration guide and create an explicit old-user-ID to new-user-ID mapping if IDs change.
5. Preserve guestbook ownership and profile relationships using that mapping.
6. Prepare a repeatable, non-destructive data-copy process.
7. If a schema or data dump is required, create it in a private temporary directory outside the repository.
8. Never commit database dumps, user data, password hashes, or credentials.
9. Do not restore Supabase internal schemas, reserved roles, extensions, or platform-specific objects into Neon.
10. Import only the application schema and data required by this project.

If required credentials, source access, OAuth settings, or migration choices are missing, stop and list exactly what is needed.

### Phase 3 completion

- Neon schema migration files are ready.
- Auth and user-ID mapping are defined.
- Data-copy and rollback procedures are documented.
- No Supabase data has been deleted or overwritten.

---

## Phase 4 — Implement Neon Auth

Replace the Supabase auth flow in:

- app/(pages)/guestbook/login/actions.ts
- app/(pages)/guestbook/login/OAuthButtons.tsx
- app/(pages)/guestbook/page.tsx
- app/(pages)/guestbook/action.ts
- app/auth/callback/route.ts
- app/lib/supabase/client.ts
- app/lib/supabase/server.ts

Tasks:

1. Install and configure Neon Auth exactly as described by the current official Next.js guide.
2. Configure Google and GitHub providers.
3. Update sign-in, sign-out, current-user, session, callback, and protected-page behavior.
4. Replace the Supabase Provider type with a local or Neon-supported provider type.
5. Replace or remove app/auth/callback/route.ts according to Neon Auth's required callback flow.
6. Preserve the existing post-login redirect to /guestbook.
7. Create or update the associated profiles row after sign-in when needed.
8. Preserve the user's display name and avatar using Neon Auth's actual user fields.
9. Use the authenticated server-side user ID for all guestbook authorization.
10. Configure the exact Google and GitHub redirect URIs required by Neon Auth in development and production.

### Phase 4 verification

Test each flow separately:

- Google sign-in
- GitHub sign-in
- Failed or cancelled OAuth
- Sign-out
- Session persistence after refresh
- Direct visit to the protected guestbook page
- Correct display name and avatar

Run all validation commands.

---

## Phase 5 — Migrate the Database and Application Queries

### 5.1 Create and populate the Neon schema

1. Apply the prepared SQL migrations to Neon.
2. Migrate Neon Auth users according to the official Supabase migration guide.
3. Copy profiles, guestbook rows, chatbot rows, and any confirmed guestbook_demo data without changing the Supabase source.
4. Apply the old-user-ID to new-user-ID mapping to every ownership foreign key.
5. Compare row counts, required fields, constraints, and representative records.
6. Stop if records cannot be mapped safely. Do not drop or silently skip them.

### 5.2 Server-only database module

1. Install @neondatabase/serverless.
2. Create one shared server-only database module using DATABASE_URL.
3. Fail clearly when the required environment variable is missing.
4. Use parameterized or tagged-template queries. Never build SQL by concatenating user input.
5. Do not import the database module into client components.

### 5.3 Guestbook

Replace Supabase queries in:

- app/(pages)/guestbook/action.ts
- app/(pages)/guestbook/page.tsx

Requirements:

1. Preserve list ordering and displayed fields.
2. Require a verified authenticated user for writes.
3. Store the correct Neon Auth user ID.
4. Replace Supabase RLS protection with explicit server-side authorization.
5. A user may not delete another user's entry.
6. Validate all write input with the existing validators.
7. Preserve current refresh or revalidation behavior.

### 5.4 Chatbot persistence

Replace Supabase access in app/lib/chatbot/actions.ts and any client component that calls its browser database functions.

Requirements:

1. Move all chatbot database reads and writes to server actions or route handlers.
2. Keep DATABASE_URL and database code out of the browser bundle.
3. Preserve the existing select-then-update-or-insert behavior, preferably as one safe PostgreSQL upsert.
4. Validate chat IDs and stored message data.
5. Keep the existing OpenAI streaming endpoint behavior unchanged.

### 5.5 Environment configuration

1. Add only final application variable names—not migration-only variables or values—to .env.example.
2. Keep real values only in .env.local and Vercel environment settings.
3. Do not use a NEXT_PUBLIC_ prefix for database credentials.

### Phase 5 verification

- Guestbook entries load in the original order.
- An authenticated user can add and delete their own entry.
- Unauthorized deletion is rejected.
- Chatbot conversations load and save correctly.
- Browser bundles and network requests do not expose database credentials.
- Row counts and representative records match the source migration.
- All validation commands pass.

---

## Phase 6 — Remove Supabase

Only begin after Neon database access and Neon Auth pass verification.

1. Search the entire repository for:
   - supabase
   - NEXT_PUBLIC_SUPABASE
   - SUPABASE_SERVICE_ROLE_KEY
   - SUPABASE_DB_URL
2. Remove:
   - @supabase/ssr
   - @supabase/supabase-js
   - Obsolete Supabase code under app/lib/supabase/
   - Obsolete generated Supabase types
   - Unused Supabase environment-variable placeholders
   - Old callback code replaced by Neon Auth
3. Keep generic application types by moving or rewriting them before deleting Supabase-generated files.
4. Remove obsolete comments that describe Supabase middleware or session behavior.
5. Confirm no client or server bundle imports Supabase.
6. Do not delete the Supabase project or its data. That is outside this code migration.
7. Remove migration-only Supabase secrets from .env.local after the migration is verified and the user confirms they are no longer needed locally.
8. Run npm install to update the lockfile, then run all validation commands.

### Phase 6 completion

- No application code or dependency uses Supabase.
- Neon handles database access and authentication.
- The source Supabase project remains available as a rollback copy.

---

## Phase 7 — Performance Optimization

Use the managed Next.js documentation referenced by AGENTS.md. Use next-dev-loop after each meaningful change. A separate Next.js knowledge skill is not required.

Measure or confirm each issue before changing it. When Next.js reports an actionable performance error, read the exact linked error documentation, choose the appropriate fix, and verify the rendered result instead of applying a generic caching pattern.

### 7.1 Steam games

Inspect:

- app/(pages)/games/actions.ts
- app/(pages)/games/Games.tsx
- app/(pages)/games/GameStats.tsx

Tasks:

1. Apply a consistent cache policy to both requests in getAllGames.
2. Server-render the initial games data with an appropriate revalidation period instead of fetching it only after client hydration.
3. Keep search, selection, and other interactive behavior in small client components.
4. Cache getStatsPerGame by game ID when safe so repeated selection does not trigger three new Steam requests each time.
5. Preserve correct error and empty states.
6. Do not cache private user-specific data across users.

### 7.2 Client JavaScript

1. Review all use client files.
2. Remove the directive only when the component uses no hooks, browser APIs, context, client-only library, or event handlers.
3. Keep client boundaries as small as practical.
4. Check actual imports and bundle impact of Framer Motion, Swiper, and the GitHub calendar packages.
5. Use smaller imports or lazy loading only where it reduces the client bundle without harming the experience.
6. Do not remove animations or features merely because a dependency is large.

### 7.3 Initial data and client synchronization

1. Keep initial page data in Server Components whenever the initial render needs it.
2. If Games still needs TanStack Query for later client interactions, prefetch its initial query on the server and pass it through HydrationBoundary.
3. Use client fetching only for data requested by an interaction, polling, focus revalidation, or other browser-only behavior.
4. Avoid fetching the same initial data once on the server and again immediately after hydration.

### 7.4 Streaming and failure recovery

1. Add focused Suspense boundaries around slow remote sections such as Steam data, guestbook data, or other independent requests.
2. Use useful skeletons with stable dimensions to protect LCP and CLS.
3. Nest boundaries when content order matters so sections settle from top to bottom without blocking parallel work.
4. Do not wrap the entire page in a boundary with an empty fallback.
5. Check whether remote-data routes need a retryable error boundary. Use the current Next.js error-boundary guidance and preserve notFound and redirect behavior.

### 7.5 Responsive mutations

1. Check whether guestbook creation and deletion visibly wait for the server.
2. If needed, use transitions and optimistic state for immediate feedback.
3. Roll back optimistic state and show a clear error when a Server Action fails.
4. Never treat optimistic UI as authorization; the server must still verify the user and ownership.

### 7.6 Existing good behavior

Keep the current next/font and next/image setup unless measurement reveals a problem. Do not rewrite already-correct code.

### Phase 7 verification

- Compare relevant request counts and build output before and after.
- Confirm games render initially without an empty client-fetch delay.
- Confirm repeated game selection uses the intended cache.
- Test chatbot streaming and persistence again.
- Test navigation, animations, Swiper content, and responsive behavior.
- Use next-dev-loop to inspect the DOM, console, network requests, server logs, and React re-renders on affected routes.
- Check that Suspense boundaries show useful visible shells and do not produce empty pages.
- Run all validation commands.

---

## Phase 8 — Evaluate Instant Navigations

Next.js 16.3 offers Cache Components and Partial Prefetching as opt-in features. They can make navigation feel SPA-like, but enabling them changes rendering and caching behavior across the application.

### 8.1 Measure first

1. Use next-dev-loop, Instant Insights, and the Navigation Inspector to test navigation between the main portfolio routes.
2. Record which navigations block without immediately displaying useful UI.
3. Do not enable new flags when existing navigation is already fast enough.
4. Present the findings and request user approval before adopting Cache Components or Partial Prefetching.

### 8.2 Adopt only when approved

If adoption is approved:

1. Install and use the first-party skills:

       npx skills add vercel/next.js --skill next-cache-components-adoption
       npx skills add vercel/next.js --skill next-partial-prefetching-adoption

2. Enable cacheComponents and partialPrefetching using the current official guide.
3. Migrate one route or feature at a time.
4. Build each route shell from static UI, safe cached data, and useful Suspense fallbacks.
5. Keep authentication, personalized guestbook state, and private chatbot data dynamic and isolated from shared caches.
6. Use use cache only for reusable public data with an intentional cacheLife.
7. Use cacheTag and updateTag when a mutation changes cached data.
8. Use Link prefetch=true only for high-value URL-specific destinations where the extra request is justified.
9. Do not prefetch private data or large payloads without a clear benefit.
10. Add focused Playwright instant-navigation tests if the required test tooling is installed. Do not introduce a large test setup only for trivial assertions.
11. Verify every adopted route with next-dev-loop, the Navigation Inspector, browser logs, network requests, and a production build.
12. If a migrated route is still measurably slow, install and use next-cache-components-optimizer for that route only:

       npx skills add vercel/next.js --skill next-cache-components-optimizer

### 8.3 Features not enabled by this plan

- Do not enable experimental offline retry for production.
- Do not enable the experimental Rust React Compiler.
- Do not replace existing Framer Motion animations with View Transitions unless the user requests a design change.
- Do not use import.meta.glob unless the project gains a real local-file content use case.
- Do not add root-params APIs because this project has no audited root dynamic parameter use case.

---

## Phase 9 — Final Verification and Report

### Functional checks

- All public pages load without console or server errors.
- Navigation works on desktop and mobile.
- Google and GitHub authentication work.
- Sessions persist and sign-out clears the session.
- Guestbook list, insert, and authorized delete work.
- Chatbot streaming, loading, saving, and restoring work.
- Games list, selection, statistics, caching, loading, and error states work.
- next-dev-loop reports no unresolved compilation, console, network, or rendering problems on tested routes.

### Security checks

- No secrets appear in committed files, browser bundles, logs, or client network payloads.
- Database and auth modules are server-only.
- Guestbook writes validate input and verify identity.
- Guestbook deletion verifies ownership on the server.
- SQL queries are parameterized.

### Data checks

- Compare source and destination row counts.
- Verify representative guestbook, chatbot, and profile records.
- Confirm user ownership relationships still point to the correct migrated users.
- Keep Supabase unchanged until the user decides it is no longer needed.

### Final report

Provide:

1. Package and framework versions before and after.
2. Files added, changed, moved, and removed.
3. Database schema and data migration results.
4. Authentication and OAuth configuration changes.
5. Environment-variable names required locally and on Vercel.
6. Commands and manual checks performed, with pass/fail results.
7. Performance changes and measured results.
8. Instant Navigations measurements and the final adopt-or-skip decision.
9. Remaining manual steps, risks, or blockers.

Do not claim success for checks that were not run.
