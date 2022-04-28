import { CodedError } from "src/core/modules/error";

export const httpStatus = {
	Ok: 200,
	BadRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	Conflict: 409,
	InternalServerError: 500,
};

export const httpMethod = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};

const defaultOptions: RequestInit = {
	mode: "same-origin",
	credentials: "same-origin",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
};

export const withQuery = (url: string, dto: object = {}) => {
	const query = Object.entries(dto)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
	return `${url}?${query}`;
};

const http = async <T>(url: string, config: RequestInit): Promise<T> => {
	const request = new Request(url, { ...defaultOptions, ...config });
	const response = await fetch(request);
	if (!response.ok) {
		throw new CodedError(response.statusText, response.status);
	}
	return response.json().catch(() => {});
};

const get = async <T>(url: string, config?: RequestInit): Promise<T> => {
	const init = { method: httpMethod.GET, ...config };
	return http<T>(url, init);
};

const _delete = async <T>(url: string, config?: RequestInit): Promise<T> => {
	const init = { method: httpMethod.DELETE, ...config };
	return http<T>(url, init);
};

const post = async <T, U>(url: string, body: T, config?: RequestInit): Promise<U> => {
	const init = { method: httpMethod.POST, body: JSON.stringify(body), ...config };
	return http<U>(url, init);
};

const put = async <T, U>(url: string, body: T, config?: RequestInit): Promise<U> => {
	const init = { method: httpMethod.PUT, body: JSON.stringify(body), ...config };
	return http<U>(url, init);
};

export const fetchAPI = {
	get,
	delete: _delete,
	post,
	put,
};
