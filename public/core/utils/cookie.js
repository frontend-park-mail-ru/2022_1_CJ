const cookieDelimiter = '; ';
export const CookiePropMaxAge = 'max-age';

export function getCookie(name) {
  const decoded = decodeURIComponent(document.cookie);

  let result = '';
  decoded.split(cookieDelimiter).forEach((value) => {
    if (value.indexOf(name) === 0) {
      result = value.substring(name.length + 1);
    }
  });

  return result;
}

export function setCookie(name, value, options = {}) {
  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  Object.entries(options).forEach((key) => {
    updatedCookie += `;${key}=${options[key]}`;
  });
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, '', {CookiePropMaxAge: -1});
}
