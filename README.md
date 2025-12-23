# svelte-aria-live

[![npm](https://img.shields.io/npm/v/svelte-aria-live.svg)](https://www.npmjs.com/package/svelte-aria-live)
[![GitHub](https://img.shields.io/github/license/nickbrit/svelte-aria-live.svg)](LICENSE)

Tiny, headless accessibility toolkit for Svelte/SvelteKit: dual `aria-live` regions, imperative `announce()` API, screen-reader utility components, and a route-change helper.

[Demo page](https://nickbrit.github.io/svelte-aria-live/)

## Features

-   Dual off-screen live regions (`polite` & `assertive`) to avoid priority clashes
-   Simple `announce(text, options?)` API with: politeness, priority sorting, TTL auto-cleanup, optional `dedupeKey`
-   Headless `<LiveAnnouncer />` component – inject once near root
-   `<VisuallyHidden />` wrapper for SR-only text
-   `<SkipTo />` accessible skip link with safe focus management
-   `announceRouteChange()` helper for SvelteKit navigation events
-   Zero runtime dependencies beyond Svelte peer dep
-   Strict TypeScript & generated `.d.ts` types

## Install

```bash
pnpm add svelte-aria-live
# or
npm install svelte-aria-live
```

Add the announcer once (e.g. in `App.svelte` or layout):

```svelte
<script>
  import { LiveAnnouncer } from 'svelte-aria-live';
</script>
<LiveAnnouncer />
```

## Usage

### Announce messages

```ts
import { announce } from "svelte-aria-live";
announce("Saved successfully");
announce("Error saving", { politeness: "assertive", priority: 100 });
announce("Loading data…", { dedupeKey: "loading", ttlMs: 3000 });
```

### Route change (SvelteKit)

```ts
import { announceRouteChange } from "svelte-aria-live";
// After navigation:
announceRouteChange(() => document.title);
```

### Skip link

```svelte
<SkipTo target="#main" />
<main id="main">...</main>
```

### Screen reader only text

```svelte
<h1>Dashboard <VisuallyHidden>(real-time metrics)</VisuallyHidden></h1>
```

## API

### `announce(text: string, options?: AnnounceOptions)`

Adds an announcement to the queue. Returns numeric id.

`AnnounceOptions`:

-   `politeness`: `'polite' | 'assertive'` (default `'polite'`)
-   `priority`: number (higher renders first; default `0`)
-   `ttlMs`: milliseconds before removal (default `5000`)
-   `dedupeKey`: string; replaces any prior announcements with same key

### `announceRouteChange(getTitle?: () => string, opts?)`

Announces a route change assertively with high priority (`200`) and dedupe key `'route'`.

### `<LiveAnnouncer limit={5} />`

Renders two off-screen regions. `limit` trims visible DOM nodes (older messages still removed by TTL).

### `<VisuallyHidden />`

Wrap SR-only content. Pure headless styling.

### `<SkipTo target="#main" />`

Skip link focusing `target`. Temporarily sets `tabindex="-1"` if necessary for focus.

## Styling & Accessibility Notes

Off-screen pattern uses both classic `clip: rect(0 0 0 0)` and modern `clip-path: inset(50%)` for broad compatibility.
Two separate live regions prevent assertive announcements from starving polite messages.
No `aria-atomic` set to allow incremental updates.

## Build

```bash
pnpm install
pnpm check
pnpm build
```

Outputs `package/index.js` + `index.d.ts`.

## Demo

```bash
pnpm dev:demo
# build/preview
pnpm build:demo
pnpm preview:demo
```

Open http://localhost:5173 and trigger buttons; inspect DOM to see live regions update.

## License

MIT © 2025 Nickbrit
