<script>
	export let componentProps = {};
	import CardLinksByAttribute from '$lib/Cards/CardLinksByAttribute.svelte';
	let gridSize = componentProps.displayColumns ? `md:grid-cols-${componentProps.displayColumns}` : 'grid-cols-3';
</script>

<div class="flex w-full py-12">
	<div class="inset-0">
		<div class="bg-white h-1/3 sm:h-2/3" />
	</div>
	<div class="relative mx-auto pt-4 w-full">
		<div class="text-center mb-8">
			<h2 class="text-3xl tracking-tight font-extrabold text-green sm:text-4xl">{componentProps.headline}</h2>
			<h3 class="mt-3 max-w-2xl mx-auto text-xl text-black sm:mt-4">{componentProps.sub_headline}</h3>
		</div>

		<div class="max-w-7xl mx-auto">
			<div class="grid {gridSize} gap-4">
				{#if componentProps.vehicleCategories}
					{#if componentProps.vehicleCategories.new}
						<CardLinksByAttribute attributeName={componentProps.shop_by_new_text} attributeList={componentProps.vehicleCategories.new} />
					{/if}
					{#if componentProps.vehicleCategories.used}
						<CardLinksByAttribute attributeName={componentProps.shop_by_used_text} attributeList={componentProps.vehicleCategories.used} />
					{/if}

					{#if componentProps.vehicleCategories.certified}
						<CardLinksByAttribute attributeName={componentProps.shop_by_certified_text} attributeList={componentProps.vehicleCategories.certified} />
					{/if}
				{/if}
			</div>
		</div>
	</div>
</div>
