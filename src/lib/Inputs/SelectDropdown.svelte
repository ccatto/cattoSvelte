<script>
	export let selectContent = {};
	export let disabled = true;
	export let label;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const updateSelection = (event) => {
		dispatch('updateSelection', { selection: event.target.value });
	};
</script>

<div class="col-span-12 md:col-span-3">
	<div class="flex rounded-md">
		<span class="inline-flex h-mdFormField items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm font-bold"> {label}</span>
		<select
			class="font-bold rounded rounded-l-none  h-mdFormField w-full text-base border-gray-300 border-l-0 focus:outline-none focus:ring-red focus:border-red sm:text-sm"
			type="text"
			placeholder={selectContent.name}
			name={selectContent.name}
			bind:value={selectContent.value}
			{disabled}
			on:change={updateSelection}
		>
			<option value="" selected>{selectContent.default}</option>
			{#each selectContent.options as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</div>
</div>
