<script>
	import { onMount } from 'svelte';
	import CardLinksByAttribute from '$lib/Cards/CardLinksByAttribute.svelte';
	export let inventoryLinksByGroup;
	let loaded = false;
	let gridStyle = 'mt-12 max-w-lg mx-auto grid  lg:grid-cols-3 lg:max-w-none lg:space-x-4 gap-4 lg:space-y-0 sm:space-y-20';
	onMount(() => {
		if (inventoryLinksByGroup.new && inventoryLinksByGroup.used && inventoryLinksByGroup.certified) {
		} else {
			gridStyle = 'mt-12 max-w-4xl mx-auto grid  md:grid-cols-2 lg:max-w-none lg:space-x-4 gap-4 lg:space-y-0 sm:space-y-0';
		}
		loaded = true;
	});
</script>

<div class="inset-0">
	<div class="bg-white h-1/3 sm:h-2/3" />
</div>
<div class="relative max-w-7xl mx-auto pt-4">
	<div class="text-center">
		<h2 class="text-3xl tracking-tight font-extrabold text-green sm:text-4xl">Shop by make and model</h2>
		<h3 class="mt-3 max-w-2xl mx-auto text-xl text-black sm:mt-4">Get the best local deals on vehicles in your area</h3>
	</div>
	<div class={gridStyle}>
		<CardLinksByAttribute attributeName="Shop New Vehicles" attributeList={inventoryLinksByGroup.new} />
		<CardLinksByAttribute attributeName="Shop Used Vehicles" attributeList={inventoryLinksByGroup.used} />
		{#if inventoryLinksByGroup.certified}
			<CardLinksByAttribute attributeName="Shop Certified Vehicles" attributeList={inventoryLinksByGroup.certified} />
		{/if}
	</div>
</div>
