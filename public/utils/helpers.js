import { CookieKeyAuthorized, getCookie } from "./cookie.js";

export function isAuthorized() {
  return getCookie(CookieKeyAuthorized) === "true";
}
