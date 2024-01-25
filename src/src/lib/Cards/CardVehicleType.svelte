<script>
	export let image;
	export let title;
	import ImageLoader from '$lib/GlobalHelpers/ImageLoader.svelte';
</script>

<!-- component -->
<div class="space-y-4 px-6 pt-5">
	<div class="aspect-w-3 aspect-h-2 w-full">
		<a href="/inventory/{title}">
			<ImageLoader src={image} alt={title} classList="h-full w-full object-scale-down mx-auto object-cover rounded-sm" />
		</a>
	</div>

	<div class="text-lg leading-6 font-medium space-y-1">
		<h3><a href="/inventory">{title}</a></h3>
	</div>
</div>
