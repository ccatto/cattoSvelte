export const searchByParams = async (searchIndex, params, url) => {
	const location = url.searchParams.get('location') || '';
	const searchParams = params.vehicles ? params.vehicles.split('/') : [''];

	let algoliaQuery = {
		getRankingInfo: true,
		hitsPerPage: 21,
		aroundLatLngViaIP: true,
		facets: ['*']
	};

	if (location) {
		algoliaQuery.aroundLatLng = location;
		algoliaQuery.aroundRadius = 'all';
		algoliaQuery.aroundLatLngViaIP = false;
	}

	let { hits, ...indexSettings } = await searchIndex.search(searchParams, {
		...algoliaQuery
	});
	return { inventory: hits, indexSettings };
};
