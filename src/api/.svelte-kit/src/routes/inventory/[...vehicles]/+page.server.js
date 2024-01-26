/* eslint-disable no-debugger */

import { AlgoliaSearch } from '../../../api/algolia/search.js';

export const prerender = true;

export async function load({ params, url, locals }) {
	let algoliaIndex = locals?.siteConfig?.algolia_search_index;
	if (algoliaIndex === undefined) {
		throw new Error('Algolia index not found');
	}
	const algolia = new AlgoliaSearch({ algoliaIndex });

	const searchParams = params.vehicles ? params.vehicles.split('/') : [''];
	if (searchParams.toString().includes('favicon')) {
		return {
			status: 200,
			body: {}
		};
	}
	const searchTitle = searchParams.join(' ');
	const pageTitle = searchTitle ? `${searchTitle} ` : 'Inventory';
	const settings = await algolia.getIndexSettings();

	const { inventory, indexSettings } = await algolia.searchByParams(params, url);


	return {

		inventory: inventory,
		pageTitle: pageTitle,
		indexSettings: indexSettings,
		title: searchTitle,
		siteConfig: locals?.siteConfig,
		attributesForFaceting: settings.attributesForFaceting

	};
}
