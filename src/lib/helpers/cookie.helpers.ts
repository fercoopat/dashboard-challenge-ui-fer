import Cookies from 'js-cookie';

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
): string | undefined => {
  return Cookies.set(name, value, options);
};

export const removeCookie = (
  name: string,
  options?: Cookies.CookieAttributes
): void => {
  return Cookies.remove(name, options);
};
