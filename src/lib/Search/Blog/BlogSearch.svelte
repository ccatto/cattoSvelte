<script>
	export let handleSearch;
</script>

<div class="flex bg-white px-3 py-2 justify-between items-center rounded-sm mb-5">
	<input
		class="text-base uppercase font-semibold font-sans w-full border-none"
		placeholder="Search posts..."
		on:input={handleSearch}
	/>
	<a
		href="#"
		class="py-2 px-3 rounded-sm uppercase text-sm hover:bg-blue-500 border border-blue-500 hover:text-white text-blue-500 bg-transparent transition"
		on:click|preventDefault={handleSearch}
	>
		Search
	</a>
</div>
