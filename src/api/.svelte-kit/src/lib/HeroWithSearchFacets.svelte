<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	$: selectedMake = null;
	$: selectedModel = null;

	import { getLatLngByZipcode } from '../api/get-lat-lng-by-zipcode.js';
	import { usersZipcode, searchLocation } from '../search-store.js';

	export let componentProps = {};

	let allModels = [];
	let allMakes = [];
	let mdl;

	async function redirectToResultsPage() {
		// handle make and model values ==>> ===>>
		const model = selectedModel=="select model" || selectedModel=="seleccionar modelo" ? null : selectedModel;
		const make = selectedMake=="select make" || selectedMake=="seleccione hacer" ? null : selectedMake;
		
		const zipCode = $usersZipcode || undefined;
		let latLng = undefined;
		const inventoryPath = import.meta.env.VITE_WEBSITE_LANGUAGE_CODE === 'en' ? 'inventory' : 'inventario';

		if (zipCode) {
			latLng = await getLatLngByZipcode(zipCode)
				.then(({ latitude, longitude, ...location }) => {
					$searchLocation = { ...location, latitude, longitude };

					return `${latitude},${longitude}`;
				})
				.catch((error) => {
					console.log('ERROR', error);
				});
		}

		switch (true) {
			case !!make && !!model && !!latLng:
				return goto(`/${inventoryPath}/${make}/${model}/?location=${latLng}`);
			case !!make && !!model:
				return goto(`/${inventoryPath}/${make}/${model}`);
			case !!make && !!latLng:
				return goto(`/${inventoryPath}/${make}/?location=${latLng}`);
			case !!make:
				return goto(`/${inventoryPath}/${make}`);
			case !!latLng:
				return goto(`/${inventoryPath}/?location=${latLng}`);
			default:
				goto(`/${inventoryPath}/`);
		}
	}

	onMount(() => {
		// new code to handle default search

		let makeValue = import.meta.env.VITE_WEBSITE_LANGUAGE_CODE === 'en' ? 'select make' : 'seleccione hacer';
		let modelValue = import.meta.env.VITE_WEBSITE_LANGUAGE_CODE === 'en' ? 'select model' : 'seleccionar modelo';

		if(!componentProps.allMakes.includes(makeValue)) {
			componentProps.allMakes.unshift(makeValue);
		}
		
		const modelObj = {[makeValue]: [{"make": makeValue, "model": modelValue}]}
		mdl = {...modelObj, ...componentProps.makesModels}

		selectedMake = componentProps.allMakes[0];
		selectedModel = mdl[selectedMake][0].model;
		
		allMakes = componentProps.allMakes;
		allModels = mdl[selectedMake].sort((a, b) => a.model > b.model);
		
		// old code
		// selectedMake = componentProps.allMakes[0];
		// selectedModel = componentProps.makesModels[selectedMake][0].model;
		// allMakes = componentProps.allMakes;
		// allModels = componentProps.makesModels[selectedMake].sort((a, b) => a.model > b.model);
	});
</script>

<div
	class="p-4 lg:py-32  flex font-sans antialiased  items-center justify-center  text-{componentProps.text_color}"
	style:background-color={componentProps.background_color}
	style:background-image="url({componentProps.backgroundImage})"
	style:background-blend-mode="unset !important"
>
	<div class="mx-auto flex flex-col p-3 pt-5 md:p-5 md:max-w-7xl w-full rounded-md">
		<div class="relative justify-center">
			<div class="col cols-grid-12">
				<div class="col-span-12 px-3">
					<h1 class="text-2xl  leading-none font-extrabold text-gray-900 sm:text-5xl md:text-5xl mb-3 capitalize">
						<span class="block xl:inline text-white text-{componentProps.headline_text_color}">{componentProps.headline_text || ''} </span>
					</h1>
				</div>
				<div class="bg-white px-4 py-5 md:p-6 rounded-md shadow-lg">
					<div>
						<form>
							<div class="flex flex-wrap justify-items-center items-center content-center mx-auto min-h-8xl text-sm">
								<div class="w-full grid grid-cols-12 gap-4 md:gap-3 gap-y-3">
									<div class="col-span-12 md:col-span-3">
										<div class="flex rounded-md">
											<span class="inline-flex h-mdFormField items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm font-bold">
												{componentProps.make_text}</span
											>
											<select
												class="font-bold rounded rounded-l-none  h-mdFormField w-full text-base border-gray-300 border-l-0 focus:outline-none focus:ring-red focus:border-red sm:text-sm"
												style="color: #000;"
												bind:value={selectedMake}
												on:change={() => {
													// handle on change with default value
													allModels = mdl[selectedMake];
													allModels = mdl[selectedMake].filter((model) => model.make === selectedMake).sort((a, b) => a.model > b.model);

													selectedModel = allModels[0].model;
													
													// allModels = componentProps.makesModels[selectedMake];
													// allModels = componentProps.makesModels[selectedMake].filter((model) => model.make === selectedMake).sort((a, b) => a.model > b.model);
												}}
											>
												{#each allMakes as make}
													<option value={make}>{make}</option>
												{/each}
											</select>
										</div>
									</div>
									<div class="col-span-12 md:col-span-3">
										<div class="flex rounded-md">
											<span class="inline-flex h-mdFormField items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm font-bold">
												{componentProps.model_text}</span
											>
											<select
												class="font-bold rounded rounded-l-none  h-mdFormField w-full text-base border-gray-300 border-l-0 focus:outline-none focus:ring-red focus:border-red sm:text-sm"
												placeholder="All Models"
												bind:value={selectedModel}
											>
												{#each allModels as { make, model }}
													<option value={model}>{model}</option>
												{/each}
											</select>
										</div>
									</div>
									<div class="col-span-12 md:col-span-3">
										<div class=" flex rounded-md md:rounded-l-none">
											<span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm font-bold"
												>{componentProps.zipcode_text}
											</span>
											<input
												type="text"
												name="zipcode"
												bind:value={$usersZipcode}
												placeholder={import.meta.env.VITE_WEBSITE_LANGUAGE_CODE === 'en' ? 'enter your zipcode' : 'ingrese su codigo postal'}
												id="zipcode"
												autocomplete="zipcode"
												class="font-bold rounded  h-mdFormField w-full text-base border-gray-300 focus:outline-none focus:ring-red focus:border-red sm:text-sm rounded-l-none border-l-0"
											/>
										</div>
									</div>
									<div class="col-span-12 md:col-span-3">
										<button
											on:click|preventDefault={() => redirectToResultsPage()}
											class="bg-red w-full text-small h-mdFormField text-center text-white hover:bg-grey  font-bold rounded justify-center items-center flex"
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span>{componentProps.button_label}</span>
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
