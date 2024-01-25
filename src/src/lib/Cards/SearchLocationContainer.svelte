<script>
	import { usersZipcode, searchLocation, searchQuery, hitCount } from '../../search-store.js';
	import { getLatLngByZipcode } from '../../api/get-lat-lng-by-zipcode.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	const srpSettings = $page.data.stuff.siteConfig?.srpConfig ?? {};

	const locationDistances = [
		{
			name: `50 ${srpSettings.label_miles || 'miles'}`,
			value: 50
		},
		{
			name: `75 ${srpSettings.label_miles || 'miles'}`,
			value: 75
		},
		{
			name: `100 ${srpSettings.label_miles || 'miles'}`,
			value: 100
		},
		{
			name: `150 ${srpSettings.label_miles || 'miles'}`,
			value: 150
		},
		{
			name: `200 ${srpSettings.label_miles || 'miles'}`,
			value: 200
		},

		{
			name: `300 ${srpSettings.label_miles || 'miles'}`,
			value: 300
		},

		{
			name: `400 ${srpSettings.label_miles || 'miles'}`,
			value: 400
		},
		{
			name: `500 ${srpSettings.label_miles || 'miles'}`,
			value: 500
		},
		{
			name: `${srpSettings.any_distance_label || 'Any Distance'}`,
			value: 1000000
		}
	];
	let selectedLocation = {};
	let showModal = false;
	onMount(() => {
		selectedLocation = locationDistances[8];
	});
	let loading = false;

	const metersInMile = 1609.34;
	async function getLocationResults() {
		window.AutoSearch.searchHelper.setQuery('');
		window.AutoSearch.searchHelper.clearRefinements('');

		const searchRadius = selectedLocation.value * metersInMile;

		try {
			const response = await getLatLngByZipcode($usersZipcode);

			if (response?.latitude) {
				const { latitude, longitude } = response;
				window.AutoSearch.searchHelper.setQueryParameter('aroundLatLng', `${latitude},${longitude}`);
				window.AutoSearch.searchHelper.setQueryParameter('aroundRadius', searchRadius);

				$searchLocation = response;
				window.AutoSearch.searchHelper.search();
			} else {
				window.AutoSearch.searchHelper.search();
			}
			showModal = false;
			loading = false;
		} catch (error) {
			console.log('ERROR IN SEARCH LOCATION CONTAINER', error);
			loading = false;
		}
	}
</script>

<button on:click={() => (showModal = true)} class="modal-button font-semibold h-8 md:h-20 py-0 bg-transparent border-0 pr-0 capitalize text-lg items-start hover:bg-transparent">
	<span class="text-sm md:text-md lg:text-lg pt-0 text-black"
		>{$hitCount} <span> {srpSettings.label_cars_found_near_location || 'Cars Found Near'} </span>
		{#if $searchLocation.latitude}
			<span class="underline text-black hover:text-red-300"> {$searchLocation.locality || $searchLocation.administrative_area}, {$searchLocation.region}</span>
		{:else}
			<span class="underline text-black hover:text-red-300 lowercase">Search by Zipcode</span>
		{/if}
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
			<path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
		</svg>
	</span></button
>

<!-- The button to open modal -->

<!-- Put this part before </body> tag -->
{#if showModal}
	<div class="modal  modal-middle align-center modal-open">
		<div class="modal-box bg-white">
			<div class="card text-left">
				<div class="card-body p-0">
					<h2 class="card-title">Location</h2>
					<div class="grid grid-cols-1">
						<div>
							<label for="zipcode" class="block text-sm font-bold mb-2">{srpSettings.zipcode_label || 'zipcode'}</label>
							<input
								autoComplete="none"
								class="font-bold rounded rounded-l-none  h-mdFormField w-full text-base border-gray-300  focus:outline-none focus:ring-red focus:border-red sm:text-sm"
								type="text"
								placeholder={srpSettings.zipcode_label}
								name="zipcode"
								on:focus={() => (selectedLocation = locationDistances[8])}
								bind:value={$usersZipcode}
							/>
						</div>
						<div>
							<label for="distance" class="block text-sm font-bold mb-2">{srpSettings.distance_label || 'distance'}</label>
							<select
								bind:value={selectedLocation.value}
								class="font-bold rounded rounded-l-none  h-mdFormField w-full text-base border-gray-300  focus:outline-none focus:ring-red focus:border-red sm:text-sm"
							>
								{#each locationDistances as option, index}
									<option value={option.value}>{option.name}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="card-actions justify-end w-full">
						<button
							on:click={getLocationResults}
							class="w-full rounded-lg relative inline-flex group items-center justify-center px-3.5 py-3  cursor-pointer border-b-4 border-l-2 active:border-purple-600 font-bold active:shadow-none shadow-lg bg-red border-red-800 text-white tracking-wide :disabled={loading} hover:bg-red-900  hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300"
							class:loading
						>
							{#if !loading}
								<span class="mr-3">{srpSettings.search_label}</span>
							{:else}
								<svg role="status" class="h-6 w-6 inline-block text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="#E5E7EB"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentColor"
									/>
								</svg>
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
