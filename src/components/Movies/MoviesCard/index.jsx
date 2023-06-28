import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard ({ movie, saveMovie, deleteMovie, savedMoviesData, toggleFavoriteDelete }) {
  const location = useLocation().pathname;
  
  // расчет временни продолжительности фильма
  const durationHrs = Math.floor(movie.duration / 60); 
  const durationMin = movie.duration % 60;

  // проверка на то что фильм в избранном
  const isFavoriteMovie = savedMoviesData?.some((item) => item.movieId === movie.id);

  // изменение ссылки под роут
  const changingImageLing = location === '/saved-movies' ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`;

  const toggleButton = () => isFavoriteMovie ? toggleFavoriteDelete(movie.id) : saveMovie(movie);


  return (
    <div className="movies__card">
      <div className="movies__container-text">
        <h3 className="movies__name">{movie.nameRU}</h3>
        <span className="movies__duration">{`${durationHrs}ч ${durationMin}м`}</span>
      </div>
      <img
        className="movies__image"
        src={changingImageLing}
        alt={`Фильм: ${movie.nameRU}`}
      />
      {
        location !== "/saved-movies" ?
          <button
            className={`movies__button-favorite ${isFavoriteMovie ? 'movies__button-favorite_active' : ''}`}
            onClick={toggleButton}
          />
        :
          <button
            className="movies__button-favorite movies__button-remove"
            onClick={() => deleteMovie(movie._id)}
          />
      }
    </div>
  );
}

export default MoviesCard;
