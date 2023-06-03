import logo from '../../images/logo.svg';

import './NavTab.css';

function NavTab () {
  return(
    <header className="header">
      <img className="header__logo" src={logo} height={38} width={38} alt="Логотип" />
      <div className="header__container">
        <a className="header__link" href=" ">Регистрация</a>
        <a className="header__link header__button-link" href=" ">Войти</a>
      </div>
    </header>
  )
}

export default NavTab;
