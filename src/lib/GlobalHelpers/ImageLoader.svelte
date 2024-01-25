<script>
	export let src;
	export let alt;
	export let classList = 'h-full w-full object-contain srpVehicleHit';
	import { onMount } from 'svelte';
	let nativeLoading = false;
	import IntersectionObserver from '$lib/GlobalHelpers/IntersectionObserver.svelte';
	import Image from '$lib/GlobalHelpers/Image.svelte';
	import PulseCard from '$lib/Loaders/PulseCard.svelte';
	let hidePulse = false;
	// Determine whether to bypass our intersecting check
	onMount(() => {
		if ('loading' in HTMLImageElement.prototype) {
			nativeLoading = true;
		}
	});
</script>

<IntersectionObserver once={true} let:intersecting>
	{#if intersecting || nativeLoading}
		{#if hidePulse === false}
			<div class="flex w-full h-full srpVehicleHit"><PulseCard /></div>
		{/if}
		<Image {alt} {src} {classList} on:imageloaded={() => (hidePulse = true)} />
	{:else}
		<div class="flex w-full h-full srpVehicleHit">
			<PulseCard />
		</div>
	{/if}
</IntersectionObserver>
