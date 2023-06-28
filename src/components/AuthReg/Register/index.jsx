import { useState } from 'react';

import AuthReg from '../index';

function Register({ handleRegister }) {
  // стейт значений формы
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // ручка вводимых значений
  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  // ручка отправки
  const handleSubmit = (event) => {
    event.preventDefault();

    const {name, email, password} = formValue;
    handleRegister(name, email, password);
  };

  return(
    <AuthReg title={'Добро пожаловать!'} handleSubmit={handleSubmit}>
      <div className='authreg__input-container'>
        <span className='authreg__span'>Имя</span>
        <input
          className='authreg__input'
          type='text'
          placeholder='Виталий'
          name='name'
          required
          onChange={handleChange}
        />
      </div>
      <div className='authreg__input-container'>
        <span className='authreg__span'>E-mail</span>
        <input
          className='authreg__input'
          type='email'
          placeholder='pochta@yandex.ru'
          name='email'
          required
          onChange={handleChange}
        />
      </div>
      <div className='authreg__input-container'>
        <span className='authreg__span'>Пароль</span>
        <input
          className='authreg__input'
          type='password'
          required
          name='password'
          onChange={handleChange}
        />
      </div>
    </AuthReg>
  );
}

export default Register;
