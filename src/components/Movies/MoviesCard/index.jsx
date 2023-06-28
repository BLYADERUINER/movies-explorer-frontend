import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard({ movie, saveMovie }) {
  const location = useLocation().pathname;

  const durationHrs = Math.floor(movie.duration / 60);
  const durationMin = movie.duration % 60;

  return (
    <div className="movies__card">
      <div className="movies__container-text">
        <h3 className="movies__name">{movie.nameRU}</h3>
        <span className="movies__duration">{`${durationHrs}ч ${durationMin}м`}</span>
      </div>
      <img className="movies__image" src={`https://api.nomoreparties.co/${movie.image.url}`} alt={`Фильм: ${movie.nameRU}`} />
      {
        location !== "/saved-movies" ?
          <button
            className={`movies__button-favorite`}
            onClick={() => saveMovie(movie)}
          />
        :
          <button className="movies__button-favorite movies__button-remove" />
      }
    </div>
  );
}

export default MoviesCard;
