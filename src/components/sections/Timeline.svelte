<script>
  import { onMount } from 'svelte';
  
  export let timelineData = [];
  
  let timelineRef;
  let visibleItems = new Set();
  
  // Intersection Observer for scroll animations
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleItems.add(entry.target.dataset.index);
            visibleItems = visibleItems; // Trigger reactivity
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    if (timelineRef) {
      const items = timelineRef.querySelectorAll('.timeline-item');
      items.forEach((item) => observer.observe(item));
    }
    
    return () => observer.disconnect();
  });
  
  // Get type-specific styling
  function getTypeStyles(type) {
    const styles = {
      milestone: 'bg-mcswf-gold text-mcswf-red border-mcswf-gold',
      presentation: 'bg-mcswf-blue text-white border-mcswf-blue',
      inspiration: 'bg-mcswf-gold-dark text-mcswf-red border-mcswf-gold-dark',
      training: 'bg-mcswf-battle-red text-white border-mcswf-battle-red',
      sponsorship: 'bg-mcswf-pinstripe text-white border-mcswf-pinstripe',
      charter: 'bg-mcswf-dark-blue text-white border-mcswf-dark-blue',
      partnership: 'bg-mcswf-gold text-mcswf-red border-mcswf-gold',
      pilot: 'bg-mcswf-blue text-white border-mcswf-blue',
      achievement: 'bg-mcswf-gold text-mcswf-red border-mcswf-gold',
      growth: 'bg-mcswf-gold-dark text-mcswf-red border-mcswf-gold-dark'
    };
    return styles[type] || 'bg-mcswf-gold text-mcswf-red border-mcswf-gold';
  }
  
  // Format date for display
  function formatDate(dateString) {
    const [month, year] = dateString.split(' ');
    return { month, year };
  }
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" bind:this={timelineRef}>
  <div class="relative">
    <!-- Timeline Line -->
    <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mcswf-gold via-mcswf-gold-dark to-mcswf-gold transform md:-translate-x-0.5"></div>
    
    <!-- Timeline Items -->
    <div class="space-y-12">
      {#each timelineData as item, index}
        <div 
          class="timeline-item relative flex items-center {index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}"
          data-index={index}
          style="opacity: {visibleItems.has(index.toString()) ? '1' : '0'}; transform: translateY({visibleItems.has(index.toString()) ? '0' : '50px'}); transition: all 0.6s ease-out;"
        >
          <!-- Timeline Node -->
          <div class="absolute left-8 md:left-1/2 w-4 h-4 bg-mcswf-gold rounded-full border-4 border-mcswf-red transform md:-translate-x-2 z-10 shadow-lg">
            <div class="w-full h-full bg-mcswf-gold rounded-full animate-pulse"></div>
          </div>
          
          <!-- Content Card -->
          <div class="ml-16 md:ml-0 md:w-5/12 {index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}">
            <div class="bg-white rounded-lg shadow-xl p-6 border-l-4 {getTypeStyles(item.type).split(' ')[2]} hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <!-- Date Badge -->
              <div class="flex items-center mb-4">
                <span class="text-2xl mr-3">{item.icon}</span>
                <div class="bg-mcswf-red text-white px-3 py-1 rounded-full text-sm font-bold">
                  {formatDate(item.date).month} {formatDate(item.date).year}
                </div>
              </div>
              
              <!-- Title -->
              <h3 class="text-xl font-bold text-mcswf-red mb-3 font-colossalis">
                {item.title}
              </h3>
              
              <!-- Description -->
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
              
              <!-- Type Indicator -->
              <div class="mt-4 flex items-center">
                <div class="w-3 h-3 rounded-full {getTypeStyles(item.type).split(' ')[0]} mr-2"></div>
                <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {item.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Timeline Legend -->
  <div class="mt-16 bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-xl font-bold text-mcswf-red mb-4 font-colossalis">Timeline Legend</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-mcswf-gold mr-2"></div>
        <span class="text-sm text-gray-700">Milestone</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-mcswf-blue mr-2"></div>
        <span class="text-sm text-gray-700">Presentation</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-mcswf-gold-dark mr-2"></div>
        <span class="text-sm text-gray-700">Inspiration</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-mcswf-battle-red mr-2"></div>
        <span class="text-sm text-gray-700">Training</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-mcswf-pinstripe mr-2"></div>
        <span class="text-sm text-gray-700">Partnership</span>
      </div>
    </div>
  </div>
</div>

<style>
  .timeline-item {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @media (max-width: 768px) {
    .timeline-item {
      transform: none !important;
      opacity: 1 !important;
    }
  }
</style>
