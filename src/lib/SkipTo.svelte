<script lang="ts">
  /** Target selector the link should focus. Typically '#main'. */
  export let target: string = '#main';

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;

    // Ensure focusable even if not naturally focusable: temporary tabindex
    let addedTempTabIndex = false;
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '-1');
      addedTempTabIndex = true;
    }

    el.focus({ preventScroll: false });
    el.scrollIntoView({ block: 'start' });

    if (addedTempTabIndex) {
      const cleanup = () => {
        el.removeAttribute('tabindex');
        el.removeEventListener('blur', cleanup);
      };
      el.addEventListener('blur', cleanup);
    }
  }
</script>

<a href={target} class="skip-link" on:click={handleClick}>Skip to main content</a>

<style>
  .skip-link {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-200%);
    background: #fff;
    color: #000;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border: 2px solid #000;
    z-index: 1000;
  }
  .skip-link:focus {
    transform: translateY(0);
    clip: auto;
    clip-path: none;
    width: auto;
    height: auto;
    margin: 0.5rem;
    overflow: visible;
    white-space: normal;
  }
</style>
