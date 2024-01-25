<script>
	import { onMount } from 'svelte';
	export let settings = {};
	onMount(() => {});
</script>

{#if settings.ad_content}
	<div class="grid grid-cols-1 justify-items-center px-4 py-5 rounded-md" style:background={settings.ad_content.background_color}>
		<div class="col-span-1 pb-2"><span class="font-black text-black">{@html settings.ad_content.content}</span></div>
		<a
			style:background={settings.ad_content.button_background_color ? settings.ad_content.button_background_color : '#ffffff'}
			style:color={settings.ad_content.button_text_color ? settings.ad_content.button_text_color : '#000000'}
			href={settings.ad_content.button_link}
			target={settings.open_in_new_tab ? '_blank' : '_self'}
			class="rounded-full text-md md:text-lg  w-full relative inline-flex group items-center justify-center px-3.5 py-1 md:py-2  cursor-pointer border-2  active:border-purple-600 font-bold active:shadow-none  hover:border-red-900 text-red hover:text-white tracking-wide hover:bg-red-900 hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300"
		>
			<span>{settings.ad_content.button_label}</span>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</div>
{/if}
