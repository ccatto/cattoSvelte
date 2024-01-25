import { session } from '$app/stores';
import { queue } from '../api/queue';
import { tc } from '../utils/functionUtils.js';

const ipStackConfig = {
	//eslint-disable-next-line
	apiUrl: import.meta.env.VITE_IPSTACK_API_URL,
	accessKey: import.meta.env.VITE_IPSTACK_API_KEY,
	routes: {
		requestorLookup: '/check'
	},
	accessKeyQuery: '?access_key=' + import.meta.env.VITE_IPSTACK_API_KEY + '&hostname=1'
};

const positionStackConfig = {
	apiUrl: import.meta.env.VITE_POSITION_STACK_API_URL,
	accessKey: import.meta.env.VITE_POSITION_STACK_API_KEY,
	routes: {
		reverseGeocode: '/reverse'
	},
	accessKeyQuery: '?access_key=' + import.meta.env.VITE_POSITION_STACK_API_KEY
};

function positionStackApi() {
	return {
		async reverseGeocode(lat, lng) {
			const requestUrl = `${positionStackConfig.apiUrl}${positionStackConfig.routes.reverseGeocode}${positionStackConfig.accessKeyQuery}&query=${lat},${lng}`;
			return fetch(requestUrl).then((response) => response.json());
		}
	};
}

function ipStackApi() {
	return {
		async getRequestor() {
			return fetch(ipStackConfig.apiUrl + ipStackConfig.routes.requestorLookup + ipStackConfig.accessKeyQuery).then((response) => response.json());
		}
	};
}

const extractIpLocationValues = (location) => {
	let locationData = {};
	let locationKeys = ['ip', 'country_code', 'region_code', 'region_name', 'city', 'zip', 'latitude', 'longitude'];
	for (const [key, value] of Object.entries(location)) {
		if (locationKeys.includes(key)) {
			locationData[key] = value;
		}
	}

	return locationData;
};

const getUserLocationByIp = async () => {
	let ipLocal = {};
	const [ipStackLocation, ipStackError] = await tc(async () => ipStackApi().getRequestor());
	if (ipStackError) {
		throw Error(ipStackError);
	} else {
		ipLocal = extractIpLocationValues(ipStackLocation);
	}
	return ipLocal;
};

const createNewUserTracker = async () => {
	let user = {};
	const { host, href, origin, pathname, search, hash } = window.location;
	user.pageVisit = { host, href, origin, pathname, search, hash };

	user.ipLocation = await getUserLocationByIp();

	if (user.ipLocation && user.ipLocation.ip) {
		user.ip = user.ipLocation.ip;
	}

	if ('geolocation' in navigator) {
		// check if geolocation is supported/enabled on current browser
		navigator.geolocation.getCurrentPosition(
			async function success(position) {
				const { latitude, longitude } = position.coords;
				// get location based on GPS corodiantes if shared by the vistor
				const [positionStackResult, positionStackError] = await tc(async () => positionStackApi().reverseGeocode(latitude, longitude));
				if (positionStackError) {
					user.trueLocation = {};
				} else {
					user.location = positionStackResult.data.reduce((acc, val) => {
						acc[0] = acc[0] === undefined || val.distance <= acc[0] ? val : acc[0];
						return acc;
					}, [])[0];
				}

				await queue.userUpdate(user);
				window.sessionStorage.setItem('user', JSON.stringify(user));
				session.user = user;
			},

			async function error() {
				// attempt to get location based on IP address
				await queue.userUpdate(user);
				session.user = user;
				window.sessionStorage.setItem('user', JSON.stringify(user));
			}
		);
	}
	return location;
};

export const getGeo = async () => {
	try {
		const location = await createNewUserTracker();
		return location;
	} catch (error) {
		console.error('geo-location', error);
	}
};
