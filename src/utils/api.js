import MainApi from "./MainApi";
import AuthApi from "./AuthApi";
import MoviesApi from "./MoviesApi";

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

export const moviesApi = new MoviesApi({});
