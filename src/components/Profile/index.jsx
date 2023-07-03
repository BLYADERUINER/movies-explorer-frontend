import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../context/CurrentUserContext';
import NavTab from '../NavTab';

import './Profile.css';

function Profile({ updateInfo, handleSignout }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser.data.name;
  const userEmail = currentUser.data.email;

  // стейт доступа к изменениям инфы
  const [editAcess, setEditAcess] = useState(true);
  const [disableButton, setDisableButton] = useState(false);


  // стейт значений формы
  const [formValue, setFormValue] = useState({
    email: userEmail,
    name: userName,
  });

  // ручка вводимых значений
  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  // проверка инпутов на идентичность значения
  useEffect(() => {
    if (formValue.email === userEmail && formValue.name === userName) {
      return setDisableButton(true);
    } else {
      return setDisableButton(false);
    }
  }, [formValue.email, formValue.name, userEmail, userName]);

  // ручка отправки
  const handleSubmit = (event) => {
    event.preventDefault();

    updateInfo(formValue);
    toggleEditAcess();
  };

  // смена доступа к редактированию инфы
  const toggleEditAcess = () => {
    setEditAcess(!editAcess);
  };

  return (
    <div className='profile'>
      <NavTab logined />
      <div className='profile__container'>
        <h2 className='profile__title'>{`Привет, ${userName}!`}</h2>
        <div className='profile__user-info'>
          <div className='profile__input-container'>
            <span className='profile__span'>Имя</span>
            <input
              className='profile__input'
              type='text'
              value={formValue.name}
              placeholder='Дмитрий'
              name='name'
              disabled={editAcess}
              onChange={handleChange}
            />
          </div>
          <div className='profile__input-container'>
            <span className='profile__span'>E-mail</span>
            <input
              className='profile__input'
              type='email'
              value={formValue.email}
              placeholder='pochta@yandex.ru'
              name='email'
              disabled={editAcess}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='profile__links-container'>
          <Link
            className={`profile__link ${!editAcess ? 'profile__link_red' : ''} ${!editAcess && disableButton ? 'profile__link_disabled' : ''}`}
            onClick={editAcess ? toggleEditAcess : handleSubmit}
          >
            {editAcess ? 'Редактировать' : 'Изменить'}
          </Link>
          <Link
            className='profile__link'
            style={{color: '#FF4062'}}
            onClick={handleSignout}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
