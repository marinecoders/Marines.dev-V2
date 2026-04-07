<script>
  import { twMerge } from 'tailwind-merge';
  import { fade } from 'svelte/transition';
  import CoderCard from '@components/cards/CoderCard.svelte';

  export let coders = [];

  let activeFilter = 'all';

  const filters = [
    { key: 'all', label: 'ALL' },
    { key: 'active', label: 'ACTIVE DUTY' },
    { key: 'reserve', label: 'RESERVE' },
    { key: 'veteran', label: 'VETERAN' },
  ];

  $: filteredCoders =
    activeFilter === 'all' ? coders : coders.filter((c) => c.status === activeFilter);

  $: count = filteredCoders.length;
</script>

<!-- Filter bar -->
<div class="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
  <div class="flex flex-wrap items-center justify-center gap-2">
    {#each filters as filter}
      <button
        on:click={() => (activeFilter = filter.key)}
        class={twMerge(
          'rounded-lg border px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 font-roboto',
          activeFilter === filter.key
            ? 'border-mcswf-gold/50 bg-mcswf-gold/15 text-mcswf-gold'
            : 'border-gray-600/40 bg-gray-800/40 text-gray-400 hover:border-gray-500/60 hover:text-gray-300'
        )}>
        {filter.label}
      </button>
    {/each}
  </div>
  <span class="text-sm tracking-wider text-gray-500 font-roboto">
    {count}
    {count === 1 ? 'CODER' : 'CODERS'}
  </span>
</div>

<!-- Grid -->
{#key activeFilter}
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    in:fade={{ duration: 200 }}>
    {#each filteredCoders as coder, i (i)}
      <CoderCard {...coder} />
    {/each}
  </div>
{/key}

{#if filteredCoders.length === 0}
  <div class="py-16 text-center">
    <p class="text-lg tracking-wider text-gray-500 font-roboto">No coders found for this filter.</p>
  </div>
{/if}
