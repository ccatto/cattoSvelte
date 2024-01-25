<script>
	import { showHeader } from '../../search-store';
	let innerWidth;
	export let path;
	let crumbs = [];

	$: {
		// Remove zero-length tokens.
		const tokens = path.split('/').filter((t) => t !== '');

		// Create { label, href } pairs for each token.
		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			return {
				label: t,
				href: tokenPath
			};
		});

		// Add a way to get home too.
		crumbs.unshift({ label: 'home', href: '/' });
	}
</script>

<svelte:window bind:innerWidth />
{#if crumbs && crumbs.length > 1}
	<nav class:hidden={!$showHeader && innerWidth < 768} class="h-10 bg-white border-b border-gray-200 flex" aria-label="Breadcrumb">
		<ol class="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8 overflow-x-auto">
			{#each crumbs as c, i}
				<li class="flex">
					<div class="flex items-center">
						<svg class="flex-shrink-0 w-6 h-full text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
						</svg>
						{#if i == crumbs.length - 1 && c.label !== 'home'}
							<span class="uppercase ml-4 text-md font-medium tracking-wide text-coolGray-700">{c.label.replace(/(-)/g, ' ')}</span>
						{:else if c.label === 'home'}
							<a href="/" class="text-gray-400 hover:text-gray-500 pl-4">
								<svg class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path
										d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
									/>
								</svg>
								<span class="sr-only">Home</span>
							</a>
						{:else}
							<a href={c.href} class="uppercase ml-4 text-sm font-medium tracking-wide text-gray-500 hover:text-gray-700">{c.label}</a>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style>
	ol li:nth-child(1) .flex-shrink-0.w-6.h-full.text-gray-200 {
		display: none;
	}
</style>
