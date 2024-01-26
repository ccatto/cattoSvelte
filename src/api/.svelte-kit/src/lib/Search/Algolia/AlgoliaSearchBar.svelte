<script>
	import { searchQuery, lastSearchQuery } from '../../../search-store.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const searchInputPlaceholder = $page.data.stuff.siteConfig?.srpConfig?.search_input_placeholder_text || 'Search by make, model, year, or keyword';

	function getInput() {
		$searchQuery = document.getElementById('algoliaSearchText').value;
		if ($searchQuery && $searchQuery !== $lastSearchQuery) {
			window.AutoSearch.searchHelper.clearRefinements().setQuery($searchQuery).search();
			$lastSearchQuery = $searchQuery;
		}
	}
	onMount(() => {
		document.getElementById('algoliaSearchText').value = '';
		return () => {
			$searchQuery = '';
		};
	});
	// your script goes here
</script>

<div id="searchbox">
	<form on:submit|preventDefault={getInput}>
		<div class="form-control drop-shadow-md w-full md:px-5">
			<div class="input-group input-group-lg px-0 py-0 w-full rounded-none">
				<input
					name="algoliaSearchText"
					id="algoliaSearchText"
					type="text"
					placeholder={searchInputPlaceholder}
					class="placeholder:italic rounded-none placeholder:text-slate-600 block bg-white w-full border border-coolGray-300 md:rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
				/>
				<button class="btn md:btn-square rounded-none" type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg
					>
				</button>
			</div>
		</div>
	</form>
</div>

<style>
	@media (max-width: 1024px) {
		.input-group :first-child,
		.input-group :last-child {
			border-radius: 0;
		}
	}
</style>
