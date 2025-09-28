<script>
  import ButtonCustom from '@components/buttons/ButtonCustom.svelte';
  import { displaySiteClassificationBanner } from './stores.js';
  import { externalLinks } from '@content/externalLinks';
  import Icon from '@iconify/svelte';
  
  let isExpanded = false;
  
  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

{#if $displaySiteClassificationBanner}
  <div class="w-full bg-[#13151b] sticky top-0 z-30">
    <!-- Collapsed Banner -->
    <div 
      class="flex items-center justify-center gap-2 py-2 px-4 cursor-pointer" 
      role="button"
      tabindex="0"
      aria-expanded={isExpanded}
      aria-label="Toggle USG disclaimer information"
      on:click={toggleExpanded}
      on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? toggleExpanded() : null}
    >
      <div class="flex items-center gap-2">
        <Icon icon="tabler:brand-open-source" width="16" height="16" stroke-width="5"class="shrink-0 text-mcswf-gold" />
        <p class="text-white text-sm">Open Source Public Mirror</p>
      </div>
      <Icon 
        icon="material-symbols:keyboard-arrow-down" 
        width="20" 
        height="20" 
        class="text-white transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}" 
      />
    </div>
    
    <!-- Expanded Content -->
    {#if isExpanded}
      <div class="bg-[#1a1d26] border-t border-gray-700 px-4 py-3 animate-in slide-in-from-top duration-200">
        <div class="max-w-4xl mx-auto">
          <p class="text-white text-sm leading-relaxed mb-3">
            <strong class="text-mcswf-gold">Marine Coders</strong> puts an emphasis on utilizing open source software, where applicable, but this domain, <strong class="text-mcswf-gold">marines.dev</strong>, is not an official website of the United States Marine Corps.
          </p>
          <p class="text-white text-sm leading-relaxed">
            Please visit the official <a href="https://www.war.gov" class="text-mcswf-gold hover:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">Marine Coders</a> site for official information and resources.
          </p>
        </div>
      </div>
    {/if}
  </div>
{/if}
