import { browser } from '$app/environment';
const apiKey = import.meta.env.VITE_POSITION_STACK_API_KEY;

export async function getLatLngByZipcode(zipcode) {
	if (browser) {
		const requestUrl = `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${zipcode}&country=US`;
		const response = await fetch(requestUrl).then((res) => res.json());
		let result = {};
		if (response.data && response.data.length > 0) {
			result = response.data.find((item) => item.type === 'postalcode');
		}
		return result;
	}
}
