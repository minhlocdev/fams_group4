class Token {
  getToken(key) {
    return this.getCookie(key);
  }

  setToken(key, token, expiryDate) {
    this.setCookie(key, token, expiryDate);
  }

  removeToken(key) {
    this.removeCookie(key);
  }

  setCookie(name, value, expiryDate) {
    document.cookie = `${name}=${value};expires=${expiryDate.toUTCString()};path=/`;
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  removeCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}

export default new Token();
