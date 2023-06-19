import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../images/logo.svg";
import iconProfile from "../../images/icon-profile.svg";

import "./NavTab.css";
import "./Burger.css";

function NavTab({ logined }) {
  const [isToggleBurgerButton, setToggleBurgerButton] = useState(false);

  function handleToggleBurgerButton() {
    setToggleBurgerButton(!isToggleBurgerButton);
  }

  return (
    <div
      className={`navigation ${!logined ? "navigation_pink" : ""}${
        isToggleBurgerButton ? "navigation_opened" : ""
      }`}
    >
      <img
        className="navigation__logo"
        src={logo}
        height={38}
        width={38}
        alt="Логотип"
      />
        <div className={`navigation__wrapper ${
          isToggleBurgerButton ? "navigation_wrapper_opened" : ""
          }`} 
          />
      {
        logined ?
        <div className="navigation__container">
          <div className="navigation__films-container">
          <NavLink
              className='navigation__film-link navigation__home-link'
              to="/"
              exact="true"
            >
              Главная
            </NavLink>
            <NavLink
              className={(navdata) => `navigation__film-link
                    ${
                      navdata.isActive ? "navigation__film-link_active" : ""
                    }`}
              to="/movies"
              exact="true"
            >
              Фильмы
            </NavLink>
            <NavLink
              className={(navdata) => `navigation__film-link
                    ${
                      navdata.isActive ? "navigation__film-link_active" : ""
                    }`}
              to="/saved-movies"
              exact="true"
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="navigation__profile-container">
            <NavLink className="navigation__profile-link" to="/profile">
              Аккаунт
              <img
                className="navigation__profile-icon"
                src={iconProfile}
                height={14}
                width={11.5}
                alt="Иконка профиля"
              />
            </NavLink>
          </div>
        </div>
      : 
        <div className="navigation__authreg-container">
          <NavLink className="navigation__link" to="/signup">
            Регистрация
          </NavLink>
          <NavLink
            className="navigation__link navigation__button-link"
            to="/signin"
          >
            Войти
          </NavLink>
        </div>
      }
      {
        logined &&
          <button
            className="navigation__burger-button"
            onClick={handleToggleBurgerButton}
          >
            <span className="navigation__burger-span"></span>
            <span className="navigation__burger-span"></span>
            <span className="navigation__burger-span"></span>
          </button>
      }
    </div>
  );
}

export default NavTab;
