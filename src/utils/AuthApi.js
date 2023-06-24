import MainApi from "./MainApi";

class AuthApi extends MainApi {
  // регистрация
  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, email, password})
    })
    .then(this._checkResponse)
  };

  // авторизация
  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  };

  // выход из системы
  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse)
  };
};

export default AuthApi;
