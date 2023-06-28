import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ foundMovies, saveMovie }) {
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

  return (
    <section className="movies__list" aria-label="Секция с фильмами">
      <div className="movies__container">
        { foundMovies.length === 0
          && 
          <h2 style={{textAlign: 'center', color: '#8D8D8D'}}>Ничего не найдено</h2>
        }
        <div className="movies__card-container">
          {
            // location === '/saved-movies' ?
            //   movies
            //     .filter((film) => film.active === true)
            //     .map((film, index) => (
            //       <MoviesCard key={index} image={film.image} active={film.active} />
            //     ))
            // :
            foundMovies.length > 0
            && foundMovies.slice(0, numberMoviesOnPage).map((filmData) => (
                <MoviesCard key={filmData.id} movie={filmData} saveMovie={saveMovie} />
              ))
          }
        </div>
        { foundMovies.length > numberMoviesOnPage && 
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
