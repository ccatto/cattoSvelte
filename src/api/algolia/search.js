import 'dotenv/config';
import algoliasearch from 'algoliasearch';

import { getVehicleCategories } from './getVehicleCategories.js';
import { getFeaturedDealersInventory } from './getFeaturedDealersInventory.js';
import { getSearchFacets } from './getSearchFacets.js';
import { searchByParams } from './searchByParams.js';

export class AlgoliaSearch {
	constructor({ algoliaIndex }) {
		this.client = algoliasearch(import.meta.env.VITE_ALGOLIA_APP_ID, import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY);
		this.index = this.client.initIndex(algoliaIndex);
	}
	async getIndexSettings() {
		return this.index.getSettings();
	}
	async getVehicleCategories() {
		return getVehicleCategories(this.index);
	}
	async getSearchFacets() {
		return getSearchFacets(this.index);
	}
	async searchByParams(params, url) {
		return searchByParams(this.index, params, url);
	}
	async getFeaturedDealersInventory(featuredDealer) {
		return getFeaturedDealersInventory(this.index, featuredDealer);
	}
}
