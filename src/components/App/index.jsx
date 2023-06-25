import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { moviesApi } from "../../utils/api";

import Main from "../Main";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import Profile from "../Profile";
import Register from "../AuthReg/Register";
import Login from "../AuthReg/Login";
import NotFound from "../NotFound"; 

import './App.css';

function App() {
  const [movies, setMovies] = useState([]); // cтейт фильмов
  const [foundMovies, setFoundMovies] = useState([]); // стейт найденых фильмов
  const [сheckbox, setCheckbox] = useState(false); // чекбокс поиска
  const [searchInputValue, setSearchInputValue] = useState(''); // инпут поиска
  // const [preloader, setPreloader] = useState(false); // прелоадер

  // ручка проверки фильмов
  function handleOnCheckFoundMovies() {
    const foundFilmsData = localStorage.getItem('foundmovies');

    // проверяем есть ли локалке данные
    if (!foundFilmsData) {
      return;
    } else {
      // парсим полученые данные
      const foundData = JSON.parse(foundFilmsData);

      // раскидываем по стейтам
      setFoundMovies(foundData.movies);
      setCheckbox(foundData.checkboxValue);
      setSearchInputValue(foundData.inputValue);
    }
  }

  // получение всех фильмов
  useEffect(() => {
    moviesApi.getMovies()
    .then((moviesData) => {
      setMovies(moviesData);
    })
    .catch((error) => console.log(error));
  }, [setMovies]);

  // получение фильмов из локалки
  useEffect(() => {
    handleOnCheckFoundMovies();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/movies"
        element={
          <Movies
            moviesData={movies}
            foundMoviesData={foundMovies}
            searchCheckboxValue={сheckbox}
            searchInputValue={searchInputValue}
            handleFoundMoviesData={setFoundMovies}
            handleSearchInputValue={setSearchInputValue}
            handleSearchCheckboxValue={setCheckbox}
          />}
      />
      <Route path="/saved-movies" element={<SavedMovies />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
