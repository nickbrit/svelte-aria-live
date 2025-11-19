<script lang="ts">
  // Pure headless utility component. No props; slot only.
</script>

<span class="sal-visually-hidden"><slot /></span>

<style>
  .sal-visually-hidden {
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
