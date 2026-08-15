<script>
  import { twMerge } from 'tailwind-merge';
  import LinkedIn from '@icons/LinkedIn.svelte';

  export let name = '';
  export let rank = '';
  export let mos = '';
  export let status = 'reserve'; // 'reserve' | 'active' | 'veteran'
  export let profileImg = '';
  export let company = '';
  export let companyLogo = '';
  export let title = '';
  export let linkedIn = '';

  const statusConfig = {
    active: {
      label: 'ACTIVE DUTY',
      bg: 'bg-emerald-500/15',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    reserve: {
      label: 'RESERVE',
      bg: 'bg-mcswf-gold/15',
      text: 'text-mcswf-gold',
      border: 'border-mcswf-gold/30',
      dot: 'bg-mcswf-gold',
    },
    veteran: {
      label: 'VETERAN',
      bg: 'bg-sky-500/15',
      text: 'text-sky-400',
      border: 'border-sky-500/30',
      dot: 'bg-sky-400',
    },
  };

  $: config = statusConfig[status] || statusConfig.reserve;
  $: initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

</script>

<div class="coder-card group">
  <div class="p-5">
    <!-- Top row: photo + info -->
    <div class="flex items-start gap-4">
      <!-- Profile photo with gradient ring -->
      <div class="relative shrink-0">
        <div
          class="h-16 w-16 rounded-full p-[2px] bg-gradient-to-br from-mcswf-gold via-mcswf-red to-mcswf-blue transition-all duration-300 group-hover:from-mcswf-gold group-hover:via-mcswf-gold-dark group-hover:to-mcswf-gold">
          {#if profileImg}
            <img
              src={profileImg}
              alt={name}
              class="h-full w-full rounded-full object-cover bg-gray-800" />
          {:else}
            <div
              class="flex h-full w-full items-center justify-center rounded-full bg-gray-800 text-lg font-bold tracking-wider text-gray-400 font-roboto">
              {initials}
            </div>
          {/if}
        </div>
      </div>

      <!-- Name, rank, status -->
      <div class="min-w-0 flex-1">
        <h3
          class="truncate text-base font-bold tracking-wide text-white group-hover:text-mcswf-gold transition-colors duration-300 font-roboto">
          {name}
        </h3>
        <p class="mt-0.5 truncate text-sm font-medium tracking-wider text-gray-400 uppercase font-roboto">
          {rank}
        </p>
        {#if mos}
          <p class="mt-0.5 truncate text-xs tracking-wide text-gray-500 font-roboto">
            {mos}
          </p>
        {/if}
        <!-- Status badge -->
        <div class="mt-2 inline-flex items-center gap-1.5">
          <span
            class={twMerge(
              'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase font-roboto',
              config.bg,
              config.text,
              config.border
            )}>
            <span class={twMerge('h-1.5 w-1.5 rounded-full', config.dot)}></span>
            {config.label}
          </span>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="my-4 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>

    <!-- Company -->
    {#if company}
      <div class="flex items-center gap-3">
        {#if companyLogo}
          <img
            src={companyLogo}
            alt={company}
            class="h-6 w-6 rounded object-contain bg-white/10 p-0.5" />
        {:else}
          <div
            class="flex h-6 w-6 items-center justify-center rounded bg-gray-700/50 text-[10px] font-bold text-gray-400 font-roboto">
            {company.charAt(0)}
          </div>
        {/if}
        <div class="min-w-0">
          <span class="block truncate text-sm tracking-wide text-gray-300 font-roboto">{company}</span>
          {#if title}
            <span class="block truncate text-xs tracking-wide text-gray-500 font-roboto">{title}</span>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Bottom: linkedin -->
    {#if linkedIn}
      <div class="mt-3 flex items-center justify-end">
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-gray-400 transition-colors duration-200 hover:text-linkedin-blue"
          aria-label="LinkedIn profile for {name}">
          <LinkedIn size="sm" secondary="fill-gray-800" />
        </a>
      </div>
    {/if}
  </div>
</div>

<style>
  .coder-card {
    position: relative;
    border-radius: 0.75rem;
    border: 1px solid rgba(75, 85, 99, 0.4);
    background-color: rgba(255, 255, 255, 0.05);
    transition: border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease;
  }

  .coder-card:hover {
    border-color: rgba(255, 199, 85, 0.3);
    transform: translateY(-2px);
  }
</style>
