export const getSearchFacets = async (searchIndex) => {
	let result = await searchIndex.search('', {
		facets: ['*']
	});
	return result.facets;
};
