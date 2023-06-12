import MoviesCard from "../MoviesCard";

// Массив с фото
import { movies } from "../../../utils/movies";

import "./MoviesCardList.css";

function MoviesCardList() {
  return (
    <section className="movies__list" aria-label="Секция с фильмами">
      <div className="movies__container">
        {
          movies.length > 0 &&
            movies.map((film, index) => (
              <MoviesCard key={index} image={film.image} active={film.active} />
            ))
        }
      </div>
      <div className="movies__button-container">
        <button className="movies__button-more">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
