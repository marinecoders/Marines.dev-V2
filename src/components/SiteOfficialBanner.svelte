<script>
  import { displaySiteOfficialBanner } from './stores.js';
  import Icon from '@iconify/svelte';
  
  let isExpanded = false;
  let isMilDomain = false;
  
  // Check if accessing from .mil domain
  if (typeof window !== 'undefined') {
    isMilDomain = window.location.hostname.endsWith('.mil');
    isMilDomain = true;
  }
  
  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

{#if $displaySiteOfficialBanner}
  <div class="w-full bg-[#13151b] sticky top-0 z-30">
    <!-- Collapsed Banner -->
    <div 
      class="flex items-center justify-center gap-2 py-2 px-4 cursor-pointer" 
      role="button"
      tabindex="0"
      aria-expanded={isExpanded}
      aria-label="Toggle official USG information"
      on:click={toggleExpanded}
      on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? toggleExpanded() : null}
    >
      <div class="flex items-center gap-2">
        <Icon icon="twemoji:flag-united-states" width="16" stroke-width="5" class="shrink-0 text-mcswf-gold" />
        <p class="text-white text-sm font-semibold">Official U.S. Marine Corps Website</p>
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
            <strong class="text-mcswf-gold">Welcome to the official Marine Coders platform.</strong> You are accessing this site from an official .mil domain, providing you with access to the complete suite of Marine Coders resources and tools.
          </p>
          <p class="text-white text-sm leading-relaxed">
            For additional official resources, visit the <a href="https://www.war.gov" class="text-mcswf-gold hover:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">official Marine Coders site</a>.
          </p>
        </div>
      </div>
    {/if}
  </div>
{/if}
