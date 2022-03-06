import { BackendBaseURL } from "../constants.js";

/**
 * @param {String} apiMethod
 * @param {String} method
 * @param {JSON} body
 * @return {Promise<Response>}
 */
export function fetchAPI(apiMethod, method, body) {
	// TODO: make it more safe
	return fetch(BackendBaseURL + apiMethod, {
		method,
		body,
		credentials: "include",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
	});
}
