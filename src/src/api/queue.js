/* eslint-disable */

const USER_UPDATE_HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json'
};

const USER_UPDATE_API_URL = `${import.meta.env.VITE_BDA_MICROSERVICES_VISITORS_URL}?code=${import.meta.env.VITE_VISITOR_TRACKER_KEY_CODE}`;

const userUpdate = async (user) => {
	return fetch(USER_UPDATE_API_URL, {
		method: 'POST',
		headers: { ...USER_UPDATE_HEADERS },
		body: JSON.stringify({ visitor: user })
	});
};
export const queue = {
	userUpdate
};
