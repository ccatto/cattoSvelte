<script>
	import { Cloudinary } from '@cloudinary/base';
	import { onMount } from 'svelte';
	let cld = new Cloudinary({
		cloud: {
			cloudName: 'higherintel'
		},
		url: {
			secure: true // force https, set to false to force http
		}
	});
	export let make;
	export let model;
	export let year;
	export let trim;
	let loaded = false;
	let image = cld.image(`buscadordeauto/vehicle_images/${year}/${make}/${model}/${trim}`).toURL();

	async function searchForImage(year, make, model) {
		const sessionStorageImage = window.sessionStorage.getItem(`${year}_${make}_${model}_image`);
		if (sessionStorageImage) {
			image = sessionStorageImage;
			loaded = true;
			return;
		}
		const results = await fetch(`http://localhost:3030/storage/imagesearch?year=${year}&make=${make}&model=${model}`);
		const message = await results.json();

		if (message.length) {
			window.sessionStorage.setItem(`${year}_${make}_${model}_image`, message[0].url);
			image = message[0].url;
			loaded = true;
			return;
		} else {
			image = 'https://res.cloudinary.com/higherintel/image/upload/c_scale,q_54,w_407/v1624488699/busadordeauto/vehicle_images/coming_soon.jpg';
			loaded = true;
		}
	}
	async function getImage() {
		return fetch(image)
			.then((res) => {
				return res.status;
			})
			.catch((err) => {});
	}

	onMount(async () => {
		const imageTest = await getImage();
		if (imageTest === 404) {
			await searchForImage(year, make, model);
		} else {
		}
	});
</script>

<div class="flex h-full">
	{#if loaded}
		<img alt={year} data-src={image} src={image} class="h-full w-full object-scale-down mx-auto" />
	{:else}
		<h2>Loading...</h2>
	{/if}
</div>

<!-- markup (zero or more items) goes here -->
<style>
	/* your styles go here */
</style>
