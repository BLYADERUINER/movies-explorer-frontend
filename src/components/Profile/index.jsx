import { Link } from 'react-router-dom';

import NavTab from '../NavTab';
import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
      <NavTab logined />
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Дмитрий!</h2>
        <div className='profile__user-info'>
          <div className='profile__input-container'>
            <span className='profile__span'>Имя</span>
            <input className='profile__input' type='text' placeholder='Дмитрий' disabled />
          </div>
          <div className='profile__input-container'>
            <span className='profile__span'>E-mail</span>
            <input className='profile__input' type='email' placeholder='pochta@yandex.ru' disabled />
          </div>
        </div>
        <div className='profile__links-container'>
          <Link className='profile__link'>Редактировать</Link>
          <Link className='profile__link' style={{color: '#FF4062'}}>Выйти из аккаунта</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
