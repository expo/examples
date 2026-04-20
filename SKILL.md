# Expo Examples — Integration Skills

Add popular integrations to an Expo project using curated skills from this repository.

## How it works

Each `with-*` example folder contains a `SKILL.md` with complete implementation instructions. Use the table below to find the right skill, then fetch and follow it.

## Available integrations

| Category | Options | Skill |
|----------|---------|-------|
| **Authentication** | Clerk, Auth0, Better Auth | See [Authentication](#authentication) |
| **Payments** | Stripe (native + web) | `with-stripe` |
| **Database** | SQLite, LibSQL (Turso), Convex | See [Database](#database) |
| **Styling** | TailwindCSS (Nativewind) | `with-tailwindcss` |
| **API Client** | Apollo GraphQL, GraphQL (Yoga + URQL) | See [API Client](#api-client) |
| **Animations** | Reanimated, Moti | See [Animations](#animations) |
| **State Management** | Zustand | `with-zustand` |
| **Device Features** | Camera, Maps | See [Device Features](#device-features) |

## Fetching a skill

Once you know the skill name (e.g. `with-clerk`), fetch its SKILL.md:

```
https://raw.githubusercontent.com/expo/examples/master/with-clerk/SKILL.md
```

Then follow the instructions in the fetched SKILL.md to implement the integration.

---

## Category decision guides

Use these when the user hasn't specified a particular library.

### Authentication

| Option | Best for | Trade-offs |
|--------|----------|------------|
| **Clerk** (recommended) | Quick setup, managed auth with pre-built UI, social login, MFA | Requires Clerk account, usage-based pricing |
| **Auth0** | Enterprise SSO, SAML, compliance requirements | More complex setup, requires Auth0 account |
| **Better Auth** | Full control, self-hosted, open-source with Prisma | More setup (Prisma, database), self-hosted responsibility |

**Quick decision:** Need it fast? → `with-clerk`. Enterprise SSO? → `with-auth0`. Self-hosted control? → `with-better-auth`. Not sure? → `with-clerk`.

### Database

| Option | Best for | Trade-offs |
|--------|----------|------------|
| **SQLite** (recommended) | Local offline-first storage, no server needed | No cloud sync, data stays on device |
| **LibSQL** (Turso) | Local-first with cloud sync | Requires Turso account, sync management |
| **Convex** | Real-time data, collaborative features, full backend | Requires internet, Convex account, vendor lock-in |

**Quick decision:** Offline-only? → `with-sqlite`. Need sync? → `with-libsql`. Real-time? → `with-convex`. Not sure? → `with-sqlite`.

### API Client

| Option | Best for | Trade-offs |
|--------|----------|------------|
| **Apollo Client** | Connecting to an existing external GraphQL API | Client-only, no server included |
| **GraphQL Full-Stack** (Yoga + URQL + gql.tada) | Building a GraphQL API from scratch within the Expo app | More complex, requires server output mode |

**Quick decision:** Have an API? → `with-apollo`. Building one? → `with-graphql`.

### Animations

| Option | Best for | Trade-offs |
|--------|----------|------------|
| **Reanimated** (recommended) | Complex, gesture-driven, performance-critical animations | More verbose API |
| **Moti** | Simple declarative animations, enter/exit transitions, skeleton loading | Less control, adds dependency (requires Reanimated) |

**Quick decision:** Complex/gesture animations? → `with-reanimated`. Simple fade/scale/mount? → `with-moti`. Not sure? → `with-reanimated`.

### Device Features

| Option | What it does |
|--------|-------------|
| **Camera** | Photo capture, video recording, front/back switching via `expo-camera` |
| **Maps** | Interactive maps with markers and overlays via `react-native-maps` |

**Quick decision:** Photos/video? → `with-camera`. Location display? → `with-maps`.

---

## Adaptation rules

These apply to ALL integrations:

- **Merge dependencies** — add to existing `package.json`, never replace it
- **Merge plugins** — add to existing `app.json` plugins array
- **Adapt navigation** — use the project's existing pattern (Expo Router / React Navigation)
- **Match styling** — follow the project's existing styling approach
- **Create, don't overwrite** — add new files, don't replace existing ones
- **Preserve structure** — follow the project's existing directory conventions

## Discovery

To discover additional integration skills beyond those listed above, browse:

```
https://github.com/expo/examples
```

Any `with-*` folder containing a `SKILL.md` is a fetchable integration skill.
