# Expo App with Legend-State and Supabase Realtime

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

Local-first Expo App with [Legend-State](https://legendapp.com/open-source/state/v3/) and [Supabase](https://supabase.com/).

- [Read the detailed tutorial](https://supabase.link/local-first-expo-legend-state)
- [Watch the video guide](https://supabase.link/local-first-expo-legend-state-yt)

## Setup

- Create Supabase account at [database.new](https://database.new).
- Create `.env.local` file by running `cp .env.local.example .env.local`.
- Add your credentials from the [Supabase Dashboard](https://supabase.com/dashboard/project/_/settings/api).
- Run `supabase link` to link your local project to your Supabase project.
- Run `supabase db push` to apply the [init migration](./supabase/migrations/20240902202009_init.sql) to your Supabase database.

## 🚀 How to run locally

- Run `yarn` or `npm install`.
- Run `yarn start` or `npm run start` to try it out.
  - Press a │ open Android
  - Press i │ open iOS simulator
  - Press w │ open web

## How to generate types

```bash
supabase start
supabase gen types --lang=typescript --local > utils/database.types.ts
```
