import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard";
import { desktopWidth, tabWidth, moviesOnPage, addMovieOnPage } from "../../../utils/config";

import "./MoviesCardList.css";

function MoviesCardList({
  movies,
  savedMovies,
  saveMovie,
  deleteMovie,
  resultSearch,
  filteredFavoriteMovies,
  searchSavedMovies
}) {
  const location = useLocation().pathname;
  
  const [widthWindow, setWidthWindow] = useState(window.innerWidth); // ширина экрана
  const [numberMoviesOnPage, setNumbersMoviesOnPage] = useState(null); // количество рендера фильмов
  const [numberMoviesAddedOnPage, setNumberMoviesAddedOnPage] = useState(null); // количество добавления фильмов

  const resizeWindow = () => setWidthWindow(window.innerWidth);

  // обработчик изменения экрана
  useEffect(() => {
    window.addEventListener('resize', resizeWindow);

    return() => {
      window.removeEventListener('resize', resizeWindow);
    }; 
  }, []);

  // обработчик ручки переключения отображения фильмов
  useEffect(() => {
    if (widthWindow >= desktopWidth) {
      setNumbersMoviesOnPage(moviesOnPage.desktop);
      setNumberMoviesAddedOnPage(addMovieOnPage.desktop);
    } else if (widthWindow >= tabWidth) {
      setNumbersMoviesOnPage(moviesOnPage.tablet);
      setNumberMoviesAddedOnPage(addMovieOnPage.tablet);
    } else {
      setNumbersMoviesOnPage(moviesOnPage.mobile);
      setNumberMoviesAddedOnPage(addMovieOnPage.mobile);
    } 
  }, [widthWindow]);

  // ручка добавления отображаемых фильмов
  const handleAddMoviesOnClick = () => {
    setNumbersMoviesOnPage(numberMoviesOnPage + numberMoviesAddedOnPage);
  }

  // ручка на удаление из избранного на основном роуте
  const handleOnToggleButtonFavorites = (id) => {
    // находим фильм и забираем его локальный id
    const movieToDelete = savedMovies.find((item) => item.movieId === id);

    // удаляем его
    return deleteMovie(movieToDelete._id);
  }

  return (
    <section className="movies__list" aria-label="Секция с фильмами">
      <div className="movies__container">
        {(resultSearch && !movies.length)
          ?
          <h2 style={{textAlign: 'center', color: '#8D8D8D'}}>Ничего не найдено</h2>
          : ''
        }
        <div className="movies__card-container">
          {
            searchSavedMovies ? 
            filteredFavoriteMovies.slice(0, numberMoviesOnPage).map((filmData) => (
              <MoviesCard
                key={filmData.id || filmData._id}
                movie={filmData}
                savedMoviesData={savedMovies}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                toggleFavoriteDelete={handleOnToggleButtonFavorites}
              />
            ))
            :
            movies.length > 0
            && movies.slice(0, numberMoviesOnPage).map((filmData) => (
                <MoviesCard
                  key={filmData.id || filmData._id}
                  movie={filmData}
                  savedMoviesData={savedMovies}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  toggleFavoriteDelete={handleOnToggleButtonFavorites}
                />
              ))
          }
        </div>
        { movies.length > numberMoviesOnPage && 
          <div className="movies__button-container">
            {
              location !== '/saved-movies' &&
              <button
                className="movies__button-more"
                onClick={handleAddMoviesOnClick}
              >
                Ещё
              </button>
            }
          </div>
        }
      </div>
    </section>
  );
}

export default MoviesCardList;
