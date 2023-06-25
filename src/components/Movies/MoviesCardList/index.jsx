import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ foundMovies }) {
  const location = useLocation().pathname;

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
            && foundMovies.map((filmData) => (
                <MoviesCard key={filmData.id} movie={filmData} />
              ))
            // : <h2 style={{textAlign: 'center', color: '#8D8D8D'}}>Ничего не найдено</h2>
          }
        </div>
        {/* { foundMovies.length > 12 && 
          <div className="movies__button-container">
            {
              location !== '/saved-movies' &&
              <button className="movies__button-more">Ещё</button>
            }
          </div>
        } */}
      </div>
    </section>
  );
}

export default MoviesCardList;
