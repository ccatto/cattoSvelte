<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { totalPages } from '../../search-store.js';
	let selectedPage = 1;
	import { page } from '$app/stores';
	const srpSettings = $page.data.stuff.siteConfig?.srpConfig ?? {};
	let y = 0;
	$: totalPagesArr = (() => {
		if ($totalPages > 0) {
			let arr = Array.from({ length: $totalPages }, (_, i) => i + 1);
			arr.pop();
			return arr;
		} else {
			return [];
		}
	})();

	const changePage = (page) => {
		window.AutoSearch.searchHelper.setPage(page).search();
		selectedPage = window.AutoSearch.searchHelper.getCurrentPage();

		y = 0;
	};
	const prevPage = () => {
		if (selectedPage > 0) {
			window.AutoSearch.searchHelper.setPage(selectedPage).previousPage().search();
			selectedPage = selectedPage - 1;
		}
		y = 0;
	};
	const nextPage = () => {
		if (selectedPage === 0) {
			selectedPage = 1;
		}
		window.AutoSearch.searchHelper.setPage(selectedPage).nextPage().search();
		selectedPage = selectedPage + 1;
		y = 0;
	};
</script>

<svelte:window bind:scrollY={y} />
{#if totalPagesArr.length}
	<div class="md:flex w-full p-5  justify-center px-8 bg-white">
		<div class="inline-flex">
			<div class="px-2">
				<button
					class:hidden={selectedPage === 1}
					on:click={prevPage}
					class="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-black hover:text-white focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-100 transition ease-in-out duration-150"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
					{srpSettings.label_pagination_previous_page || 'Previous Page'}
				</button>
			</div>

			{#each totalPagesArr as page, index}
				<div class="px-2 hidden md:flex">
					<button
						on:click={() => changePage(page)}
						class:bg-black={page === selectedPage}
						class:text-white={page === selectedPage}
						class="flex items-center px-3 py-2 border border-gray-300 hover:border-0  hover:bg-black hover:text-white   focus:border-gray-300 active:bg-gray-100 transition ease-in-out duration-150"
					>
						<span class="text-sm font-medium leading-5">{page}</span>
					</button>
				</div>
			{/each}
			{#if selectedPage !== totalPagesArr.length}
				<div class="px-2">
					<button
						on:click={nextPage}
						class="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-black hover:text-white focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-100 transition ease-in-out duration-150"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
						{srpSettings.label_pagination_next_page || 'Next Page'}
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
