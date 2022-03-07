import { BackendBaseURL } from '../constants/constants.js';

/**
 * @param {String} apiMethod
 * @param {String} method
 * @param {JSON} body
 * @return {Promise<Response>}
 */
export function fetchAPI(apiMethod, method, body) {
  // TODO: make it more safe
  // FIXME: issues with CORS
  return fetch(BackendBaseURL + apiMethod, {
    method,
    body,
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // FIXME: unsafe
    },
  });
}
