<script>
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { mobileMenuOpen } from '../search-store';
	import HeroWithSearchFacets from '$lib/HeroWithSearchFacets.svelte';
	import ShopByVehicleType from '$lib/ShopByVehicleType.svelte';
	import FeaturedDealerCarousel from '$lib/FeaturedDealerCarousel.svelte';
	import ShopByMakeModel from '$lib/ShopByMakeModel.svelte';

	const pageComponents = {
		HeroWithSearchFacets,
		ShopByVehicleType,
		FeaturedDealerCarousel,
		ShopByMakeModel
	};

	export let data;

	const { components, metaData } = data.body;

	// export let inventoryLinks;

	// export let inventoryLinksByGroup;

	onMount(() => {
		$mobileMenuOpen = false;
	});
</script>

<svelte:head>
	<title>{metaData.metaTitle}</title>
</svelte:head>
{#each components as component}
	{#if component.enabled === true}
		<section class="w-full" style="background-color: {component?.section_background_color}">
			<div class="grid w-full mx-auto" in:scale out:fade>
				<svelte:component this={pageComponents[component.name]} componentProps={component} />
			</div>
		</section>
	{/if}
{/each}
