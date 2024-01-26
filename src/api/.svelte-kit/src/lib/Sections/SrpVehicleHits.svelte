<script>
	export let inventory = [];
	import VehicleHit from '$lib/Cards/VehicleHit.svelte';
	import { page } from '$app/stores';

	const srpSettings = $page.data.stuff?.siteConfig?.srpConfig ?? {};
</script>

<div class="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4  pb-10 gap-2 md:gap-6 px-2 md:px-8">
	{#each inventory as hit (hit.vin)}
		<VehicleHit {hit} {srpSettings} />
	{/each}
</div>
