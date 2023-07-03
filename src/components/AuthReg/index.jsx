import { NavLink, useLocation } from "react-router-dom";

import logo from '../../images/logo.svg';

import './AuthReg.css';

function AuthReg({title, handleSubmit, children, handleDisable}) {
  const location = useLocation().pathname;

  return(
    <div className='authreg'>
      <div className='authreg__container'>
        <NavLink to='/'>
          <img className='authreg__logo' src={logo} alt='Логотип'  />
        </NavLink>
        <h2 className='authreg__title'>{title}</h2>
        <form className='authreg__form' onSubmit={handleSubmit}>
          { children }
          {
            location === '/signup' ?
              <button
                className='authreg__button-submit'
                disabled={handleDisable()}
                type="submit"
              >
                Зарегистрироваться
              </button>
            :
              <button
                className='authreg__button-submit authreg__button-signin'
                disabled={handleDisable()}
                type="submit"
              >
                Войти
              </button>
          }
        </form>
        {
          location === '/signup' ?
            <div className='authreg__link-container'>
              <p className='authreg__link-text'>Уже зарегистрированы?</p>
              <NavLink className='authreg__link' to='/signin'>Войти</NavLink>
            </div>
          :
            <div className='authreg__link-container'>
              <p className='authreg__link-text'>Ещё не зарегистрированы?</p>
              <NavLink className='authreg__link' to='/signup'>Регистрация</NavLink>
            </div>
        }
      </div>
    </div>
  );
}

export default AuthReg;
