<script>
  export let displayImage = false;
</script>

<a
  href="/"
  class="flex items-center group transition-all duration-300 ease-in-out">
  {#if displayImage}
    <img
      style="fill: white;"
      src="/coders-logo.png"
      class="h-12 text-white mr-4 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,199,85,0.4)]"
      alt="Coders Logo" />
  {/if}
  <div class="flex flex-col">
    <span
      class="tracking-widest leading-normal sm:leading-snug text-[15px] sm:text-[21px] text-white font-roboto whitespace-nowrap font-bold bg-gradient-to-r from-white via-slate-50 to-slate-100 inline-block text-transparent bg-clip-text [text-shadow:_0_2px_8px_rgb(255_255_255_/_0.2)] group-hover:[text-shadow:_0_3px_12px_rgb(255_255_255_/_0.4)] transition-all duration-300"
      >MIU Marine Coders</span>
    <span
      class="tracking-wider text-[10px] sm:text-[12px] text-mcswf-gold font-roboto whitespace-nowrap [text-shadow:_0_2px_6px_rgb(255_199_85_/_0.1)] group-hover:[text-shadow:_0_3px_10px_rgb(255_199_85_/_0.4)] transition-all duration-300"
      ><span class="italic font-semibold">Objective</span> Oriented Programming</span>
  </div>
</a>
