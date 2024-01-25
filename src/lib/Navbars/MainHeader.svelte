<script>
	import { mobileMenuOpen, showHeader } from '../../search-store.js';
	import Breadcrumbs from '$lib/Globals/Breadcrumbs.svelte';
	import GlobalHeaderTopRightCTA from '$lib/AdvertisementComponents/GlobalHeaderTopRightCTA.svelte';
	import { page } from '$app/stores';

	let open = false;
	let pages = $page?.data.stuff?.headerNavigation ?? [];

	let siteLogo = '';
	let siteConfig = $page.data?.stuff?.siteConfig ?? {};
	let globalHeaderSiteSettings =
		siteConfig.advertisements.length > 0
			? siteConfig.advertisements.find((ad) => ad?.display_location === 'global_header_top_right')
			: {};
	let innerWidth;
</script>

<svelte:window bind:innerWidth />
<header
	class:hidden={!$showHeader && innerWidth < 768}
	class="border-2 text-black flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-white py-2 px-0 md:py-6 md:px-6 relative"
>
	<div class="mb-2 sm:mb-0 inner px-3 grid md:flex flex-grow">
		<a href="/">
			<span class="sr-only">365carshop.com</span>
			<img class="max-h-24 w-auto" src={siteConfig.logo} alt="" />
		</a>
	</div>
	<button
		on:click={() => ($mobileMenuOpen = !$mobileMenuOpen)}
		class="inline-block md:hidden w-8 h-8 text-gray-600 p-1 mt-2 mx-4"
	>
		<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
				clip-rule="evenodd"
			/></svg
		>
	</button>
	<nav
		class:hidden={$mobileMenuOpen === false}
		class="static top-12 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-white shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0"
		:class={{ open, hidden: !mobileMenuOpen }}
	>
		<ul
			class="grid-cols-1 md:flex md:space-x-4 divide-y-2 md:divide-y-0 divide-coolGray-200 items-center"
		>
			{#each pages as pageItem}
				<a
					href={pageItem.path}
					class:active={page === pageItem.path || false}
					class="grid grid-col-1 md:block py-1 md:px-2 hover:underline"
				>
					{pageItem.title}</a
				>
			{/each}
			<GlobalHeaderTopRightCTA settings={globalHeaderSiteSettings} />
			<!-- <div class="grid grid-cols-1 justify-items-center bg-gray-300 px-4 py-5 rounded-md">
				<div class="col-span-1 pb-2"><span class="font-black text-black">Advertise With Us</span></div>
				<a
					href="https://365automotivemarketing.com"
					target="_blank"
					class="rounded-full text-md md:text-lg  w-full relative inline-flex group items-center justify-center px-3.5 py-1 md:py-2  cursor-pointer border-2  active:border-purple-600 font-bold active:shadow-none  bg-white  hover:border-red-900 text-red hover:text-white tracking-wide hover:bg-red-900 hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300"
				>
					<span>Get Started today!</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div> -->
		</ul>
	</nav>
</header>

<Breadcrumbs path={$page.url.pathname} />

<style>
	.active {
		color: #900218;
	}
</style>
