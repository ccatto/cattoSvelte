<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	import SearchLocationContainer from '$lib/Cards/SearchLocationContainer.svelte';
	export let searchFacets = [];
	import { menuOpen } from '../../../search-store';
	import ThreeDotHorizontalLoader from '$lib/Loaders/ThreeDotHorizontalLoader.svelte';
	let innerWidth;

	function updateSelectedFacet(event) {
		dispatch('updateSelectedFacet', {
			...event
		});
	}
</script>

<div class="mt-5 flex-1 flex flex-col">
	{#if searchFacets.length}
		<nav class="flex-1" id="facet-list">
			{#each searchFacets as facet, i}
				<div class="collapse collapse-plus">
					<input type="checkbox" class="peer" checked={i === 0} />
					<div class="collapse-title text-xl font-medium">
						<span class="capitalize">{facet.label}</span>
					</div>

					<div class="collapse-content">
						<div class="form-control max-h-64 overflow-y-scroll">
							{#each facet.facetValues as data, index}
								<label class="label cursor-pointer justify-start">
									<input
										data-attribute={facet.name}
										data-value={data.name}
										type="checkbox"
										checked={data.isRefined}
										on:click={(event) => {
											updateSelectedFacet({ value: data.name, attribute: facet.name, isChecked: event.target.checked });
										}}
										class="checkbox  border border-coolGray-300"
									/>
									<span class="label-text text-black pl-3 font-medium text-md capitalize">{data.name} <span>({data.count})</span></span>
								</label>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</nav>
	{:else}
		<ThreeDotHorizontalLoader />
	{/if}
</div>
