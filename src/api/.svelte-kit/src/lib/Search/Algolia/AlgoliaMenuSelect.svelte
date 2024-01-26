<script>
	export let attribute;
	export let label;
	import AlgoliaFacetHeader from '$lib/Search/Algolia/AlgoliaFacetHeader.svelte';
</script>

<AlgoliaFacetHeader {label} />
<div id="{attribute}-select" />

<style>
	/* your styles go here */
</style>
