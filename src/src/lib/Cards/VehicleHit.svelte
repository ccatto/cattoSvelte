<script>
	import MainImageBlock from '$lib/Cards/VehicleHitComponents/MainImageBlock.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { helpers } from './../../utils/helpers.js';

	export let hit;
	export let srpSettings = {};

	// const srpLink = `${import.meta.env.VITE_DOMAIN_HOST=="buscadordeauto.com" ? hit.spanishSrpLink != null ? hit.spanishSrpLink : hit.srpLink : hit.srpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`;
	
	// Spanish url handler to handle
	let srpLink = ``;
	if(import.meta.env.VITE_DOMAIN_HOST=="buscadordeauto.com") {
		// do this
		if(!hit.spanishSrpLink) {
			srpLink = `${hit.srpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`
		} else {
			srpLink = `${hit.spanishSrpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`
		}
	} else {
		//do this instead
		srpLink = `${hit.srpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`
	}
	
	$: transmission = hit?.transmission ? hit.transmission.split('w/')[0] : '';
	let mounted = false;
	const sendUserToVehicle = () => {
		const { vin, year, make, model, trim, prices, stockNumber, dealer } = hit;
		gtag('event', 'srp_click_data', {
			event_category: 'srp_click_data',
			event_label: `${stockNumber}|${year}|${make}|${model}|${trim}|${dealer}`,
			value: prices.selling_price
		});

		dataLayer.push({ event: 'srp_click_data', make, model, trim, year, vin, prices: prices?.selling_price, stockNumber, dealer: dealer });
		const targetURL = `${hit.srpLink}&referrer=${import.meta.env.VITE_DOMAIN_HOST}&stock_number=${hit.stockNumber}`;
		window.open(targetURL, '_blank');
	};

	onMount(() => {
		mounted = true;
	});

	// Function to handle the click event
	function handleClick(event) {
		event.preventDefault(); // Prevent the default link behavior

		const vin = event.currentTarget.getAttribute('data-vin');
		const currentUrl = window.location.href;

		// Create a URL object for parsing
		const url = new URL(currentUrl);
		let existingQueryString = url.search;

		// Remove the leading "?" character if it exists
		existingQueryString = existingQueryString.startsWith('?') ? existingQueryString.substring(1) : existingQueryString;

		const searchParams = new URLSearchParams(existingQueryString);

		// Remove the existing vin parameter, if it exists
		searchParams.delete('vin');

		// Add the new vin parameter with the value
		searchParams.set('vin', vin);

		// Update the query string in the URL object
		url.search = searchParams.toString();

		// Get the new URL with the updated query string
		const newUrl = url.href;

		console.log(newUrl,">> new url")

		// Update the URL without redirecting the page
		window.history.pushState({ path: newUrl }, '', newUrl);

		// Add your wisepops event or any other actions here
		wisepops('event', 'user-click');
		// wisepops('event', 'test-event');
  }
	
</script>


<div class="card w-full pt-0 shadow-md border-0 srpVehicleHit grid content-end bg-white rounded-md">
	
	
	<div class="grid grid-cols-6 w-full">
		<div class="col-span-3 sm:col-span-12 md:col-span-6">
			<figure class="h-124 overflow-hidden">
				{#if mounted}
					<div transition:fade>
						<MainImageBlock {hit} />
					</div>
				{:else}
					<div class="h-124 overflow-hidden">
						<img src="https://www.vite.com/wcsstore/ViteCatalogAssetStore/images/placeholder/placeholder-vehicle-hit.png" alt="Vehicle Hit" class="object-cover object-center" />
					</div>
				{/if}
			</figure>
		</div>

		<div class="col-span-3 sm:col-span-6 px-4">
			<!------------------------------ MAIN INFO BLOCK --------------------------------------------------------------------------------->

			<div class="grid grid-cols-2 justify-items-baseline content-center items-center pt-4">
				<h2 class="text-ellipsis md:overflow-hidden h-auto text-md self-start col-span-2 md:col-span-1 items-center">
					<span class="flex uppercase text-xs md:text-md text-coolGray-600">
						{hit.year || hit.ano}
						{hit.condition}
					</span>
					<span class="flex text-sm md:text-lg font-bold">
						{hit.make || hit.marcas}
						{hit.model || hit.modelo}
						{hit.trim || hit.estilo}
					</span>
				</h2>

				<div class="text-xs text-gray-900 font-black justify-self-start md:justify-self-end pl-2 col-span-2 md:col-span-1">
					{#if hit.price && hit.price !== 0}
						<span class="text-lg md:text-2xl">
							{helpers.formatAsCurrency(hit.price)}
						</span>
					{:else if hit.msrp && hit.msrp !== 0}
						<span class="text-sm"> {helpers.formatAsCurrency(hit.msrp)} (MSRP)</span>
					{/if}
				</div>
			</div>

			<div class="divider w-full my-0" />
			<!------------------------ SPECS  BLOCK ----------------------------------------------------------------------------------------->
			<div class="hidden sm:grid-flow-row sm:grid grid-cols-2 justify-items-end">
				<div class="col-span-1 justify-self-start">
					<div class="flex flex-no-wrap items-center">
						<div class="w-12">
							<svg class="h-8 w-8 text-gray-600 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path fill="currentColor" d="M8 5H4V2H8V5M4 22H8V19H4V22M14 2H10V5H14V2M10 22H14V19H10V22M16 2V5H20V2H16M17 11H13V7H11V11H7V7H5V17H7V13H11V17H13V13H19V7H17V11Z" />
							</svg>
						</div>
						<div class="item flex-grow-1">
							<div class="flex flex-wrap items-stretch">
								<div class="item w-full flex-shrink"><span class="font-bold text-sm">{srpSettings.label_transmission || 'transmission'}</span></div>
								<div class="relative w-20 lg:w-full">
									<p class="text-green font-bold text-md flex-wrap lg:truncate md:break-words">
										{#if hit.transmission}
											{hit.transmission.split('w/')[0]}
										{:else if hit.transmisión}
											{hit.transmisión.split('w/')[0]}
										{/if}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-1 justify-self-end">
					<div class="flex-1 inline-flex items-center justify-end">
						<svg class="h-8 w-8 text-gray-600 fill-current mr-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z"
							/>
						</svg>
						<div class="grid grid-cols-1 gap-0">
							<div class="text-right">
								<p class="text-gray-900 font-bold text-xs">
									{srpSettings.label_city || 'city'}:
									<span class="text-green text-lg">{hit.cityMpg || 'NA'} <span class="text-xs text-gray-900">MPG</span></span>
								</p>
							</div>
							<div>
								<p class="text-gray-900 font-bold text-xs">
									{srpSettings.label_highway || 'HWY'}:
									<span class="text-green text-lg">{hit.highwayMpg || 'NA'} <span class="text-xs text-gray-900">MPG</span></span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="hidden md:grid grid-cols-2 justify-items-space-between">
				<div class="col-span-1">
					<div class="flex flex-no-wrap items-center">
						<div class="w-8">
							<svg class="h-8 w-8 text-gray-600 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
								/>
							</svg>
						</div>

						<span class="text-green font-bold text-md pr-1">
							{hit.miles ? parseInt(hit.miles).toLocaleString('en-US') : 'NA'}
						</span> <span class="font-bold text-sm tracking-wide"> {srpSettings.label_miles || 'miles'}</span>
					</div>
				</div>

				<div class="col-span-1 justify-self-end">
					<div class="flex-1 inline-flex items-center justify-end">
						<svg class="h-8 w-8 text-gray-600 fill-current mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
							/>
						</svg>
						<span class="text-green font-bold text-lg pl-0 pr-1">{hit.passengerCapacity || 'NA'}</span>
						<span class="font-bold text-sm"> {srpSettings.label_passengers || 'passengers'}</span>
					</div>
				</div>
			</div>

			<!------------------------ VENDOR DETAILS BLOCK  --------------------------------------------------------------------------------->

			<!-- <button class="hidden sm:flex w-full" type="button" on:click={sendUserToVehicle}>
				<div class="grid grid-cols-1 bg-coolGray-100 px-2  content-between w-full rounded-md">
					<div class="flex flex-wrap md:flex-nowrap   text-coolGray-700 px-1 text-md justify-between py-3 items-baseline rounded-lg">
						<div class="item flex-grow-1 md:flex-shrink"><span>@ </span><span class="font-bold text-sm">{hit.dealer}</span></div>
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline-flex" viewBox="0 0 24 24" fill="gray">
								<path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
							</svg>
							<span class="text-coolGray-700 font-black text-sm">
								{hit._rankingInfo && hit._rankingInfo.geoDistance ? Math.floor(hit._rankingInfo.geoDistance / 1609).toLocaleString('en-US') : 0}
								{srpSettings.label_geo_distance_away || 'miles away'}</span
							>
						</div>
					</div>
				</div>
			</button> -->
			<!------------------------ START SRP ACTIONS  BLOCK  --------------------------------------------------------------------------------->
			<div class="mt-3 w-full pb-4">
				{#if hit.dealer == "Other"}
					<a
						href={srpLink}
						data-source="DetroitTrading"
						target="_blank"
						data-dealer={hit.dealer}
						data-stocknumber={hit.stockNumber}
						data-outbound_url={srpLink}
						data-vin={hit.vin}
						data-make={hit.make || hit.marcas}
						data-model={hit.model || hit.modelo}
						data-year={hit.year || hit.ano}
						on:click={handleClick}
						class="rounded-full text-md md:text-lg srpVehicleHit w-full relative inline-flex group items-center justify-center px-3.5 py-1 md:py-2 cursor-pointer border-2 active:border-purple-600
				font-bold active:shadow-none bg-white hover:border-red-900 text-red hover:text-white tracking-wide hover:bg-red-900 hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out
				duration-300"
					>
						{srpSettings.label_button || 'View Details'}

						<svg
							data-dealer={hit.dealer}
							data-stocknumber={hit.stockNumber}
							data-url={srpLink}
							data-outbound_url={srpLink}
							data-make={hit.make || hit.marcas}
							data-model={hit.model || hit.modelo}
							data-year={hit.year || hit.ano}
							data-vin={hit.vin}
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8 inline-block srpVehicleHit"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				{:else}
					<a
						href={srpLink}
						target="_blank"
						data-dealer={hit.dealer}
						data-stocknumber={hit.stockNumber}
						data-outbound_url={srpLink}
						data-vin={hit.vin}
						data-make={hit.make || hit.marcas}
						data-model={hit.model || hit.modelo}
						data-year={hit.year || hit.ano}
						class="rounded-full text-md md:text-lg srpVehicleHit w-full relative inline-flex group items-center justify-center px-3.5 py-1 md:py-2 cursor-pointer border-2 active:border-purple-600
				font-bold active:shadow-none bg-white hover:border-red-900 text-red hover:text-white tracking-wide hover:bg-red-900 hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out
				duration-300"
					>
						{srpSettings.label_button || 'View Details'}

						<svg
							data-dealer={hit.dealer}
							data-stocknumber={hit.stockNumber}
							data-url={srpLink}
							data-outbound_url={srpLink}
							data-make={hit.make || hit.marcas}
							data-model={hit.model || hit.modelo}
							data-year={hit.year || hit.ano}
							data-vin={hit.vin}
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8 inline-block srpVehicleHit"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				{/if}
				
			</div>
		</div>
	</div>
</div>
