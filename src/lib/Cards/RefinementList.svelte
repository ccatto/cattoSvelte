<script>
	export let attribute;
	export let label;
</script>

<div class="relative">
	<div class="absolute inset-0 flex items-center" aria-hidden="true">
		<div class="w-full border-t border-gray-300" />
	</div>
	<div class="relative flex justify-start">
		<span class="pr-5 pl-4 bg-green text-md font-bold text-white rounded-md rounded-l-none"
			>{label}
		</span>
	</div>
</div>
<div id="{attribute}-refinement-list" />

<style>
	/* your styles go here */
</style>
