<script>
	import { createEventDispatcher } from 'svelte';
	import { selectedFacets } from '../../../search-store.js';
	const dispatch = createEventDispatcher();
	export let attribute;
	export let label;
	export let values = null;
	import ThreeDotHorizontalLoader from '$lib/Loaders/ThreeDotHorizontalLoader.svelte';
	import AlgoliaFacetHeader from '$lib/Search/Algolia/AlgoliaFacetHeader.svelte';

	export let selectedValue = '';

	function updateSelectedFacet(event) {
		$selectedFacets = [...$selectedFacets, { ...event }];
	}
</script>

<AlgoliaFacetHeader {label} />
{#if values && typeof values === 'object'}
	<div class="form-control max-h-64 overflow-y-scroll flex">
		{#each Object.entries(values) as [key, value]}
			<label class="label cursor-pointer justify-start">
				<input
					type="checkbox"
					on:click={(event) => {
						updateSelectedFacet({ value: key, attribute, isChecked: event.target.checked });
					}}
					class="checkbox checkbox-primary"
				/>
				<span class="label-text text-black pl-3 font-medium text-lg capitalize">{key}</span>
			</label>
		{/each}
	</div>
{:else}
	<div class="justify-start pl-4 flex w-full min-h-16 pt-4">
		<ThreeDotHorizontalLoader />
	</div>
{/if}

<style>
	/* your styles go here */
</style>
