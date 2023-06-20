import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard";

// Массив с фото
import { movies } from "../../../utils/movies";

import "./MoviesCardList.css";

function MoviesCardList({ savedMovies }) {
  const location = useLocation().pathname;

  return (
    <section className="movies__list" aria-label="Секция с фильмами">
      <div className="movies__container">
        <div className="movies__card-container">
          {
            location === '/saved-movies' ?
              movies
                .filter((film) => film.active === true)
                .map((film, index) => (
                  <MoviesCard key={index} image={film.image} active={film.active} />
                ))
            :
                movies.map((film, index) => (
                  <MoviesCard key={index} image={film.image} active={film.active} />
                ))
          }
        </div>
        <div className="movies__button-container">
          {
            location !== '/saved-movies' &&
              <button className="movies__button-more">Ещё</button>
          }
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;
