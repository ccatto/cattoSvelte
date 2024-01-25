<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let src;
	export let alt;
	export let classList;
	import { onMount } from 'svelte';
	let loaded = false;
	let thisImage;

	function imageIsLoaded() {
		dispatch('imageloaded');
	}
	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
			imageIsLoaded();
		};
		thisImage.onerror = (err) => {
			src = 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto/v1655757621/branding_marketing/Coming-Soon-1_e9lezx.jpg';
			imageIsLoaded();
		};
	});
</script>

<img {src} {alt} class:loaded bind:this={thisImage} loading="lazy" class={classList} />

<style>
	img {
		opacity: 0;
		transition: opacity 1200ms ease-out;
	}
	img.loaded {
		opacity: 1;
	}
</style>
