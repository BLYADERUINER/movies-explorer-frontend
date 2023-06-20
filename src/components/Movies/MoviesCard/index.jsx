import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard({ image, active }) {
  const location = useLocation().pathname;

  return (
    <div className="movies__card">
      <div className="movies__container-text">
        <h3 className="movies__name">33 слова о дизайне</h3>
        <span className="movies__duration">1ч 47м</span>
      </div>
      <img className="movies__image" src={image} alt="Картинка фильма" />
      {
        location !== "/saved-movies" ?
          <button
            className={`movies__button-favorite
              ${active ? "movies__button-favorite_active" : ""
            }`}
          />
        :
          <button className="movies__button-favorite movies__button-remove" />
      }
    </div>
  );
}

export default MoviesCard;
