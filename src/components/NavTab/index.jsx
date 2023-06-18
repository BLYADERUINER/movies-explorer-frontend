import { NavLink } from "react-router-dom";

import logo from "../../images/logo.svg";
import iconProfile from "../../images/icon-profile.svg";

import "./NavTab.css";

function NavTab({ logined }) {
  return (
    <div className={`navigation ${!logined ? "navigation_pink" : ""}`}>
      <img
        className="navigation__logo"
        src={logo}
        height={38}
        width={38}
        alt="Логотип"
      />
      {logined && (
        <div className="navigation__films-container">
          <NavLink
            className={(navdata) =>
              `navigation__film-link
                ${navdata.isActive ? "navigation__film-link_active" : ""}`
            }
            to="/movies"
            exact="true"
          >
            Фильмы
          </NavLink>
          <NavLink
            className={(navdata) =>
              `navigation__film-link
                ${navdata.isActive ? "navigation__film-link_active" : ""}`
            }
            to="/saved-movies"
            exact="true"
          >
            Сохранённые фильмы
          </NavLink>
        </div>
      )}
      <div className="navigation__container">
        {logined ? (
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
        ) : (
          <>
            <NavLink
              className="navigation__link"
              to="/signup"
            >
              Регистрация
            </NavLink>
            <NavLink
              className="navigation__link navigation__button-link"
              to="/signin"
            >
              Войти
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default NavTab;
