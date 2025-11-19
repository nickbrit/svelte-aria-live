<script lang="ts">
    import {
        LiveAnnouncer,
        announce,
        VisuallyHidden,
        SkipTo,
    } from "svelte-aria-live";

    function announcePolite() {
        announce("Polite update at " + new Date().toLocaleTimeString(), {
            politeness: "polite",
            priority: 10,
        });
    }
    function announceAssertive() {
        announce("Assertive alert at " + new Date().toLocaleTimeString(), {
            politeness: "assertive",
            priority: 50,
        });
    }
    function announceDedupe() {
        announce("Loading data… " + new Date().toLocaleTimeString(), {
            dedupeKey: "loading",
            priority: 100,
            ttlMs: 3000,
        });
    }
</script>

<LiveAnnouncer />
<SkipTo target="#main" />

<header>
    <h1>
        svelte-aria-live demo <VisuallyHidden
            >(screen reader utilities)</VisuallyHidden
        >
    </h1>
</header>

<nav aria-label="Demo controls">
    <button on:click={announcePolite}>Announce polite</button>
    <button on:click={announceAssertive}>Announce assertive</button>
    <button on:click={announceDedupe}>Announce deduped loading</button>
</nav>

<main id="main">
    <h2>Content</h2>
    <p>
        Use the buttons above to generate announcements. Inspect the DOM to see
        off-screen live regions.
    </p>
</main>

<style>
    body,
    html {
        font-family: system-ui, sans-serif;
    }
    nav button {
        margin-right: 0.5rem;
    }
</style>
