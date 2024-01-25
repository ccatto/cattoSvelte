/**
 * A wrapper for async try catch blocks
 *
 * @param {*} method
 * @return {*}
 */
export const tc = async (method) => {
	try {
		const result = await method();
		return [result, null];
	} catch (error) {
		return [null, error];
	}
};
/**
 * A wrapper for sync try catch blocks
 *
 * @param {*} method
 * @return {*}
 */
export const tcSync = (method) => {
	try {
		const result = method();
		return [result, null];
	} catch (error) {
		return [null, error];
	}
};
