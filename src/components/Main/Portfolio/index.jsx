import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="aboutme__portfolio">
      <span className="aboutme__span">Портфолио</span>
      <div className="aboutme__portfolio-container">
        <a
          className="aboutme__link"
          href="https://blyaderuiner.github.io/mesto-react/"
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
          <div className="aboutme__link-icon" />
        </a>
        <a
          className="aboutme__link"
          href="https://blyaderuiner.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
          <div className="aboutme__link-icon" />
        </a>
        <a
          className="aboutme__link"
          href="https://blyaderuiner.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
          <div className="aboutme__link-icon" />
        </a>
      </div>
    </div>
  );
}

export default Portfolio;
