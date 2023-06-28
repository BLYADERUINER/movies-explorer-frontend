import { useState } from 'react';

import AuthReg from "../index";

function Login({ handleLogin }) {
  // стейт значений формы
  const [formValue, setFormValue] = useState({
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

    const {email, password} = formValue;
    handleLogin(email, password);
  };

  return(
    <AuthReg title={'Рады видеть!'} handleSubmit={handleSubmit}>
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

export default Login;
