<script>
  import { twMerge } from 'tailwind-merge';
  import Timer from './Timer.svelte';

  export let title = '';
  export let content = '';
  export let titleClasses = '';
</script>

<div class="w-full flex flex-col gap-6 lg:gap-12 mt-6 lg:mt-0 py-6">
  <h2
    class={twMerge(
      'font-bold tracking-wider lg:text-center text-2xl md:text-3xl lg:text-[40px] bg-gradient-to-r from-mcswf-gold via-mcswf-gold-dark to-mcswf-gold text-transparent bg-clip-text [text-shadow:_0_2px_8px_rgb(255_199_85_/_0.2)] leading-tight',
      titleClasses
    )}>
    {title}
  </h2>
  <p class="text-left lg:text-center whitespace-pre-line text-base md:text-[21px] font-normal leading-relaxed tracking-wide text-slate-100 max-w-4xl mx-auto">{content}</p>
  <Timer />
</div>
