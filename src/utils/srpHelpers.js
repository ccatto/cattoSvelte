export const updateGtagDataLayer = (hit, srpLink) => {
	console.log('UPDATE GTAG DATA LAYER hit: ', hit);
	if (window?.dataLayer) {
		const { vin, year, make, model, trim, stockNumber, dealer_name } = hit;
		window.dataLayer.push({ make, model, trim, year, vin, stock_number: stockNumber, dealer: dealer_name, outbound_url: srpLink });
		window.open(srpLink, '_blank');
		return true;
	}
};
