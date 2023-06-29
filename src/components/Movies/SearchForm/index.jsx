import { useRef } from "react";
import { useLocation } from "react-router-dom";

import "./SearchForm.css";

function SearchForm({
  movies,
  inputValue,
  checkboxValue,
  handleFoundMoviesData,
  handleSearchInputValue,
  handleSearchCheckboxValue,
}) {
  const location = useLocation().pathname;
  const searchInputRef = useRef(null);
  const searchCheckboxRef = useRef(null);

  // поиск по значению в имени
  const filterName = (name, searchName) => name.includes(searchName);

  // фунция фильтра фильма
  const filterMovies = (moviesData, searchValue, shortFilm) => {
    const searchNameMovie = searchValue.toLowerCase(); // значение поиска

    return moviesData.filter((movie) => {
      let movieName = movie.nameRU.toLowerCase(); // значение фильма

      // если чекбокс истинный
      if (shortFilm) {
        // возвращаем фильмы менее 40 мин и отфильтрованный по значению 
        return movie.duration <= 40 && filterName(movieName, searchNameMovie);
      } else {
        return filterName(movieName, searchNameMovie);
      }
    })
  }

  // ручка поиска
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const searchResult = filterMovies(movies, searchInputRef.current.value, searchCheckboxRef.current.checked);

    // записываем найденые значения
    handleFoundMoviesData(searchResult);

    if (location === '/saved-movies') {
      return;
    }

    // а также в локал
    localStorage.setItem('foundmovies', JSON.stringify({
      inputValue: searchInputRef.current.value,
      checkboxValue: searchCheckboxRef.current.checked,
      movies: searchResult,
    }));
  };

  // ручка значения инпута
  const handleChangeInputValue = (event) => {
    handleSearchInputValue(event.target.value);
  };

  // переключатель чекбокса
  const toggleCheckbox = () => {
    handleSearchCheckboxValue(!checkboxValue);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleOnSubmit}>
        <input
          className="search__input"
          type="search"
          placeholder="Фильм"
          onChange={handleChangeInputValue}
          value={inputValue}
          ref={searchInputRef}
          required
        />
        <button className="search__submit-button">Найти</button>
      </form>
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
