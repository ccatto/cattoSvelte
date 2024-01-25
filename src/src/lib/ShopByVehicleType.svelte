<script>
	export let componentProps = {};
	import ImageLoader from '$lib/GlobalHelpers/ImageLoader.svelte';
</script>

<section class="relative">
	<div class="relative">
		<div class="absolute inset-0 flex items-center" aria-hidden="true">
			<div class="w-full border-t border-gray-300" />
		</div>
		<div class="relative flex justify-center">
			<h2 class="title text-center font-bold text-3xl py-10 bg-white px-2 text-green" style:color={componentProps.headline_text_color || ''}>{componentProps.headline}</h2>
		</div>
	</div>
	<div class="grid grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto lg:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-10 md:gap-y-8">
		{#each componentProps.cta_with_image as cta}
			<div class="shadow-md pb-3 w-full">
				<div class="space-y-4 px-6 pt-5">
					<div class="aspect-w-3 aspect-h-2 w-full">
						<a href={cta.link}>
							<ImageLoader src={cta.image.thumbnail.url} alt={cta.label} classList="h-full w-full object-scale-down mx-auto object-cover rounded-sm" />
						</a>
					</div>

					<div class="text-lg leading-6 font-medium space-y-1">
						<h3><a href={cta.link}>{cta.label}</a></h3>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
