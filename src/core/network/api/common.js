import { httpMethod } from '../../constants/network.js';

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export const fetchAPI = (url, method, options) => {
  if (method === httpMethod.GET || method === httpMethod.DELETE) {
    const searchParams = new URLSearchParams(options.query || {});
    return fetch(`${url}?${searchParams.toString()}`, { method, ...defaultOptions });
  }

  const { body } = options;
  return fetch(url, { method, body, ...defaultOptions });
};
