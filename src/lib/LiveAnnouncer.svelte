<script lang="ts">
  import { announcements } from './store';
  import type { Announcement } from './store';

  /** Max items shown per region (older low-priority items trimmed visually). */
  export let limit: number = 5;

  let list: Announcement[] = [];
  const unsubscribe = announcements.subscribe(v => (list = v));

  // Clean up (not strictly necessary in root usage but good hygiene)
  import { onDestroy } from 'svelte';
  onDestroy(unsubscribe);

  $: politeItems = list.filter(a => a.politeness === 'polite').slice(0, limit);
  $: assertiveItems = list.filter(a => a.politeness === 'assertive').slice(0, limit);
</script>

<!-- Two separate live regions to avoid politeness conflicts. Headless: purely off-screen. -->
<div class="sal-offscreen" aria-hidden="false">
  <div aria-live="polite">
    {#each politeItems as a (a.id)}
      <div>{a.text}</div>
    {/each}
  </div>
  <div aria-live="assertive">
    {#each assertiveItems as a (a.id)}
      <div>{a.text}</div>
    {/each}
  </div>
</div>

<style>
  /* Off-screen visually hidden but readable pattern. clip + clip-path for broad AT compatibility */
  .sal-offscreen {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    border: 0;
    white-space: nowrap;
  }
</style>
