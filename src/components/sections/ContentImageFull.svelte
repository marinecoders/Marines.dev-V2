<script>
  import SquareImage from '@components/sections/SquareImage.svelte';
  import SquareContent from '@components/sections/SquareContent.svelte';
  import BackgroundGradient from '@components/effects/BackgroundGradient.svelte';

  export let image = '/images/ega_network.jpg';
  export let imageAltText = '';
  export let imageClasses = '';
  export let imagePosition = 'right';
  export let gradientBackground = false;
</script>

<div class="py-4 lg:py-8 grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-24 justify-center items-center">
  <div class={imagePosition === 'right' ? 'lg:order-2 order-1' : 'lg:order-1 order-1'}>
    {#if gradientBackground}
      <BackgroundGradient className="rounded-md p-1 md:p-2">
        <SquareImage
          {image}
          {imageAltText}
          class={imageClasses} />
      </BackgroundGradient>
    {:else}
      <SquareImage
        {image}
        {imageAltText}
        class={imageClasses} />
    {/if}
  </div>
  <div class={imagePosition === 'right' ? 'lg:order-1 order-2' : 'lg:order-2 order-2'}>
    <SquareContent {...$$props}>
      <slot
        name="title"
        slot="squareTitle" />
    </SquareContent>
  </div>
</div>
