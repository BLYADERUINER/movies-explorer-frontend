import logo from '../../images/logo.svg';

import './NavTab.css';

function NavTab() {
  return(
    <div className="navigation navigation_pink">
      <img className="navigation__logo" src={logo} height={38} width={38} alt="Логотип" />
      <div className="navigation__container">
        <a className="navigation__link" href=" ">Регистрация</a>
        <a className="navigation__link navigation__button-link" href=" ">Войти</a>
      </div>
    </div>
  )
}

export default NavTab;
