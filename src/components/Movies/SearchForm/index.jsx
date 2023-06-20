import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <input className="search__input" type="search" placeholder="Фильм" required />
        <button className="search__submit-button">Найти</button>
      </form>
      <div className="search__label">
        <input
          className="search__checkbox"
          id="toggle-button"
          type="checkbox"
        />
        <label
          className="search__text"
          htmlFor="toggle-button"
        >
          Короткометражки
        </label>
      </div>
    </div>
  );
}

export default SearchForm;
