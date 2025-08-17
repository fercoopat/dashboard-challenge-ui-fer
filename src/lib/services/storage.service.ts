import Cookies from 'js-cookie';

class StorageService {
  static getCookie(name: string) {
    return Cookies.get(name);
  }

  static setCookie(
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
  ) {
    return Cookies.set(name, value, options);
  }

  static removeCookie(name: string, options?: Cookies.CookieAttributes) {
    return Cookies.remove(name, options);
  }
}

export default StorageService;
