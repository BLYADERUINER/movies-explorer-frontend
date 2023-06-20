import Section from "../Section";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="abproject" aria-label="Секция о проекте">
      <Section name={"О проекте"} />
      <div className="abproject__container">
        <div className="abproject__passed">
          <h3 className="abproject__title">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="abproject__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="abproject__passed">
          <h3 className="abproject__title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="abproject__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="abproject__container-line">
        <div className="abproject__line abproject__line-black">
          <span
            className="abproject__span abproject__span-week"
            style={{ color: "#ffffff" }}
          >
            1 неделя
          </span>
          <span className="abproject__span abproject__span-developed">
            Back-end
          </span>
        </div>
        <div className="abproject__line abproject__line-grey">
          <span className="abproject__span abproject__span-week">4 недели</span>
          <span className="abproject__span abproject__span-developed">
            Front-end
          </span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
