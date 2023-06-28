import MainApi from "./MainApi";
import AuthApi from "./AuthApi";

const headers = {
  'Content-Type': 'application/json',
}

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = new AuthApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers,
  })
  .then(mainApi._checkResponse)
};
