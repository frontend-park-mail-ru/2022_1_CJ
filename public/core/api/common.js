/**
 * @param {String} apiMethod
 * @param {String} method
 * @param {JSON} body
 * @return {Promise<Response>}
 */
export function fetchAPI(apiMethod, method, body) {
  return fetch(apiMethod, {
    method,
    body,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
