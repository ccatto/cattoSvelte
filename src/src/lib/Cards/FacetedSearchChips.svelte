<script>
	import { fade, fly } from 'svelte/transition';
	import { currentFacetRefinements } from '../../search-store.js';
	import { page } from '$app/stores';
	const srpSettings = $page.data.stuff.siteConfig?.srpConfig ?? {};
	function removeFacetSelection({ facet, value }) {
		delete $currentFacetRefinements[facet];
		window.AutoSearch.searchHelper.removeFacetRefinement(facet, value);
		window.AutoSearch.searchHelper.search();
		$currentFacetRefinements = { ...$currentFacetRefinements };
	}
	function clearRefinements() {
		if($page.params.vehicles == "used" || $page.params.vehicles == "usado") {
			document.getElementById('algoliaSearchText').value = '';

			if($page.params.vehicles == "usado") {
				AutoSearch.searchHelper.setQuery('usado');
			} else {
				AutoSearch.searchHelper.setQuery('used');
			}
			
			AutoSearch.searchHelper.clearRefinements();
			AutoSearch.searchHelper.search();
		} else if($page.params.vehicles == "new" || $page.params.vehicles == "nuevo") {
			document.getElementById('algoliaSearchText').value = '';
			
			if($page.params.vehicles == "nuevo") {
				AutoSearch.searchHelper.setQuery('nuevo');
			} else {
				AutoSearch.searchHelper.setQuery('new');
			}
			
			AutoSearch.searchHelper.clearRefinements();
			AutoSearch.searchHelper.search();
		} else {
			document.getElementById('algoliaSearchText').value = '';
			AutoSearch.searchHelper.setQuery('');
			AutoSearch.searchHelper.clearRefinements();
			AutoSearch.searchHelper.search();
		}
	}
	$: isRefined = Object.entries($currentFacetRefinements).length > 0;
</script>

{#each Object.entries($currentFacetRefinements) as [facet, value]}
	{#if value.length}
		<button
			in:fly={{ x: 100, duration: 100 }}
			out:fade
			class="min-h-0 h-8 gap-2 mb-1 ml-1 rounded-2xl btn btn-outline border-1 border-coolGray-300 text-black  hover:bg-red-light hover:text-white bg-white capitalize"
			on:click={removeFacetSelection({ facet, value })}
		>
			<span class="font-light">{facet && facet.split('.')[0]}</span>: {value}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	{/if}
{/each}

<button class="btn underline bg-transparent text-black border-0 hover:bg-red hover:text-white font-bold rounded-full" on:click={clearRefinements}
	>{srpSettings.clear_all_label || 'clear all'}</button
>
