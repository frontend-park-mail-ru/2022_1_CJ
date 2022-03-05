import { BackendBaseURL } from "../constants.js";

/**
 * @param {String} apiMethod
 * @param {String} method 
 * @param {JSON} body
 * @returns 
 */
export function fetchAPI(apiMethod, method, body) {
  // TODO: make it more safe
  return fetch(BackendBaseURL + apiMethod, {
    method: method,
    body: body,
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  });
}