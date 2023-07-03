import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useInput from "../../../hooks/useInput";

import { durationShortFilm } from "../../../utils/config";

import "./SearchForm.css";

function SearchForm({
  movies,
  foundMoviesData,
  shortFoundMovies,
  inputValue,
  checkboxValue,
  handleFoundMoviesData,
  handleSearchCheckboxValue,
  handleShortFoundMovies,
  setResultSearch,
  setSearchSavedMovies,
  handleOnCheckFoundMovies
}) {
  const location = useLocation().pathname;
  const searchValidation = useInput(inputValue, {isEmpty: true});
  const searchCheckboxRef = useRef(null);

  // проверка валидации поиска
  const emptyValid = () => searchValidation.isDirty && searchValidation.isEmpty;

  //проверка на валид для кнопки
  const handleOnDisableButton = () => !searchValidation.inputValid;

  // поиск по значению в имени
  const filterName = (name, searchName) => name.includes(searchName);

  const resShortMovies = (movie, movieName, searchNameMovie) => {
    return movie.duration <= durationShortFilm && filterName(movieName, searchNameMovie);
  };

  // фунция фильтра фильма
  const filterMovies = (moviesData, searchValue, shortFilm) => {
    const searchNameMovie = searchValue.toLowerCase(); // значение поиска

    return moviesData.filter((movie) => {
      let movieName = movie.nameRU.toLowerCase(); // значение фильма

      // если чекбокс истинный
      if (shortFilm) {
        // возвращаем фильмы менее 40 мин и отфильтрованный по значению 
        return resShortMovies(movie, movieName, searchNameMovie);
      } else {
        return filterName(movieName, searchNameMovie);
      }
    })
  }

  // ручка поиска
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const searchResult = filterMovies(movies, searchValidation.value, searchCheckboxRef.current.checked);

    if (!searchResult) {
      return setResultSearch(false);
    } else {
      setResultSearch(true);
    }

    // записываем найденые значения
    handleFoundMoviesData(searchResult);
    
    if (location === '/saved-movies') {
      setSearchSavedMovies(true);
      return;
    }
    
    // а также в локал
    localStorage.setItem('foundmovies', JSON.stringify({
      inputValue: searchValidation.value,
      checkboxValue: searchCheckboxRef.current.checked,
      movies: searchResult,
    }));

    handleShortFoundMovies(searchResult);
    handleOnCheckFoundMovies();
  };
  
  // переключатель чекбокса
  const toggleCheckbox = () => {
    handleSearchCheckboxValue(!checkboxValue);
  };

  useEffect(() => {
    if (location === '/movies' && checkboxValue && inputValue === searchValidation.value) {
      handleFoundMoviesData(foundMoviesData.filter((movie) => movie.duration <= durationShortFilm));
    } else if (location === '/saved-movies') {
      return;
    } else {
      handleFoundMoviesData(shortFoundMovies);
    }
  }, [checkboxValue, searchValidation.value]);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleOnSubmit}>
        <input
          className="search__input"
          type="search"
          placeholder="Фильм"
          onChange={searchValidation.onChange}
          value={searchValidation.value}
          onBlur={searchValidation.onBlur}
        />
        <button
          className="search__submit-button"
          disabled={handleOnDisableButton()}
        >
          Найти
        </button>
      </form>
      {emptyValid() && <span className='search__error'>Поле обязательно к заполению</span>}
      <div className="search__label">
        <input
          className="search__checkbox"
          id="toggle-button"
          type="checkbox"
          onChange={toggleCheckbox}
          checked={checkboxValue}
          ref={searchCheckboxRef}
        />
        <label
          className="search__text"
          htmlFor="toggle-button"
        >
          Короткометражки
        </label>
      </div>
    </div>
  );
}

export default SearchForm;
