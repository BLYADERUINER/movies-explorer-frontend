class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `https://api.nomoreparties.co/${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      }),
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
