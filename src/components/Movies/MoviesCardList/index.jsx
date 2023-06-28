import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ movies, savedMovies, saveMovie, deleteMovie }) {
  const location = useLocation().pathname;
  
  const [widthWindow, setWidthWindow] = useState(window.innerWidth); // ширина экрана
  const [numberMoviesOnPage, setNumbersMoviesOnPage] = useState(null); // количество рендера фильмов
  const [numberMoviesAddedOnPage, setNumberMoviesAddedOnPage] = useState(null); // количество добавления фильмов

  // обработчик изменения экрана
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidthWindow(window.innerWidth);
    });
  }, []);

  // обработчик ручки переключения отображения фильмов
  useEffect(() => {
    if (widthWindow >= 1240) {
      setNumbersMoviesOnPage(12);
      setNumberMoviesAddedOnPage(3);
    } else if (widthWindow >= 768) {
      setNumbersMoviesOnPage(8);
      setNumberMoviesAddedOnPage(2);
    } else {
      setNumbersMoviesOnPage(5);
      setNumberMoviesAddedOnPage(2);
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
        { movies.length === 0
          && 
          <h2 style={{textAlign: 'center', color: '#8D8D8D'}}>Ничего не найдено</h2>
        }
        <div className="movies__card-container">
          {
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
