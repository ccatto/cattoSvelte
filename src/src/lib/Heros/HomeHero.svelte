<script>
	import HomeSearch from '$lib/Cards/HomeSearch.svelte';
	export let searchHelper = {};
	export let vehicleCategories = [];
	export let makes = [];
	export let models = [];
</script>

<div class="p-4 lg:py-32 md:bg-opacity-50 flex font-sans antialiased bg-no-repeat items-center justify-center  bg-center bg-cover md:bg-gray-softGray">
	<div class="mx-auto flex flex-col p-3 pt-5 md:p-5 md:max-w-7xl w-full rounded-md">
		<div class="relative">
			<div class="col cols-grid-12">
				<div class="col-span-12 px-3">
					<h1 class="text-2xl  leading-none font-extrabold text-gray-900 sm:text-5xl md:text-5xl mb-3 capitalize">
						<span class="block xl:inline text-white">Search new and used cars</span>
					</h1>
				</div>
				<div class="bg-white px-4 py-5 md:p-6 rounded-md shadow-lg">
					<HomeSearch {searchHelper} {vehicleCategories} {makes} {models} />
				</div>
			</div>
		</div>
	</div>
</div>
