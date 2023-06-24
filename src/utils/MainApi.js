class MainApi {
  constructor(options) {
    this._baseUrl = options._baseUrl;
    this._headers = options._headers;
  };

  // метод проверки ответа от сервера
  _checkResponse(response){
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.statusText}`);
  };

  // получение сохраненных фильмов
  getLikedMovies() {
    return fetch(`${this._baseUrl}/movies}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse)
  };

  // создания избранного фильма
  postLikedMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(movieData),
    })
    .then(this._checkResponse)
  };

  // удаление фильма
  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse)
  };

  // получение инфы юзера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse)
  };

  // обновление инфы юзера
  patchUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(userData),
    })
    .then(this._checkResponse)
  };
};

export default MainApi;
