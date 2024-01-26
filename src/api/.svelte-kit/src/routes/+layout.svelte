<script>
	import { page, navigating } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { googleAnalyticsId } from './../search-store.js';
	import '../tailwind.css';
	let mounted = false;
	import Footer from '$lib/Globals/Footer.svelte';
	import MainHeader from '$lib/Navbars/MainHeader.svelte';

	// onMount(async () => {
	// 	$googleAnalyticsId = $page.stuff?.siteConfig?.google_tag_manager_id;
	// 	if (mode !== 'development') {
	// 		if (!$googleAnalyticsId) {
	// 			// await getSiteConfig();
	// 		}
	// 	}
	// 	mounted = true;
	// });

	// console.log($page);

	// console.log(siteConfig)
	const siteConfig = $page.data.stuff.siteConfig;

	let currentPath;
	const unsubscribe = page.subscribe((newPages) => {
		currentPath = newPages;
	});
	let currentNav;
	const unsubscribeNavigating = navigating.subscribe((newNav) => {
		currentNav = newNav;
	});

	onDestroy(() => {
		// 4. We make sure to unsubscribe from the store once the component has been destroyed.
		unsubscribe();
		unsubscribeNavigating();
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://use.typekit.net/wfi0xnb.css" />
	<noscript
		><img
			height="1"
			alt="fb"
			width="1"
			style="display:none"
			src="https://www.facebook.com/tr?id=718136122768343&ev=PageView&noscript=1"
		/></noscript
	>
	{#if mounted === true}
		<!-- <script>
			var googleAnalyticsId = window.sessionStorage.getItem('googleAnalyticsId');

			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != 'dataLayer' ? '&l=' + l : '';
				j.async = true;
				j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', googleAnalyticsId);
		</script> -->
		<!-- <script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag('js', new Date());

			// gtag('config', window.sessionStorage.getItem('googleAnalyticsId'));
		</script> -->
	{/if}
</svelte:head>
<!-- {#if mounted === true}
	<GoogleAnalytics properties={[$googleAnalyticsId]} />
{/if} -->
<MainHeader page={currentPath} />
<main class="min-h-screen">
	<slot />
</main>
<Footer footerLinks={siteConfig.navigation?.footer_navigation || {}} />
