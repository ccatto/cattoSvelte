import { browser } from '$app/environment';
import { readable, writable } from 'svelte/store';
export const showDynamicResults = writable(true);

export const count = writable(1);

export const distance = writable(250);

export const menuOpen = writable(false);

export const mobileMenuOpen = writable(false);

export const showDesktopMenu = writable(false);

export const showHeader = writable(true);

export const pageQuery = writable({});

export const searchIndexSettings = writable({});

const searchFacets = JSON.parse(browser && sessionStorage.getItem('searchFacets')) || {};
export const allSearchFacets = writable(browser && searchFacets);
allSearchFacets.subscribe((val) => browser && (sessionStorage.searchFacets = JSON.stringify(val)));

const localVehicleMakes = JSON.parse(browser && sessionStorage.getItem('vehicleMakes')) || {};
export const vehicleMakes = writable(browser && localVehicleMakes);
vehicleMakes.subscribe((val) => browser && (sessionStorage.vehicleMakes = JSON.stringify(val)));

const facets = JSON.parse(browser && sessionStorage.getItem('selectedFacets')) || [];
export const selectedFacets = writable(browser && facets);
selectedFacets.subscribe((val) => browser && (sessionStorage.selectedFacets = JSON.stringify(val)));

// export const searchFacetsStatic = readable([
// 	'condition',
// 	'make',
// 	'model',
// 	'marcas',
// 	'modelo',
// 	'transmission',
// 	'transmisión',
// 	'trim',
// 	'type',
// 	'clase',
// 	'color exterior',
// 	'color interior',
// 	'exterior color',
// 	'interior color',
// 	'dealer'
// ]);


// new facets
export const searchFacetsStatic = readable([
	'condition',
	'make',
	'model',
	'marcas',
	'modelo',
	'trim',
	'estilo',
	'dealer',
	'distribuidor'
]);

export const searchQuery = writable('');
export const lastSearchQuery = writable('');
export const currentFacetRefinements = writable({});

const zip = (browser && sessionStorage.getItem('zipcode')) || '';
export const usersZipcode = writable(browser && zip);
usersZipcode.subscribe((val) => browser && (sessionStorage.zipcode = val));

const location = JSON.parse(browser && sessionStorage.getItem('searchLocation')) || {};
export const searchLocation = writable(browser && location);
searchLocation.subscribe((val) => browser && (sessionStorage.searchLocation = JSON.stringify(val)));

export const currentPage = writable(0);

export const totalPages = writable(0);

const analyticsId = (browser && sessionStorage.getItem('googleAnalyticsId')) || '';
export const googleAnalyticsId = writable(browser && analyticsId);
googleAnalyticsId.subscribe((val) => browser && (sessionStorage.googleAnalyticsId = val));

export const hitCount = writable(0);

export const sidebarVisible = writable(true);
