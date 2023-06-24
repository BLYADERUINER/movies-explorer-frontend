import MainApi from "./MainApi";

class MoviesApi extends MainApi {
  getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  };
};

export default MoviesApi;
