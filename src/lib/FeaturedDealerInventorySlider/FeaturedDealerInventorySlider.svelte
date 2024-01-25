<script context="module">
	export const prerender = false;
</script>

<script>
	import { request } from './../../api/fetch-client';
	import { onMount } from 'svelte';
	let client;
	let helper;
	let hasFeaturedDealerInventory = false;

	import DaisyFullBleedCarousel from '$lib/FeaturedDealerInventorySlider/DaisyFullBleedCarousel.svelte';
	let progressValue = 0;
	export let featuredDealer = {};
	export let data;
</script>

<div class="container mx-auto py-8 max-w-8xl">
	{#await data}
		<div class="relative">
			<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300" />
			</div>
			<div class="relative flex justify-center min-h-64">
				<span class="font-black text-red-900 text-3xl uppercase"> ...<progress class="progress w-56 progress-info" value={progressValue} max="100" /> </span>
			</div>
		</div>
	{:then data}
		<div class="relative">
			<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300" />
			</div>
			<div class="relative flex justify-center">
				<h2 class="title text-center font-bold py-10 bg-white px-2">
					<span class="text-red-900 text-1xl">This months featured dealer</span><br /><span class="text-green text-3xl">{featuredDealer.name}</span>
				</h2>
			</div>
		</div>

		<DaisyFullBleedCarousel {data} />
	{:catch error}
		{JSON.stringify(error)}
	{/await}
</div>
