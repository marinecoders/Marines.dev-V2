<script>
  export let categories = [];
  export let selectedCategory = '';
  export let searchTerm = '';
  
  let searchInput = '';
  
  const handleSearch = () => {
    searchTerm = searchInput;
  };
  
  const handleCategoryChange = (category) => {
    selectedCategory = category === selectedCategory ? '' : category;
  };
  
  const clearFilters = () => {
    selectedCategory = '';
    searchTerm = '';
    searchInput = '';
  };
</script>

<div class="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
  <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
    <!-- Search -->
    <div class="flex-1 max-w-md">
      <div class="relative">
        <input
          type="text"
          placeholder="Search articles..."
          bind:value={searchInput}
          on:keydown={(e) => e.key === 'Enter' && handleSearch()}
          class="w-full px-4 py-2 pl-10 bg-gray-700 text-white rounded border border-gray-600 focus:border-mcswf-gold focus:outline-none"
        />
        <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
    
    <!-- Category Filters -->
    <div class="flex flex-wrap gap-2">
      <button
        on:click={() => handleCategoryChange('')}
        class="px-3 py-1 text-sm rounded-full transition-colors {selectedCategory === '' ? 'bg-mcswf-gold text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}"
      >
        All
      </button>
      {#each categories as category}
        <button
          on:click={() => handleCategoryChange(category)}
          class="px-3 py-1 text-sm rounded-full transition-colors {selectedCategory === category ? 'bg-mcswf-gold text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}"
        >
          {category}
        </button>
      {/each}
    </div>
    
    <!-- Clear Filters -->
    {(selectedCategory || searchTerm) && (
      <button
        on:click={clearFilters}
        class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        Clear Filters
      </button>
    )}
  </div>
  
  <!-- Active Filters Display -->
  {(selectedCategory || searchTerm) && (
    <div class="mt-4 pt-4 border-t border-gray-700">
      <div class="flex items-center gap-2 text-sm text-gray-300">
        <span>Active filters:</span>
        {#if searchTerm}
          <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">
            Search: "{searchTerm}"
          </span>
        {/if}
        {#if selectedCategory}
          <span class="px-2 py-1 bg-mcswf-gold text-black rounded text-xs">
            Category: {selectedCategory}
          </span>
        {/if}
      </div>
    </div>
  )}
</div>
