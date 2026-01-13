<script>
  import { twMerge } from 'tailwind-merge';
  import { Button } from 'flowbite-svelte';
  import EvervaultCard from '@components/effects/EvervaultCard.svelte';

  export let color = 'white'; // white, yellow, red
  export let size = 'md'; // xs, sm, md, lg, xl
  export let handleClick = () => {};
  export let link = '';
  export let disabled = false;
  export let externalLink = false;
  export let evervaultBackground = true;

  const colorSpecificClasses = {
    white:
      'bg-mcswf-white-50 text-usmc-red hover:bg-zinc-200 hover:focus:ring-zinc-400/0 focus:ring-zinc-400/70 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.15)] hover:[text-shadow:_0_2px_8px_rgb(0_0_0_/_0.25)] hover:scale-[1.02] transition-all duration-300 ease-in-out',
    yellow:
      'bg-mcswf-gold text-usmc-red hover:bg-amber-400 hover:focus:ring-amber-600/0 focus:ring-amber-600/70 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.15)] hover:[text-shadow:_0_2px_8px_rgb(0_0_0_/_0.25)] hover:scale-[1.02] transition-all duration-300 ease-in-out',
    red: 'bg-mcswf-red text-mcswf-white-50 hover:bg-red-900 hover:focus:ring-red-950/0 focus:ring-red-950/70 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.3)] hover:[text-shadow:_0_3px_10px_rgb(0_0_0_/_0.5)] hover:scale-[1.02] transition-all duration-300 ease-in-out',
  };

  const colorEvervaultClasses = {
    white:
      'bg-mcswf-white-50 text-usmc-red hover:text-mcswf-white-50 hover:bg-transparent hover:focus:ring-zinc-400/0 focus:ring-zinc-400/70 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.15)] hover:[text-shadow:_0_4px_12px_rgb(0_0_0_/_0.6),_0_0_20px_rgb(0_150_255_/_0.3)] hover:scale-105 hover:tracking-wider transition-all duration-500 ease-in-out',
    yellow:
      'bg-mcswf-gold text-usmc-red hover:text-mcswf-white-50 hover:bg-transparent hover:focus:ring-amber-600/0 focus:ring-amber-600/70 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.15)] hover:[text-shadow:_0_4px_12px_rgb(0_0_0_/_0.6),_0_0_20px_rgb(0_150_255_/_0.3)] hover:scale-105 hover:tracking-wider transition-all duration-500 ease-in-out',
    red: 'bg-mcswf-red text-mcswf-white-50 hover:text-mcswf-white-50 hover:bg-transparent hover:focus:ring-red-950/0 focus:ring-red-950/70 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.3)] hover:[text-shadow:_0_4px_12px_rgb(0_0_0_/_0.6),_0_0_20px_rgb(0_150_255_/_0.3)] hover:scale-105 hover:tracking-wider transition-all duration-500 ease-in-out',
  };

  let target = '';
  let rel = '';

  if (externalLink) {
    target = '_blank';
    rel = 'noopener noreferrer';
  }
</script>

{#if evervaultBackground}
  <EvervaultCard class="inline-block w-max">
    <Button
      {...$$restProps}
      href={link}
      {target}
      {rel}
      on:click={handleClick}
      {size}
      class={twMerge(
        'inline-block uppercase text-center align-middle rounded font-bold tracking-wide border border-transparent shadow-lg focus:outline-none focus:ring-2',
        colorEvervaultClasses[color],
        $$props.class
      )}
      {disabled}>
      <slot />
    </Button>
  </EvervaultCard>
{:else}
  <Button
    {...$$restProps}
    href={link}
    {target}
    {rel}
    on:click={handleClick}
    {size}
    class={twMerge(
      'inline-block uppercase text-center align-middle rounded font-bold tracking-wide border border-transparent shadow-lg focus:outline-none focus:ring-2',
      colorSpecificClasses[color],
      $$props.class
    )}
    {disabled}>
    <slot />
  </Button>
{/if}
