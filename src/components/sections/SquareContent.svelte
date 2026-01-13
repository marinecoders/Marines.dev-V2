<script>
  import { twMerge } from 'tailwind-merge';
  import ButtonCustom from '@components/buttons/ButtonCustom.svelte';

  export let title = '';
  export let titleClasses = '';
  export let content = null;
  export let link = null;
  export let linkText = null;
  export let evervaultBackground = true;
  export let color = 'white';
</script>

<div class="w-full flex flex-col gap-6 lg:gap-12 mt-6 lg:mt-0">
  <h2
    class={twMerge(
      'font-bold tracking-wider lg:text-center text-2xl md:text-3xl lg:text-[40px] bg-gradient-to-r from-mcswf-gold via-mcswf-gold-dark to-mcswf-gold text-transparent bg-clip-text [text-shadow:_0_2px_8px_rgb(255_199_85_/_0.2)] leading-tight',
      titleClasses
    )}>
    {#if !title}
      <slot name="squareTitle" />
    {:else}
      {title}
    {/if}
  </h2>
  {#if content instanceof Array}
    <ul class="flex justify-center text-left lg:text-center my-2 list-disc text-base md:text-[21px] font-normal leading-relaxed tracking-wide text-slate-100">
      {#each content as b, index}
        <li key={index}>{b}</li>
      {/each}
    </ul>
  {:else}
    <p class="text-left lg:text-center whitespace-pre-line text-base md:text-[21px] font-normal leading-relaxed tracking-wide text-slate-100 max-w-4xl mx-auto">
      {content}
    </p>
  {/if}
  {#if link}
    <div class="grid w-full gap-3 md:inline-flex md:justify-center justify-items-center">
      <ButtonCustom
        {color}
        size="xl"
        class="w-full md:w-64"
        {link}
        {evervaultBackground}>
        {linkText}
      </ButtonCustom>
    </div>
  {/if}
</div>
