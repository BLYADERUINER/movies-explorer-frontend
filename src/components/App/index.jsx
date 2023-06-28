import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { mainApi, getMovies, authApi } from "../../utils/api";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]); // cтейт фильмов
  const [foundMovies, setFoundMovies] = useState([]); // стейт найденых фильмов
  const [savedMoviesData, setSavedMoviesData] = useState([]); // стейт сохраненных фильмов
  const [сheckbox, setCheckbox] = useState(false); // чекбокс поиска
  const [searchInputValue, setSearchInputValue] = useState(''); // инпут поиска
  const [preloader, setPreloader] = useState(true); // прелоадер

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

  // ручка регистрации
  const handleRegister = (name, email, password) => {
    setPreloader(true);
    authApi.register(name, email, password)
    .then(() => {
      console.log("успех");
      setTimeout(() => navigate('/signin', {replace: true}), 1000);
    })
    .catch((error) => {
      console.log(error);
      // setToggleInfoTooltip({image: false, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
    })
    .finally(() => {
      setPreloader(false);
      // handleInfoTooltip();
    });
  };

  // ручка логина
  const handleLogin = ((email, password) => {
    setPreloader(true);
    authApi.login(email, password)
    .then((data) => {
      if (data) {
        handleOnCheckToken();
        localStorage.setItem('token', 'true');
        setLoggedIn(true);
        navigate('/movies', {replace: true});
      }
    })
    .catch((error) => {
      console.log(error);
      // setToggleInfoTooltip({image: false, text: 'Неверный адрес электронной почты или пароль'});
      // handleInfoTooltip();
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
        navigate('/signin', {replace: true});
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setPreloader(false);
      });
  };

  // ручка обновления инфы 
  const handleUpdateUserInfo = (newInfo) => {
    mainApi.patchUserInfo(newInfo)
      .then((res) => setCurrentUser(res))
      .catch((error) => console.log(error));
  };

  // ручка проверки фильмов
  const handleOnCheckFoundMovies = () => {
    const foundFilmsData = localStorage.getItem('foundmovies');

    // проверяем есть ли локалке данные
    if (!foundFilmsData) {
      return
    } else {
      // парсим полученые данные
      const foundData = JSON.parse(foundFilmsData);

      // раскидываем по стейтам
      setFoundMovies(foundData.movies);
      setCheckbox(foundData.checkboxValue);
      setSearchInputValue(foundData.inputValue);
    }
  };

  // ручка получения сохраненных фильмов
  const handleGetSavedMovies = () => {
    mainApi.getLikedMovies()
      .then((movies) => setSavedMoviesData(movies.data))
      .catch((error) => console.log(error));
  };

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

  // получение всех фильмов
  useEffect(() => {
    getMovies()
    .then((moviesData) => {
      setMovies(moviesData);
    })
    .catch((error) => console.log(error));
  }, [setMovies]);

  // получение фильмов из локалки
  useEffect(() => {
    handleOnCheckToken();
    handleOnCheckFoundMovies();
    handleGetSavedMovies();
  }, []);

  // отображение прилоадера
  if (preloader) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/movies"
        element={
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
          />}
      />
      <Route
          path="/saved-movies"
          element={
            <SavedMovies
            movies={savedMoviesData}
            handleDeleteMovie={handleSavedMovieDelete}
            />
          }
      />
      <Route
        path="/profile"
        element={
          <Profile
            userInfo={currentUser}
            updateInfo={handleUpdateUserInfo}
            handleSignout={handleSignout}
          />
        }
      />
      <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
      <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
