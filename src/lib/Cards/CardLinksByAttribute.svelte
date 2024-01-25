<script>
	// your script goes here
	export let attributeName;
	export let attributeList;
</script>

<div class="flex flex-col  shadow-md bg-white px-4">
	<div class="bg-white py-5 border-b border-gray-200">
		<div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
			<div class="ml-4 mt-2">
				<h3 class="text-2xl leading-7 font-medium text-gray-900">{attributeName}</h3>
			</div>
			<div class="ml-4 mt-2 flex-shrink-0">
				<button
					type="button"
					class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<a href="/inventory/{attributeName}"> <span> View More...</span> </a></button
				>
			</div>
		</div>
	</div>

	<div class="overflow-auto h-xxl">
		<nav class="space-y-1" aria-label="Sidebar">
			{#each attributeList as attribute}
				<a sveltekit:prefetch class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md" href={attribute.slug}>
					<span class="truncate"> {attribute.make} {attribute.model}</span>
				</a>
			{/each}
			<!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
		</nav>
	</div>
</div>

<!-- markup (zero or more items) goes here -->
<style>
	/* your styles go here */
</style>
