<script>
	import { sidebarVisible } from '../../search-store';
	import AlgoliaSearchBar from '$lib/Search/Algolia/AlgoliaSearchBar.svelte';
	import SearchLocationContainer from '$lib/Cards/SearchLocationContainer.svelte';
	import FacetedSearchChips from '$lib/Cards/FacetedSearchChips.svelte';
	import { page } from '$app/stores';
	const srpSettings = $page.data.stuff.siteConfig?.srpConfig ?? {};
</script>

<div
	class=" md:flex md:flex-nowrap flex-row w-full justify-between bg-coolGray-50 md:h-24 items-center md:pr-4"
>
	<div class="col-span-12 md:col-span-3 order-1 md:order-0 md:flex-none md:w-8 md:pl-4">
		<button
			class="w-full btn btn-square md:w-20 rounded-none bg-red md:bg-coolGray-50 hover:bg-coolGray-100 text-white hover:text-black md:text-black font-medium capitalize border-0 text-lg md:text-md"
			type="button"
			on:click={() => ($sidebarVisible = !$sidebarVisible)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8 pr-1"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
				/>
			</svg>
			<span class="tracking-wider">{srpSettings.filter_label || 'filter'}</span>
		</button>
	</div>
	<div class="col-span-12 md:flex-none w-full md:w-1/2 order-0 md:order-1">
		<AlgoliaSearchBar />
	</div>
	<div class="col-span-12 md:grow text-center md:text-right order-3">
		<SearchLocationContainer />
	</div>
</div>

<div class="flex-wrap md:flex-nowrap overflow-y-scroll pb-0 pl-5 my-5">
	<FacetedSearchChips />
</div>
