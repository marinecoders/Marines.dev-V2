<script>
  import MarineCodersLogo from '@components/logos/MarineCodersLogo.svelte';
  import { isDarkMode } from './stores.js';
</script>

<div class="absolute top-0 w-screen h-full -z-20 dark:bg-[#252a34]" style="background-color: var(--bg-primary);">
  <div class="fixed left-0 -z-10 flex justify-center w-full align-middle top-24 md:top-48 h-full mt-24">
    <MarineCodersLogo class="opacity-5 w-full dark:opacity-40" color="#1a1d24" EGAColor="#1a1d24" />
  </div>
</div>
