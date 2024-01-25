export const getFeaturedDealersInventory = async (searchIndex, featuredDealer) => {
	const { hits } = await searchIndex.search(featuredDealer, {
		hitsPerPage: 21,
		aroundLatLngViaIP: true,
		getRankingInfo: true
	});
	return hits;
};
