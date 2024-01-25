<script>
	export let footerLinks = [];
	console.log(footerLinks)
</script>

<footer class="bg-coolGray-100 mt-9 border-t border-coolGray-200" aria-labelledby="footerHeading">
	<h2 id="footerHeading" class="sr-only">Footer</h2>
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
		<div class="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
			<div class="grid grid-cols-2 gap-8 xl:col-span-4">
				{#each Object.entries(footerLinks) as [contentCategory, linkData]}
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div>
							<h3 class="text-sm font-semibold text-gray-700 tracking-wider uppercase">{contentCategory}</h3>

							<ul class="mt-4 space-y-4 list-none">
								{#each linkData as link}
									<li>
										<a href={`/${encodeURI(link.path)}`} class="text-base text-gray-800 hover:text-gray-900 hover:font-bold">{link.title}</a>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
			<div class="flex space-x-6 md:order-2">
				<a href="https://facebook.com/365CarShop" class="text-gray-400 hover:text-gray-300">
					<span class="sr-only">Facebook</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</div>
			<p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
				Copyright &copy; 2022 - <a class="text-red font-bold" href="https://365automotivemarketing.com">365 Automotive Marketing Inc.</a> All rights reserved.
			</p>
		</div>
	</div>
</footer>
