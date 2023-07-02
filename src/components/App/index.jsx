import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { mainApi, getMovies, authApi } from "../../utils/api";

import CurrentUserContext from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute";
import LogginedProtectedRoute from "../LogginedProtectedRouter";

import Main from "../Main";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import Profile from "../Profile";
import Register from "../AuthReg/Register";
import Login from "../AuthReg/Login";
import NotFound from "../NotFound"; 
import Preloader from "../Preloader";

import './App.css';
import PopupWithInfo from "../PopupWithInfo";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // стейт входа
  const [currentUser, setCurrentUser] = useState({}); // стейт юзера
  const [movies, setMovies] = useState([]); // cтейт фильмов
  const [foundMovies, setFoundMovies] = useState([]); // стейт найденых фильмов
  const [savedMoviesData, setSavedMoviesData] = useState([]); // стейт сохраненных фильмов
  const [filteredFavoriteMovies, setFilteredFavoriteMovies] = useState([]); // стейт фильтра сохраненных фильмов
  const [shortFoundMovies, setShortFoundMovies] = useState([]); // короткие фильмы
  const [searchSavedMovies, setSearchSavedMovies] = useState(false);
  const [сheckbox, setCheckbox] = useState(false); // чекбокс поиска
  const [searchInputValue, setSearchInputValue] = useState(''); // инпут поиска
  const [resultSearch, setResultSearch] = useState(false);
  const [preloader, setPreloader] = useState(true); // прелоадер
  const [authRegError, setAuthRegError] = useState(false); // ошибка авторега
  const [isPopupWithInfo, setPopupWithInfo] = useState(false); // попап с инфой
  const [infoPopup, setInfoPopup] = useState(''); // попап инфа

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

  // ручка получения юзера
  const handleGetUser = () => {
    setPreloader(true);
    mainApi.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((error) => console.log(error))
    .finally(() => setPreloader(false));
  };

  // ручка логина
  const handleLogin = ((email, password) => {
    setPreloader(true);
    authApi.login(email, password)
    .then(() => {
      handleGetUser();
    })
    .then(() => {
      localStorage.setItem('token', 'true');
      setLoggedIn(true);
      navigate('/movies', {replace: true});
      setInfoPopup('Добро Пожаловать!');
    })
    .catch((error) => {
      setAuthRegError(true);
      console.log(error);
    })
    .finally(() => {
      setPreloader(false);
      handleOpenPopup(true);
    });
  });

  // ручка регистрации
  const handleRegister = (name, email, password) => {
    setPreloader(true);
    authApi.register(name, email, password)
    .then(() => {
      handleLogin(email, password);
    })
    .catch((error) => {
      setAuthRegError(true);
      console.log(error);
    })
    .finally(() => {
      setPreloader(false);
    });
  };

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
      .then((res) => {
        setCurrentUser(res)
        setInfoPopup('Информация изменена');
      })
      .catch((error) => {
        setInfoPopup('Что-то пошло не так, попробуйте снова');
        console.log(error);
        handleOpenPopup(true);
      })
      .finally(() => {
        setPreloader(false);
        handleOpenPopup(true);
      });
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
      setShortFoundMovies(foundData.movies);
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

  //сохранение в стейт при изменении сохраненных фильмов
  useEffect(() => {
    if (loggedIn)
    return setFilteredFavoriteMovies(savedMoviesData);
  }, []);

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
        setFilteredFavoriteMovies((stateMovie) => {
          return stateMovie.filter((movie) => movie._id !== movieId);
        });
        setSavedMoviesData((stateMovie) => {
          return stateMovie.filter((movie) => movie._id !== movieId);
        });
      })
      .catch((error) => console.log(error));
  };

   // открытие модалки
  function handleOpenPopup() {
    setPopupWithInfo(true);
  }

  // закрытие модалки
  function handleClosePopup() {
    setPopupWithInfo(false);
    setInfoPopup('');
  }

  // отображение прилоадера
  if (preloader) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement loggedIn={loggedIn}>
              <Movies
                moviesData={movies}
                shortFoundMovies={shortFoundMovies}
                savedMoviesData={savedMoviesData}
                foundMoviesData={foundMovies}
                searchCheckboxValue={сheckbox}
                searchInputValue={searchInputValue}
                handleFoundMoviesData={setFoundMovies}
                handleSearchInputValue={setSearchInputValue}
                handleSearchCheckboxValue={setCheckbox}
                handleDeleteMovie={handleSavedMovieDelete}
                handleShortFoundMovies={setShortFoundMovies}
                saveMovie={handleClickOnFavoritesMovies}
                resultSearch={resultSearch}
                setResultSearch={setResultSearch}
              />
            </ProtectedRouteElement>
          }
        />
        <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <SavedMovies
                  moviesData={savedMoviesData}
                  filteredFavoriteMovies={filteredFavoriteMovies}
                  handleFoundMoviesData={setFilteredFavoriteMovies}
                  handleDeleteMovie={handleSavedMovieDelete}
                  resultSearch={resultSearch}
                  setResultSearch={setResultSearch}
                  searchSavedMovies={searchSavedMovies}
                  setSearchSavedMovies={setSearchSavedMovies}
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
            <LogginedProtectedRoute loggedIn={loggedIn}>
              <Register
                handleRegister={handleRegister}
                errorReg={authRegError}
                setErrorReg={setAuthRegError}
              />
            </LogginedProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <LogginedProtectedRoute loggedIn={loggedIn}>
              <Login
                handleLogin={handleLogin}
                errorLogin={authRegError}
                setErrorLogin={setAuthRegError}
              />
            </LogginedProtectedRoute>
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
      <PopupWithInfo
        popupTitle={infoPopup}
        isOpen={isPopupWithInfo}
        onClose={handleClosePopup}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
