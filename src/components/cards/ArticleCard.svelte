<script>
  import { onMount } from 'svelte';
  
  export let article;
  export let featured = false;
  
  let cardElement;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMouseMove = (e) => {
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardElement.style.setProperty('--mouse-x', `${x}px`);
    cardElement.style.setProperty('--mouse-y', `${y}px`);
  };

  onMount(() => {
    if (cardElement) {
      cardElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  });
</script>

<article 
  bind:this={cardElement}
  class="article-card rounded-lg overflow-hidden border {featured ? 'border-mcswf-gold' : 'border-gray-600 dark:border-gray-700'} cursor-pointer {article.data.external ? '' : 'max-height-constrained'}"
  style="--mouse-x: 0px; --mouse-y: 0px;"
>
  <div class="card-content  dark:bg-gray-800 rounded-lg flex flex-col h-full">
    {#if article.data.image}
      <div class="aspect-video bg-gray-700 overflow-hidden">
        <img 
          src={article.data.image.src} 
          alt={article.data.image.alt}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}
    
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center gap-2 mb-3">
        <span class="px-2 py-1 bg-mcswf-gold text-white  text-xs font-semibold rounded">
          {article.data.category}
        </span>
        {#if article.data.external}
          <span class="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
            External
          </span>
        {/if}
        {#if article.data.featured}
          <span class="px-2 py-1 bg-yellow-600 text-white text-xs font-semibold rounded">
            Featured
          </span>
        {/if}
      </div>
      
      <h3 class="text-xl font-bold text-black dark:text-white mb-3 {featured ? 'text-2xl' : ''}">
        {#if article.data.external}
          <a 
            href={article.data.externalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-mcswf-gold transition-colors"
          >
            {article.data.title}
            <svg class="inline-block w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        {:else}
          <a 
            href="/articles/{article.slug}"
            class="hover:text-mcswf-gold transition-colors"
          >
            {article.data.title}
          </a>
        {/if}
      </h3>
      
      <p class="text-gray-700 dark:text-gray-300 text-sm mb-4 {featured ? 'text-base' : ''} line-clamp-3">
        {article.data.description}
      </p>
      
      <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mt-auto">
        <span>By {article.data.author}</span>
        <time datetime={article.data.publishDate}>
          {featured ? formatDate(article.data.publishDate) : formatShortDate(article.data.publishDate)}
        </time>
      </div>
    </div>
  </div>
</article>

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
    transition: border-color 300ms ease, box-shadow 300ms ease;
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
  }

  .max-height-constrained {
    max-height: 500px;
  }

  .max-height-constrained .card-content {
    overflow: hidden;
  }

  /* Light mode adjustments */
  :global(.light) .article-card {
    background-color: rgba(0, 0, 0, 0.05);
  }

  :global(.light) .article-card::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
  }

  :global(.light) .article-card::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
    );
  }
</style>
