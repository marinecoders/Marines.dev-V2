<script>
  import ButtonCustom from '@components/buttons/ButtonCustom.svelte';
  import { displaySiteClassificationBanner } from './stores.js';
  import { externalLinks } from '@content/externalLinks';
  import Icon from '@iconify/svelte';
</script>

{#if $displaySiteClassificationBanner}
  <div class="w-full bg-[#13151b] h-8 sticky top-0 z-30 flex items-center justify-center gap-2">
    <Icon icon="flag:us-4x3" width="20" height="15" class="shrink-0" />
    <p class="text-white text-sm">Open Source Public Mirror. Please visit the official <a href="https://www.war.gov" class="text-mcswf-gold">Marine Coders</a> site for official information.</p>
  </div>
{/if}
