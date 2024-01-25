<script>
	export let postData;
	console.log(postData)

	const { Body, Description, Slug, State, Title, createdAt, publishedAt } = postData.attributes;

	// Function to format the date
	function formatDate(dateString) {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}

	// Formatted date
	$: formattedDate = formatDate(createdAt);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
	<div class="rounded-sm bg-white p-4 pb-5 shadow-sm">
		<a href={`/blog/blog-post/${Slug}`} class="block rounded-md overflow-hidden">
			<img
				src="src/images/img-11.jpg"
				class="w-full h-60 object-cover transform hover:scale-110 transition duration-500"
				alt=""
			/>
		</a>
		<div class="mt-3">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#">
				<h2
					class="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto"
				>
					{@html Body}
				</h2>
			</a>
			<div class="mt-2 flex space-x-3">
				<div class="flex text-gray-400 text-sm items-center">
					<span class="mr-2 text-xs">
						<i class="far fa-user"></i>
					</span>
					Car Tips
				</div>
				<div class="flex text-gray-400 text-sm items-center">
					<span class="mr-2 text-xs">
						<i class="far fa-clock"></i>
					</span>
					{formattedDate}
				</div>
			</div>
		</div>
	</div>
</div>
