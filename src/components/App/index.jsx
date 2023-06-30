import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { mainApi, getMovies, authApi } from "../../utils/api";
import CurrentUserContext from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute";

import Main from "../Main";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import Profile from "../Profile";
import Register from "../AuthReg/Register";
import Login from "../AuthReg/Login";
import NotFound from "../NotFound"; 
import Preloader from "../Preloader";

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // стейт входа
  const [currentUser, setCurrentUser] = useState({}); // стейт юзера
  const [movies, setMovies] = useState([]); // cтейт фильмов
  const [foundMovies, setFoundMovies] = useState([]); // стейт найденых фильмов
  const [savedMoviesData, setSavedMoviesData] = useState([]); // стейт сохраненных фильмов
  const [filteredFavoriteMovies, setFilteredFavoriteMovies] = useState([]); // стейт фильтра сохраненных фильмов
  const [сheckbox, setCheckbox] = useState(false); // чекбокс поиска
  const [searchInputValue, setSearchInputValue] = useState(''); // инпут поиска
  const [preloader, setPreloader] = useState(true); // прелоадер
  const [authRegError, setAuthRegError] = useState(false);

  const navigate = useNavigate();

  // ручка проверки токена
  const handleOnCheckToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setPreloader(false);
    } else {
      mainApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((error) => console.log(error))
        .finally(() => setPreloader(false));
    }
  };

  useEffect(() => {
    handleOnCheckToken();
  }, []);

  // ручка регистрации
  const handleRegister = (name, email, password) => {
    setPreloader(true);
    authApi.register(name, email, password)
    .then(() => {
      navigate('/signin', {replace: true});
    })
    .catch((error) => {
      setAuthRegError(true);
      console.log(error);
    })
    .finally(() => {
      setPreloader(false);
    });
  };

  // ручка логина
  const handleLogin = ((email, password) => {
    setPreloader(true);
    authApi.login(email, password)
    .then((data) => {
      if (data.ok) {
        localStorage.setItem('token', 'true');
        handleOnCheckToken();
        navigate('/movies', {replace: true});
      }
    })
    .catch((error) => {
      setAuthRegError(true);
      console.log(error);
    })
    .finally(() => setPreloader(false));
  });

  // ручка выхода
  const handleSignout = () => {
    setPreloader(true);
    authApi.logout()
      .then(() => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/', {replace: true});
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setPreloader(false);
      });
  };

  // ручка обновления инфы 
  const handleUpdateUserInfo = (newInfo) => {
    setPreloader(true);
    mainApi.patchUserInfo(newInfo)
      .then((res) => setCurrentUser(res))
      .catch((error) => console.log(error))
      .finally(() => setPreloader(false));
  };

  // получение всех фильмов
  const getAllMovies = () => {
    setPreloader(true);
    getMovies()
    .then((moviesData) => {
      setMovies(moviesData);
    })
    .catch((error) => console.log(error))
    .finally(() => setPreloader(false));
  };

  // ручка проверки фильмов
  const handleOnCheckFoundMovies = () => {
    setPreloader(true);
    const foundFilmsData = localStorage.getItem('foundmovies');

    // проверяем есть ли в локалке данные
    if (!foundFilmsData) {
      return setPreloader(false);
    } else {
      // парсим полученые данные
      const foundData = JSON.parse(foundFilmsData);

      // раскидываем по стейтам
      setFoundMovies(foundData.movies);
      setCheckbox(foundData.checkboxValue);
      setSearchInputValue(foundData.inputValue);
      setPreloader(false);
    }
  };

  // ручка получения сохраненных фильмов
  const handleGetSavedMovies = useCallback(() => {
    setPreloader(true);
    mainApi.getLikedMovies()
      .then((movies) => {
        const userId = currentUser.data._id;
        const userMovies = movies.data.filter((item) => item.owner === userId);
        // возвращаем фильмы пользователя
        setSavedMoviesData(userMovies);
      })
      .catch((error) => console.log(error))
      .finally(() => setPreloader(false));
  }, [currentUser]);

  // получение фильмов
  useEffect(() => {
    if (loggedIn)
    return getAllMovies();
  }, [loggedIn]);

  // получение найденый фильмов
  useEffect(() => {
    if (loggedIn)
    return handleOnCheckFoundMovies();
  }, [loggedIn])

  // получение сохраненых фильмов
  useEffect(() => {
    if (loggedIn)
    return handleGetSavedMovies();
  }, [handleGetSavedMovies, loggedIn]);

  // сохранение в стейт при изменении сохраненных фильмов
  useEffect(() => {
    if (loggedIn)
    return setFilteredFavoriteMovies(savedMoviesData);
  }, [savedMoviesData, loggedIn]);

  // ручка добавления карточки в избранное 
  const handleClickOnFavoritesMovies = (movie) => {
    mainApi.postLikedMovie(movie)
    .then((movie) => setSavedMoviesData([movie.data, ...savedMoviesData]))
    .catch((error) => console.log(error));
  };
  
  // ручка удаления фильма
  const handleSavedMovieDelete = (movieId) => {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMoviesData((stateMovie) => {
          return stateMovie.filter((movie) => movie._id !== movieId);
        });
      })
      .catch((error) => console.log(error));
  };

  // отображение прилоадера
  if (preloader) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement loggedIn={loggedIn}>
              <Movies
                moviesData={movies}
                savedMoviesData={savedMoviesData}
                foundMoviesData={foundMovies}
                searchCheckboxValue={сheckbox}
                searchInputValue={searchInputValue}
                handleFoundMoviesData={setFoundMovies}
                handleSearchInputValue={setSearchInputValue}
                handleSearchCheckboxValue={setCheckbox}
                handleDeleteMovie={handleSavedMovieDelete}
                saveMovie={handleClickOnFavoritesMovies}
              />
            </ProtectedRouteElement>
          }
        />
        <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <SavedMovies
                  moviesData={filteredFavoriteMovies}
                  handleFoundMoviesData={setFilteredFavoriteMovies}
                  handleDeleteMovie={handleSavedMovieDelete}
                />
              </ProtectedRouteElement>
            }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement loggedIn={loggedIn}>
              <Profile
                updateInfo={handleUpdateUserInfo}
                handleSignout={handleSignout}
              />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              handleRegister={handleRegister}
              errorReg={authRegError}
              setErrorReg={setAuthRegError}
              />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              handleLogin={handleLogin}
              errorLogin={authRegError}
              setErrorLogin={setAuthRegError}
            />
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRouteElement loggedIn={loggedIn}>
              <NotFound />
            </ProtectedRouteElement>
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
