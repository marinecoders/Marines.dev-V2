<script>
  import { AccordionItem, Accordion, Dropdown } from 'flowbite-svelte';
  import { slide, fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import MaxWidthContainer from '@components/sections/MaxWidthContainer.svelte';
  import ButtonCustom from '@components/buttons/ButtonCustom.svelte';
  import Hamburger from '@icons/Hamburger.svelte';
  import ForwardArrow from '@icons/ForwardArrow.svelte';
  import CodersLogoAndText from '@components/logos/CodersLogoAndText.svelte';
  import ThemeToggle from '@components/ThemeToggle.svelte';
  import { externalLinks } from '@content/externalLinks';
  import SiteClassificationBanner from '@components/SiteClassificationBanner.svelte';
  import { displaySiteClassificationBanner } from './stores.js';
  import SiteOfficialBanner from '@components/SiteOfficialBanner.svelte';
  import BackgroundBeams from '@components/effects/BackgroundBeams.svelte';

  displaySiteClassificationBanner.set(true);

  let dropdownOpen = false;

  // Prevent horizontal scroll when dropdown is open
  $: if (dropdownOpen) {
    document.body.style.overflowX = 'hidden';
  } else {
    document.body.style.overflowX = '';
  }

  const dropdownLinks = [
    {
      text: 'ABOUT',
      image: '/images/about_card.png',
      url: '/about',
      subLinks: [
        { url: '/about', text: 'WHO WE ARE' },
        { url: '/timeline', text: 'CODERS HISTORY' },
        { url: '/publication', text: 'PUBLICATION 1' },
      ],
    },
    {
      text: 'PRODUCTS',
      url: '/products/ares',
      image: '/images/products_card.png',
      subLinks: [
        { url: '/products/ares', text: 'HLZ' },
        { url: '/products/FlightMode', text: 'FlightMode' },
        { url: '/products/dondocs', text: 'DonDocs' },
      ],
    },
    {
      text: 'CAREER',
      image: '/images/training_career_card.png',
      url: '/roles',
      subLinks: [
        { url: '/roles', text: 'ROLES' },
        { url: '/contactUs/applyNow', text: 'HOW TO APPLY' },
      ],
      titleClasses: 'text-sm lg:text-xl',
    },
    {
      text: 'NEWS',
      image: '/images/contact_card.png',
      url: '/articles',
      subLinks: [{ url: '/articles', text: 'ARTICLES AND EVENTS' }],
    },
  ];

  const fadeSlide = (node, options) => {
    const slideTrans = slide(node, options);
    return {
      duration: options.duration,
      css: (t) => `${slideTrans.css(t)} opacity: ${t}`,
    };
  };
</script>

<header
  id="header"
  class="w-full sticky top-0 z-30 shadow-sm shadow-stone-950"
  style="background-color: #1a1d24;">
  <!-- <SiteOfficialBanner /> -->
  <SiteClassificationBanner />
  <MaxWidthContainer>
    <div class="flex flex-row justify-between items-center w-full py-2 sm:py-4 md:gap-4 lg:gap-8">
      <CodersLogoAndText displayImage={true} />
      <div class="flex items-center gap-4">
        <!-- Theme toggle - hidden on mobile, shown on desktop -->
        <!-- <div class="hidden md:block">
          <ThemeToggle />
        </div> -->
        <!-- {#if dropdownOpen}
          <div
            class="ml-auto hidden md:block"
            transition:fade={{ duration: 300, easing: quintOut }}>
            <ButtonCustom
              color="white"
              size="md"
              class="px-2 py-1 text-xs sm:px-4 sm:text-base ml-auto hidden md:block"
              link="/contactUs/getInTouch"
              externalLink={true}>GET IN TOUCH</ButtonCustom>
          </div>
        {/if} -->
        <Hamburger
          bind:open={dropdownOpen}
          class="bg-zinc-200"
          id="site-header-hamburger" />
      </div>
    </div>
  </MaxWidthContainer>

  <Dropdown
    bind:open={dropdownOpen}
    triggeredBy="#site-header-hamburger"
    containerClass="py-6 w-full rounded-t-none !top-[108px] md:!top-[120px] text-white"
    style="background-color: #1a1d24; z-index: 25;">
    <div transition:fadeSlide={{ duration: 200 }}>
      <MaxWidthContainer>
        <!-- Desktop Nav Header -->
        <div class="hidden md:grid md:grid-cols-4 gap-2 md:gap-4 md:pr-12 lg:pr-32 xl:pr-64 px-0">
          {#each dropdownLinks as link}
            <div class="col-span-1 tracking-wide">
              <h2 class="inline-block text-sm lg:text-base font-semibold text-slate-300 tracking-widest pb-2 mb-2 border-b border-mcswf-gold/30 uppercase">{link.text}</h2>
              {#if link.subLinks}
                <ul class="text-base lg:text-lg font-bold">
                  {#each link.subLinks as subLink}
                    <li class="p-1">
                      <a
                        href={subLink.url}
                        class="relative inline-block overflow-hidden border-b-2 border-transparent hover:text-mcswf-gold tracking-wider group whitespace-nowrap">
                        <span class="ease absolute left-0 bottom-0 h-0 w-0 border-b-2 border-mcswf-gold transition-all duration-200 group-hover:w-full">{subLink.text}</span>
                        <span>{subLink.text}</span>
                        <ForwardArrow class="ease transition-all duration-200 group-hover:translate-x-2 w-6" />
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </div>
        <div class="flex justify-center">
          <a
            href={'/contactUs/applyNow'}
            target="_blank"
            rel="noopener noreferrer"
            class="m-auto md:hidden underline underline-offset-2 text-mcswf-gold hover:text-mcswf-gold-dark">Learn how to apply</a>
        </div>
        <!-- Mobile Nav Header -->
        <div class="block md:hidden py-4 text-white fill-whith">
          <!-- Theme Toggle for Mobile -->
          <!-- <div class="flex justify-center items-center mb-6 pb-4 border-b border-gray-600">
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-300">Theme:</span>
              <ThemeToggle />
            </div>
          </div> -->
          <Accordion flush>
            {#each dropdownLinks as link}
              <AccordionItem
                borderBottomClass="none"
                paddingFlush="none"
                textFlushDefault="text-white hover:text-zinc-200"
                textFlushOpen="text-mcswf-gold hover:text-mcswf-gold-dark"
                class="py-2">
                <h2
                  slot="header"
                  class="inline-block text-lg font-semibold w-full tracking-widest uppercase opacity-90">
                  {link.text}
                </h2>
                <div
                  slot="arrowdown"
                  class="font-bold text-2xl w-5"
                  transition:fly={{ duration: 200, x: -20, y: 0, opacity: 0.1 }}>
                  +
                </div>
                <div
                  slot="arrowup"
                  class="font-bold text-2xl w-5"
                  transition:fade={{ duration: 200 }}>
                  —
                </div>

                {#if link.subLinks}
                  <ul class="text-base text-white font-bold">
                    {#each link.subLinks as subLink}
                      <li class="py-2 pl-4">
                        <a
                          href={subLink.url}
                          class="relative inline-block overflow-hidden border-b-2 border-transparent hover:text-mcswf-gold tracking-wider group whitespace-nowrap">
                          <span class="ease absolute left-0 bottom-0 h-0 w-0 border-b-2 border-mcswf-gold transition-all duration-200 group-hover:w-full">{subLink.text}</span>
                          <span>{subLink.text}</span>
                          <ForwardArrow class="ease transition-all duration-200 group-hover:translate-x-2 w-6" />
                        </a>
                      </li>
                    {/each}
                  </ul>
                {/if}
              </AccordionItem>
            {/each}
          </Accordion>
        </div>
      </MaxWidthContainer>
    </div>
  </Dropdown>
  <BackgroundBeams className="pointer-events-none" />
</header>
