<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let mounted = false;
	let srpSettings = {};
	srpSettings = $page.data.stuff.siteConfig?.srpConfig ?? {};
	export let componentProps = {};
	import DaisyFullBleedCarousel from '$lib/FeaturedDealerInventorySlider/DaisyFullBleedCarousel.svelte';
	onMount(() => {
		mounted = true;
	});
</script>

<div class="container mx-auto py-8 max-w-8xl overflow-hidden">
	<div class="relative">
		<div class="absolute inset-0 flex items-center" aria-hidden="true">
			<div class="w-full border-t border-gray-300" />
		</div>
		<div class="relative flex justify-center">
			<h2 class="title text-center font-bold py-10 bg-white px-2">
				<span class="text-red-900 text-1xl">{componentProps.sub_headline_text}</span><br /><span class="text-green text-3xl"
					>{componentProps.headline_text || componentProps.dealer.details.dealer_name}</span
				>
			</h2>
		</div>
		{#if mounted}
			<div class="w-full" transition:fly={{ y: 200, duration: 1000 }}>
				<DaisyFullBleedCarousel data={componentProps.dealer.inventory.hits} {srpSettings} />
			</div>
		{/if}
	</div>
</div>
