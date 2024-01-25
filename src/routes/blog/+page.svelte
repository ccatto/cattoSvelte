<script>
	import BigPost from '$lib/Posts/BigPost.svelte';
	import RegularPost from '$lib/Posts/RegularPost.svelte';
	import BlogSearch from '$lib/Search/Blog/BlogSearch.svelte';
	import SocialPlugins from '$lib/Globals/SocialPlugins.svelte';
	import Tags from '$lib/Globals/Tags.svelte';
	import PopularPosts from '$lib/Posts/PopularPosts.svelte';

	export let data;
	let content = data.pageContent.data;
	let searchTerm = '';
	let filteredContent = content;

	// Debounce function
	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	const search = (term) => {
		filteredContent = term.trim()
			? content.filter((post) =>
					post.attributes.Description.toLowerCase().includes(term.toLowerCase())
				)
			: content;
	};

	const debouncedSearch = debounce(search, 300);

	function handleSearch(event) {
		searchTerm = event.target.value;
		debouncedSearch(searchTerm);
	}
</script>

<main class="pt-12 bg-gray-100 pb-12 font-sans text-black">
	<div class="container mx-auto px-4">
		<div class="flex flex-col lg:flex-row">
			<div class="xl:w-6/12 lg:w-9/12 w-full xl:ml-6 lg:mr-6">
				<div class="lg:w-3/12">
					<h1 class="text-black text-5xl font-bold py-2 lg:block">Latest</h1>
				</div>

				<BlogSearch {handleSearch} />

				{#if filteredContent.length > 0}
					<BigPost postData={filteredContent[0]} />
				{/if}

				{#each filteredContent as post (post.id)}
					<RegularPost postData={post} />
				{/each}
			</div>

			<div class="lg:w-3/12 w-full mt-8 lg:mt-0">
				<SocialPlugins />
				<PopularPosts />
				<Tags />
			</div>
		</div>
	</div>
</main>
