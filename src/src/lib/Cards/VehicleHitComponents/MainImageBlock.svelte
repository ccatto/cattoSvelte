<script>
	export let hit;
	import ImageLoader from '$lib/GlobalHelpers/ImageLoader.svelte';
	import { updateGtagDataLayer } from '../../../utils/srpHelpers';
	// const srpLink = `${import.meta.env.VITE_DOMAIN_HOST=="buscadordeauto.com" ? hit.spanishSrpLink : hit.srpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`;
	// console.log(hit,">>>>>>>>>> check hittt")

	// Spanish url handler
	let srpLink = ``;
	if (import.meta.env.VITE_DOMAIN_HOST == 'buscadordeauto.com') {
		// do this
		if (!hit.spanishSrpLink) {
			srpLink = `${hit.srpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`;
		} else {
			srpLink = `${hit.spanishSrpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`;
		}
	} else {
		//do this instead
		srpLink = `${hit.srpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`;
	}
</script>

<a
	href={srpLink}
	target="_blank"
	data-dealer={hit.dealer_name}
	data-stocknumber={hit.stockNumber}
	data-vin={hit.vin}
	on:click|preventDefault={() => {
		updateGtagDataLayer(hit, srpLink);
		window.open(srpLink, '_blank');
	}}
	class=" text-md md:text-lg justiy-end srpVehicleHit w-full relative inline-flex items-center justify-center cursor-pointer active:border-purple-600 font-bold active:shadow-none bg-white hover:border-red-900 text-red hover:text-white tracking-wide transition-all ease-out duration-300"
>
	<ImageLoader
		src={hit.leadImage}
		alt={``}
		classList="h-full w-full object-scale-up mx-auto srpVehicleHit"
	/>
</a>
