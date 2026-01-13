<script>
  import { useMotionTemplate, useMotionValue, Motion } from 'svelte-motion';
  import { cn } from '../../lib/utils';
  import { onMount } from 'svelte';

  export let text;
  export let className;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  let randomString = '';

  onMount(() => {
    const str = generateRandomString(1500);
    randomString = str;
  });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);

    randomString = str;
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const generateRandomString = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };
</script>

<div class={cn('relative flex items-center justify-center bg-transparent', className)}>
  <div
    on:mousemove={onMouseMove}
    class="group/card relative flex items-center justify-center overflow-hidden rounded-lg bg-transparent"
    role="presentation">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 rounded-lg [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <Motion
        let:motion
        {style}>
        <div
          use:motion
          class="absolute inset-0 rounded-lg opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100"
          style="background: radial-gradient(circle at 20% 50%, #991B20 0%, transparent 50%), radial-gradient(circle at 80% 50%, #07405B 0%, transparent 50%), linear-gradient(135deg, #FFC755 0%, #a6192e 50%, #101728 100%);">
        </div>
      </Motion>
      <Motion
        let:motion
        {style}>
        <div
          use:motion
          class="absolute inset-0 rounded-lg opacity-0 mix-blend-overlay group-hover/card:opacity-100">
          <p class="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-mcswf-white-50 transition duration-500">
            {randomString}
          </p>
        </div>
      </Motion>
    </div>
    <div class="relative z-10 flex items-center justify-center">
      {#if text}
        <div class="relative flex h-44 w-44 items-center justify-center rounded-full text-4xl font-bold text-white">
          <div class="absolute h-full w-full rounded-full bg-white/[0.8] blur-sm dark:bg-black/[0.8]"></div>
          <span class="z-20 text-black dark:text-white">{text}</span>
        </div>
      {:else}
        <slot />
      {/if}
    </div>
  </div>
</div>
