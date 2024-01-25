<script>
	import { page } from '$app/stores';
	const srpSettings = $page.stuff?.siteConfig?.srpConfig ?? {};
	import AlgoliaSidebarWithFacets from '$lib/Search/Algolia/AlgoliaSidebarWithFacets.svelte';
	import FacetedSearchChips from '$lib/Cards/FacetedSearchChips.svelte';
	import SrpPagination from '$lib/Cards/SrpPagination.svelte';
	import RippleLoader from '$lib/Loaders/RippleLoader.svelte';
	import { scale } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import {
		currentFacetRefinements,
		menuOpen,
		showHeader,
		selectedFacets,
		allSearchFacets,
		searchFacetsStatic,
		searchLocation,
		hitCount,
		totalPages,
		sidebarVisible
	} from '../../../search-store';
	export let pageTitle = 'Shop all Inventory';
	import { onMount } from 'svelte';

	import SrpHeaderSearch from '$lib/Search/SrpHeaderSearch.svelte';
	import SrpVehicleHits from '$lib/Sections/SrpVehicleHits.svelte';

	export let data;
	let { siteConfig, inventory, indexSettings } = data;

	let searchHelper = undefined;
	let searchClient = undefined;
	let innerWidth;

	let resultsLoading = true;
	let noResultsFoundForSearch = false;
	const sidebarHiddenClasses = 'hidden';
	const sidebarVisibleClasses =
		'fixed top-0 w-full md:relative md:col-span-2 lg:col-span-2 md:pl-4 h-screen md:h-full overflow-y-auto pb-20 mb-20 pt-0 md:pt-8';
	const sidebarVisibleContainerClasses = 'col-span-12 md:col-span-10 lg:col-span-10';
	const sidebarHiddenContainerClasses = 'col-span-12 md:col-span-12';

	$: {
		if (noResultsFoundForSearch === true) {
			window.AutoSearch.searchHelper.clearRefinements();
			window.AutoSearch.searchHelper.setQueryParameter('aroundLatLngViaIP', true);
			window.AutoSearch.searchHelper.setQueryParameter('aroundRadius', 'all');
			window.AutoSearch.searchHelper.search();
		}
	}
	$: $page,
		(() => {
			if (searchHelper && window) {
				if ($page.route.id !== '' && $page.route.id.includes('inventario')) {
					searchHelper.setQuery(parseRouteParams());
					searchHelper.search();
				}
			}
		})();
	$: {
		if ($selectedFacets.length && searchHelper && window) {
			updateFacets();
		}
	}

	function handleFacetClick(event) {
		noResultsFoundForSearch = false;
		const { detail } = event;
		if (!detail.attribute || !detail.value) return;
		searchHelper.toggleFacetRefinement(detail.attribute, detail.value).search();
	}
	function renderFacets(results) {
		const facets = results.facets.map(function (facet) {
			console.log(facet, '>>>> search helper');
			return {
				name: facet.name,
				label: facet.name.split('.')[0],
				facetValues: results.getFacetValues(facet.name),
				isRefinement: true,
				isDisjunctive: false
			};
		});

		$allSearchFacets = facets;
	}
	function parseRouteParams() {
		const searchParams = $page.params.vehicles ? $page.params.vehicles.split('/') : [];
		const searchParamsNonEmpty = searchParams.filter((param) => param !== '');
		const searchQuery = searchParamsNonEmpty.length > 0 ? searchParamsNonEmpty.join(' ') : '';

		return searchQuery;
	}
	async function initAlgoliaSearch() {
		const algoliaSearchIndex = siteConfig?.algolia_search_index;
		if (!algoliaSearchIndex) {
			throw new Error('No Algolia Index Found');
		}
		window.AutoSearch = {};
		const algoliasearch = await import('algoliasearch').then((m) => m.default);
		searchClient = algoliasearch(
			import.meta.env.VITE_ALGOLIA_APP_ID,
			import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
		);

		const { AlgoliaSearchHelper } = await import('algoliasearch-helper');
		let searchSettings = {
			hitsPerPage: 21,
			facets: $searchFacetsStatic,
			aroundLatLngViaIP: true,
			getRankingInfo: true
		};

		if ($searchLocation.latitude) {
			searchSettings.aroundLatLngViaIP = false;
			searchSettings.aroundLatLng = `${$searchLocation.latitude},${$searchLocation.longitude}`;
			searchSettings.aroundRadius = 100000000000;
		}

		searchHelper = new AlgoliaSearchHelper(searchClient, algoliaSearchIndex, {
			...searchSettings
		});

		window.AutoSearch.searchHelper = searchHelper;
		searchHelper.on('change', function (event) {
			resultsLoading = true;
		});
		searchHelper.on('error', function (event) {
			resultsLoading = false;
		});

		searchHelper.on('result', function (event) {
			$hitCount = event.results.nbHits;
			$totalPages = event.results.nbPages;

			inventory = event.results.hits;
			if (inventory.length) {
				renderFacets(event.results);
				$currentFacetRefinements = event.state.facetsRefinements;
			} else {
				noResultsFoundForSearch = true;
			}

			$hitCount = event.results.nbHits;
			resultsLoading = false;
		});
	}

	onMount(async () => {
		if (innerWidth < 1024) {
			$sidebarVisible = false;
		} else {
			$sidebarVisible = true;
		}
		$hitCount = indexSettings.nbHits;
		$totalPages = indexSettings.totalPages;
		await initAlgoliaSearch();

		if (Object.entries($allSearchFacets).length === 0) {
			searchHelper.setQuery(parseRouteParams());
			searchHelper.search();
		}
		resultsLoading = false;
	});
</script>

<svelte:window bind:innerWidth />
<svelte:head>
	<title>{pageTitle} | {siteConfig.domain}</title>
</svelte:head>

{#if resultsLoading}
	<RippleLoader />
{/if}
<div class="mx-auto h-full">
	<div class="grid grid-cols-12">
		<div
			class="{$sidebarVisible === true
				? sidebarVisibleClasses
				: sidebarHiddenClasses} border-r border-coolGray-300 border-opacity-70 bg-white z-20"
		>
			{#if $sidebarVisible && innerWidth < 1024}
				<div class="col-span-12 min-h-16 bg-coolGray-200 pt-3">
					<span class="font-bold text-xl pl-4 italic pt-3">Current Search</span>
					<div class="flex-nowrap md:flex-nowrap overflow-y-scroll pb-0 pl-5 my-5">
						<FacetedSearchChips />
					</div>
					<button
						class="h-12 left-0 w-full btn btn-square md:w-20 rounded-none bg-blue md:bg-coolGray-50 hover:bg-coolGray-100 text-white hover:text-black md:text-black font-medium capitalize border-0 text-lg md:text-md"
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
						<span class="tracking-wider"
							>View <span class="font-black">{$hitCount}</span> Results</span
						>
					</button>
				</div>
			{/if}
			<div class="px-0 relative">
				<div
					in:scale={{ duration: 100, start: 0.95, easing: cubicOut }}
					out:scale={{ duration: 75, start: 0.95, easing: cubicIn }}
				>
					<AlgoliaSidebarWithFacets
						searchFacets={$allSearchFacets}
						{indexSettings}
						on:updateSelectedFacet={handleFacetClick}
					/>
				</div>
			</div>
			{#if $sidebarVisible && innerWidth < 1024}
				<button
					class="fixed bottom-0 h-12 left-0 w-full btn btn-square md:w-20 rounded-none bg-blue md:bg-coolGray-50 hover:bg-coolGray-100 text-white hover:text-black md:text-black font-medium capitalize border-0 text-lg md:text-md"
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
					<span class="tracking-wider"
						>View <span class="font-black">{$hitCount}</span> Results</span
					>
				</button>
			{/if}
		</div>

		<div
			class="pb-0 bg-coolGray-100 pt-0 {$sidebarVisible === true
				? sidebarVisibleContainerClasses
				: sidebarHiddenContainerClasses}"
		>
			<SrpHeaderSearch />

			{#if noResultsFoundForSearch}
				<div class="text-left mb-8 pl-8">
					<h1 class="text-3xl font-bold">
						{srpSettings.label_no_results_found_near}
						{$searchLocation.locality || $searchLocation.administrative_area || ''}
						{$searchLocation.region}
					</h1>
					<p class="text-lg">
						{srpSettings.label_no_results_recommended_results_text ||
							'Heres some recommended results...'}
					</p>
				</div>
			{/if}
			<div class="w-full bg-coolGray-100 pl-5 pb-8">
				<h1><span class="text-3xl font-black capitalize"> {pageTitle}</span></h1>
			</div>
			{#if inventory.length}
				<SrpVehicleHits {inventory} />
			{/if}
			<div class="col-span-12 border-t border-coolGray-200">
				<SrpPagination />
			</div>
		</div>
	</div>
</div>
