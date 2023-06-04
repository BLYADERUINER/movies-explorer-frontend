import Section from "../Section";

import iamImg from "../../../images/AboutMe/iam.jpeg";
import "./AboutMe.css";
import Portfolio from "../Portfolio";

function AboutMe() {
  return (
    <section className="aboutme" aria-label="Секция обо мне">
      <Section name={"Студент"} />
      <div className="aboutme__block">
        <div className="aboutme__container">
          <h2 className="aboutme__name">Дмитрий</h2>
          <p className="aboutme__status">Фронтенд-разработчик, 24 года</p>
          <p className="aboutme__text">
            Я&nbsp;живу в&nbsp;Самаре. Всегда мечтал стать разработчик.
            И&nbsp;начал познавать веб-разработку вместе yandex practicum.
            Продолжаю развиваться, и&nbsp;интересоваться новыми технологиями.
            На&nbsp;досуге люблю играть в&nbsp;игры и&nbsp;решать задачки.
          </p>
          <a
            className="aboutme__link-git"
            href="https://github.com/BLYADERUINER"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="aboutme__image" src={iamImg} alt="Мое фото" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
