import useInput from '../../../hooks/useInput';

import AuthReg from "../index";

function Login({ handleLogin, errorLogin, setErrorLogin }) {
  const emailValidation = useInput('', {isEmpty: true, isEmail: true});
  const passwordValidation = useInput('', {isEmpty: true});

  // проверка на валид для кнопки
  const handleOnDisableButton = () => !emailValidation.inputValid || !passwordValidation.inputValid;

  // проверка ошибок
  const emailValid = () => emailValidation.isDirty && emailValidation.emailError;
  const emptyValid = () => (emailValidation.isDirty && emailValidation.isEmpty) || (passwordValidation.isDirty && passwordValidation.isEmpty);

  // ручка ресета ошибки
  const handleResetAuthError = () => {
    setErrorLogin(false);
  };

  // ручка отправки
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailValidation.value;
    const password = passwordValidation.value;
    
    handleLogin(email, password);
  };

  return(
    <AuthReg title={'Рады видеть!'} handleSubmit={handleSubmit} handleDisable={handleOnDisableButton}>
      <div className='authreg__input-container'>
        <span className='authreg__span'>E-mail</span>
        <input
          className='authreg__input'
          type='email'
          placeholder='pochta@yandex.ru'
          name='email'
          required
          onClick={handleResetAuthError}
          onBlur={emailValidation.onBlur}
          onChange={emailValidation.onChange}
          value={emailValidation.value}
        />
      </div>
      <div className='authreg__input-container'>
        <span className='authreg__span'>Пароль</span>
        <input
          className='authreg__input'
          type='password'
          required
          name='password'
          onClick={handleResetAuthError}
          onBlur={passwordValidation.onBlur}
          onChange={passwordValidation.onChange}
          value={passwordValidation.value}
        />
      </div>
      {emailValid() && <span className='authreg__error'>Введен некорректный email</span>}
      {emptyValid() && <span className='authreg__error'>Все поля обязательны к заполнению</span>}
      {errorLogin && <span className='authreg__error'>Неправильный логин или пароль</span>}
    </AuthReg>
  );
}

export default Login;
