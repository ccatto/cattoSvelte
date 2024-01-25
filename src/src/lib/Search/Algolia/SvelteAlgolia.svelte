<script>
	import { onMount, createEventDispatcher } from 'svelte';
	let mounted = false;
	import AlgoliaSidebarWithFacets from '$lib/Search/Algolia/AlgoliaSidebarWithFacets.svelte';

	import { onClickOutside } from './actions';
	const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
	const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY;
	import VehicleHit from '$lib/Cards/VehicleHit.svelte';
	const indices = { ['classifieds:inventory:development']: VehicleHit };
	// export let appId, searchKey, indices;
	// export let loadingStr = `Searching...`;
	// export let noResultMsg = (query) => `No results for '${query}'`;
	// export let resultCounter = (hits) =>
	// 	hits.length > 0 ? `<span>Results: ${hits.length}<span>` : ``;
	export let placeholder = 'Search';
	export let ariaLabel = `Search`;
	export let hasFocus = false;
	let allHits = [];
	const dispatch = createEventDispatcher();

	for (let [key, val] of Object.entries({ appId, searchKey, indices })) {
		if (!val) console.error(`Invalid ${key}: ${val}`);
	}

	let client, input, query, promise;

	function processHits(hits) {
		allHits = hits;
		return hits.map((hit) => {
			for (const [key, val] of Object.entries(hit)) {
				//if (key.endsWith(`Orig`)) continue;
				//const processedVal =
				//hit?._snippetResult?.[key]?.value || hit?._highlightResult?.[key]?.value;
				//if (processedVal) {
				//}
			}
			return hit;
		});
	}

	async function search() {
		const { results } = await client.multipleQueries(Object.keys(indices).map((indexName) => ({ indexName, query })));

		return results.map(({ hits, index }) => ({ hits: processHits(hits), index }));
	}

	const src = `https://cdn.jsdelivr.net/npm/algoliasearch@latest/dist/algoliasearch-lite.umd.js`;

	onMount(() => {
		client = window.algoliasearch(appId, searchKey);
		mounted = true;
		search();
	});
</script>

<svelte:head>
	<script async defer {src}></script>
</svelte:head>
<slot />

<!-- <aside use:onClickOutside={() => (hasFocus = false)} class="svelte-algolia">
	<input
		type="text"
		bind:this={input}
		bind:value={query}
		on:keyup={() => (promise = search())}
		on:focus={() => dispatch(`focus`)}
		{placeholder}
		aria-label={ariaLabel}
		class:hasFocus
	/>
	<button
		on:click={() => {
			hasFocus = true;
			input.focus();
		}}
		title={ariaLabel}
	/>
</aside> -->
{#if mounted}{/if}
<div class="grid grid-cols-6">
	<input type="text" bind:this={input} bind:value={query} on:keyup={() => (promise = search())} on:focus={() => dispatch(`focus`)} {placeholder} aria-label={ariaLabel} class:hasFocus />
	<button
		class="h-12 bg-coolGray-500"
		on:click={() => {
			hasFocus = true;
			input.focus();
		}}
		title={ariaLabel}
	/>
</div>

<div class="grid grid-flow-row grid-cols-4 gap-4">
	{#each allHits as vehicleHit}
		<div><VehicleHit hit={vehicleHit} /></div>
	{/each}
</div>
