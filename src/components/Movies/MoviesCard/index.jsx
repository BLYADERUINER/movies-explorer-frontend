import "./MoviesCard.css";

function MoviesCard({ image, active }) {
  return (
    <div className="movies__card">
      <div className="movies__container-text">
        <h3 className="movies__name">33 слова о дизайне</h3>
        <span className="movies__duration">1ч 47м</span>
      </div>
      <img className="movies__image" src={image} alt="Картинка фильма" />
      <button
        className={`movies__button-favorite ${
          active ? "movies__button-favorite_active" : ""
        }`}
      />
    </div>
  );
}

export default MoviesCard;
