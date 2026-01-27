<script>
  import { onMount, afterUpdate, tick } from 'svelte';
  
  export let articles = [];
  export let categories = [];
  
  let selectedCategory = '';
  let currentPage = 1;
  const itemsPerPage = 9; // 3 columns x 3 rows
  
  // Check if we're in the browser
  const isBrowser = typeof document !== 'undefined';
  
  // Filter articles by category
  $: filteredArticles = selectedCategory
    ? articles.filter((article) => article.data.category === selectedCategory)
    : articles;
  
  // Calculate pagination
  $: totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;
  $: paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  // Reset to page 1 when filter changes
  let previousCategory = '';
  $: {
    if (selectedCategory !== previousCategory) {
      currentPage = 1;
      previousCategory = selectedCategory;
    }
  }
  
  function handleCategoryClick(category) {
    selectedCategory = selectedCategory === category ? '' : category;
    currentPage = 1;
  }
  
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      // Scroll to top of section (only in browser)
      if (isBrowser) {
        const section = document.getElementById('all-news-events-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }
  
  function previousPage() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }
  
  function nextPage() {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }
  
  // Setup mouse move effects for article cards when articles change
  async function setupCardEffects() {
    if (!isBrowser) return;
    
    await tick(); // Wait for Svelte to finish rendering
    const cards = document.querySelectorAll('#all-news-events-section .article-card');
    
    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };
      
      card.addEventListener('mousemove', handleMouseMove);
    });
  }
  
  // Setup effects when paginated articles change (only in browser)
  $: if (isBrowser && paginatedArticles.length > 0) {
    setupCardEffects();
  }
  
  onMount(() => {
    setupCardEffects();
  });
  
  // Also setup effects after updates (for when articles change)
  afterUpdate(() => {
    setupCardEffects();
  });
</script>

<section id="all-news-events-section">
  <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
    <h2 class="text-3xl font-bold text-mcswf-gold">All News and Events</h2>
    <div class="flex gap-2 flex-wrap">
      <button
        on:click={() => handleCategoryClick('')}
        class={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer ${
          selectedCategory === ''
            ? 'bg-mcswf-gold text-black font-semibold'
            : 'bg-gray-600 dark:bg-gray-700 text-gray-200 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-600'
        }`}>
        All
      </button>
      {#each categories as category}
        <button
          on:click={() => handleCategoryClick(category)}
          class={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer ${
            selectedCategory === category
              ? 'bg-mcswf-gold text-black font-semibold'
              : category === 'Military Innovation' || category === 'External Analysis'
              ? 'border-2 border-yellow-600 dark:border-0 dark:bg-yellow-600 bg-yellow-100 text-yellow-600 dark:text-white hover:opacity-80'
              : 'bg-gray-600 dark:bg-gray-700 text-gray-200 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-600'
          }`}>
          {category}
        </button>
      {/each}
    </div>
  </div>

  <!-- Articles Grid -->
  <div class="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {#each paginatedArticles as article}
      <article 
        class="article-card rounded-lg overflow-hidden border border-gray-600 dark:border-gray-700 cursor-pointer h-full"
        style="--mouse-x: 0px; --mouse-y: 0px;"
      >
        <div class="card-content bg-[#1a1d24] rounded-lg flex flex-col h-full">
          {#if article.data.image}
            <div class="image-container bg-gray-700 overflow-hidden flex-shrink-0">
              <img
                src={article.data.image.src}
                alt={article.data.image.alt}
                class="article-image w-full h-full object-cover"
              />
            </div>
          {/if}
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-2 mb-3">
              <span
                class={`px-2 py-1 text-xs font-semibold rounded ${
                  article.data.category === 'Military Innovation' || article.data.category === 'External Analysis'
                    ? 'border-2 border-yellow-600 dark:border-0 dark:bg-yellow-600 bg-yellow-100 text-yellow-600 dark:text-white'
                    : 'bg-mcswf-gold text-black'
                }`}>
                {article.data.category}
              </span>
              {#if article.data.external}
                <span class="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">External</span>
              {/if}
            </div>
            <h3 class="text-xl font-bold text-white dark:text-white mb-3">
              {#if article.data.external}
                <a
                  href={article.data.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-mcswf-gold transition-colors">
                  {article.data.title}
                  <svg
                    class="inline-block w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              {:else}
                <a
                  href={`/articles/${article.slug}`}
                  class="hover:text-mcswf-gold transition-colors">
                  {article.data.title}
                </a>
              {/if}
            </h3>
            <p class="text-white text-opacity-50 text-sm mb-4 line-clamp-3 flex-grow">{article.data.description}</p>
            <div class="flex items-center justify-between text-xs text-gray-600 mt-auto">
              <span>By {article.data.author}</span>
              <time datetime={article.data.publishDate instanceof Date ? article.data.publishDate.toISOString() : new Date(article.data.publishDate).toISOString()}>
                {article.data.publishDate instanceof Date 
                  ? article.data.publishDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  : new Date(article.data.publishDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                }
              </time>
            </div>
          </div>
        </div>
      </article>
    {/each}
  </div>

  <!-- Pagination Controls -->
  {#if totalPages > 1}
    <div class="flex items-center justify-center gap-2 mt-8">
      <button
        on:click={previousPage}
        disabled={currentPage === 1}
        class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Previous
      </button>
      
      <div class="flex gap-1">
        {#each Array(Math.min(7, totalPages)) as _, i}
          {@const pageNum = i + 1}
          {#if totalPages <= 7}
            <button
              on:click={() => goToPage(pageNum)}
              class={`px-3 py-2 rounded transition-colors ${
                currentPage === pageNum
                  ? 'bg-mcswf-gold text-black font-semibold'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}>
              {pageNum}
            </button>
          {:else if currentPage <= 4}
            {#if pageNum <= 5}
              <button
                on:click={() => goToPage(pageNum)}
                class={`px-3 py-2 rounded transition-colors ${
                  currentPage === pageNum
                    ? 'bg-mcswf-gold text-black font-semibold'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}>
                {pageNum}
              </button>
            {:else if pageNum === 6}
              <span class="px-3 py-2 text-gray-400">...</span>
            {:else if pageNum === 7}
              <button
                on:click={() => goToPage(totalPages)}
                class="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                {totalPages}
              </button>
            {/if}
          {:else if currentPage >= totalPages - 3}
            {#if pageNum === 1}
              <button
                on:click={() => goToPage(1)}
                class="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                1
              </button>
            {:else if pageNum === 2}
              <span class="px-3 py-2 text-gray-400">...</span>
            {:else}
              {@const actualPage = totalPages - (7 - pageNum)}
              <button
                on:click={() => goToPage(actualPage)}
                class={`px-3 py-2 rounded transition-colors ${
                  currentPage === actualPage
                    ? 'bg-mcswf-gold text-black font-semibold'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}>
                {actualPage}
              </button>
            {/if}
          {:else}
            {#if pageNum === 1}
              <button
                on:click={() => goToPage(1)}
                class="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                1
              </button>
            {:else if pageNum === 2}
              <span class="px-3 py-2 text-gray-400">...</span>
            {:else if pageNum === 3}
              <button
                on:click={() => goToPage(currentPage - 1)}
                class="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                {currentPage - 1}
              </button>
            {:else if pageNum === 4}
              <button
                on:click={() => goToPage(currentPage)}
                class="px-3 py-2 rounded bg-mcswf-gold text-black font-semibold transition-colors">
                {currentPage}
              </button>
            {:else if pageNum === 5}
              <button
                on:click={() => goToPage(currentPage + 1)}
                class="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                {currentPage + 1}
              </button>
            {:else if pageNum === 6}
              <span class="px-3 py-2 text-gray-400">...</span>
            {:else}
              <button
                on:click={() => goToPage(totalPages)}
                class="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                {totalPages}
              </button>
            {/if}
          {/if}
        {/each}
      </div>
      
      <button
        on:click={nextPage}
        disabled={currentPage === totalPages}
        class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Next
      </button>
    </div>
    
    <!-- Page Info -->
    <div class="text-center mt-4 text-gray-400 text-sm">
      Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} {selectedCategory ? `${selectedCategory.toLowerCase()} ` : ''}article{filteredArticles.length !== 1 ? 's' : ''}
    </div>
  {/if}
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-card {
    position: relative;
    background-color: rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: border-color 300ms ease, box-shadow 300ms ease;
  }
  
  .article-card[class*="border"] {
    border-width: 1px;
    border-style: solid;
  }

  .article-card:hover {
    border-color: rgba(255, 255, 255, 0.4) !important;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
  }

  .article-card::before,
  .article-card::after {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
    pointer-events: none;
  }

  .article-card::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    z-index: 3;
  }

  .article-card::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
    );
    z-index: 1;
  }

  .article-card:hover::before {
    opacity: 1;
  }

  .article-card:hover::after {
    opacity: 1;
  }

  .card-content {
    position: relative;
    inset: 1px;
    z-index: 2;
    border-radius: inherit;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .articles-grid {
    align-items: stretch;
  }

  .articles-grid > * {
    display: flex;
    flex-direction: column;
  }

  .image-container {
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    background-color: #374151;
    transition: background-color 0.3s ease;
  }

  .article-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

</style>
