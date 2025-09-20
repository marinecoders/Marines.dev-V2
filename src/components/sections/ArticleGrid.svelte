<script>
  import ArticleCard from '@components/cards/ArticleCard.svelte';
  
  export let articles = [];
  export let featured = false;
  export let columns = 3;
  
  const getGridClass = () => {
    if (featured) {
      return 'grid grid-cols-1 lg:grid-cols-2 gap-8';
    }
    
    switch (columns) {
      case 1:
        return 'grid grid-cols-1 gap-6';
      case 2:
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
      case 3:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 4:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };
</script>

<div class={getGridClass()}>
  {#each articles as article}
    <ArticleCard {article} {featured} />
  {/each}
</div>
