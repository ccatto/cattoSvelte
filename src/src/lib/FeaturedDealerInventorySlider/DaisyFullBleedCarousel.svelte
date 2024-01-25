<!-- ref: https://daisyui.com/components/carousel/#slide3-->
<script>
	export let srpSettings = {};
	import VehicleHit from '$lib/Cards/VehicleHit.svelte';
	export let data;
</script>

<div class="carousel carousel-center p-4 space-x-4  rounded-box flex flex-row flex-nowrap items-end">
	{#each data as hit, i}
		<div class="carousel-item flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4">
			<div>
				<VehicleHit {hit} {srpSettings} />
			</div>
		</div>
	{/each}
</div>
