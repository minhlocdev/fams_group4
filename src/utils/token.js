class Token {
  getToken(key) {
    return localStorage.getItem(key);
  }

  setToken(key, token) {
    localStorage.setItem(key, token);
  }

  removeToken(key) {
    localStorage.removeItem(key);
  }
}

export default new Token();
