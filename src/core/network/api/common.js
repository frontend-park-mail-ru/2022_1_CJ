import { httpMethod } from '../../constants/network.js';

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const formDataOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json'
  }
};

export const fetchAPI = (url, method, options = {}) => {
  if (method === httpMethod.GET || method === httpMethod.DELETE) {
    const searchParams = new URLSearchParams(options.query || {});
    console.log(`${url}?${searchParams.toString()}`);
    return fetch(`${url}?${searchParams.toString()}`, { method, ...defaultOptions });
  }

  const { body } = options;
  return fetch(url, { method, body, ...defaultOptions });
};

export const fetchAPIFormData = (url, method, options = {}) => {
  const { body } = options;
  return fetch(url, { method, body, ...formDataOptions });
};
