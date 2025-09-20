<script>
  export let displayImage = false;
</script>

<a
  href="/"
  class="flex items-center">
  {#if displayImage}
    <img
      style="fill: white;"
      src="/image.png"
      class="h-12 text-white mr-4"
      alt="MIU Logo" />
  {/if}
  <div class="flex flex-col">
    <span
      class="tracking-widest leading-normal sm:leading-snug text-[15px] sm:text-[21px] text-white font-roboto whitespace-nowrap bg-gradient-to-r from-white via-slate-50 to-slate-100 inline-block text-transparent bg-clip-text"
      >MIU Marine Coders</span>
    <span
      class="tracking-wider text-[10px] sm:text-[12px] text-mcswf-gold font-roboto whitespace-nowrap opacity-80"
      >#AnyMarineACoder</span>
  </div>
</a>
