<script>
  export let article;
  export let featured = false;
  
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
</script>

<article class="bg-gray-800 rounded-lg overflow-hidden border {featured ? 'border-mcswf-gold hover:border-mcswf-gold-dark' : 'border-gray-700 hover:border-mcswf-gold'} transition-colors">
  {#if article.data.image}
    <div class="aspect-video bg-gray-700">
      <img 
        src={article.data.image.src} 
        alt={article.data.image.alt}
        class="w-full h-full object-cover"
      />
    </div>
  {/if}
  
  <div class="p-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2 py-1 bg-mcswf-gold text-black text-xs font-semibold rounded">
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
    
    <h3 class="text-xl font-bold text-white mb-3 {featured ? 'text-2xl' : ''}">
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
    
    <p class="text-gray-300 text-sm mb-4 {featured ? 'text-base' : ''} line-clamp-3">
      {article.data.description}
    </p>
    
    <div class="flex items-center justify-between text-xs text-gray-400">
      <span>By {article.data.author}</span>
      <time datetime={article.data.publishDate}>
        {featured ? formatDate(article.data.publishDate) : formatShortDate(article.data.publishDate)}
      </time>
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
</style>
