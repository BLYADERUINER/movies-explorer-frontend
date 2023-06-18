import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.svg';

import './Register.css';

function Register() {
  return(
    <div className='authreg'>
      <div className='authreg__container'>
        <img className='authreg__logo' src={logo} alt='Логотип'  />
        <h2 className='authreg__title'>Добро пожаловать!</h2>
        <form className='authreg__form'>
          <div className='authreg__input-container'>
            <span className='authreg__span'>Имя</span>
            <input className='authreg__input' type='text' placeholder='Виталий' />
          </div>
          <div className='authreg__input-container'>
            <span className='authreg__span'>E-mail</span>
            <input className='authreg__input' type='email' placeholder='pochta@yandex.ru' />
          </div>
          <div className='authreg__input-container'>
            <span className='authreg__span'>Пароль</span>
            <input className='authreg__input' type='password' />
          </div>
          <span className='authreg__error' />
          <button className='authreg__button-submit'>Зарегистрироваться</button>
        </form>
        <div className='authreg__link-container'>
          <p className='authreg__link-text'>Уже зарегистрированы?</p>
          <NavLink className='authreg__link' to='/signin'>Войти</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Register;
