<script>
	export let postData;

	console.log(postData);
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

<div class="rounded-sm overflow-hidden bg-white shadow-sm">
	<a href={`/blog/blog-post/${Slug}`} class="block rounded-md overflow-hidden">
		<img
			src="src/images/img-12.jpg"
			class="w-full h-96 object-cover transform hover:scale-110 transition duration-500"
			alt=""
		/>
	</a>
	<div class="p-4 pb-5">
		<a href={`/blog/blog-post/${Slug}`}>
			<h2
				class="block text-2xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto"
			>
				{@html Body}
			</h2>
		</a>

		<p class="text-gray-500 text-sm mt-2">
			{Description}
		</p>
		<div class="mt-3 flex space-x-4">
			<div class="flex text-gray-400 text-sm items-center">
				<span class="mr-2 text-xs">
					<i class="far fa-user"></i>
				</span>
				Blogging Tips
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
