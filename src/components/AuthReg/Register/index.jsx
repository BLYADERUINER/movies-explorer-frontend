import useInput from '../../../hooks/useInput';

import AuthReg from '../index';

function Register({ handleRegister, errorReg, setErrorReg }) {
  const nameValidation = useInput('', {isEmpty: true, minLength: 2, maxLength: 30})
  const emailValidation = useInput('', {isEmpty: true, isEmail: true});
  const passwordValidation = useInput('', {isEmpty: true});

  // проверка на валид для кнопки
  const handleOnDisableButton = () => !nameValidation.inputValid || !emailValidation.inputValid || !passwordValidation.inputValid;

  // проверка ошибок
  const minNameValid = () => nameValidation.isDirty && nameValidation.minLengthError;
  const maxNameValid = () => nameValidation.isDirty && nameValidation.maxLengthError;
  const emailValid = () => emailValidation.isDirty && emailValidation.emailError;
  const emptyValid = () => {
    return (emailValidation.isDirty && emailValidation.isEmpty) 
        || (passwordValidation.isDirty && passwordValidation.isEmpty)
        || (nameValidation.isDirty && nameValidation.isEmpty)
  };

  // ручка ресета ошибки
  const handleResetAuthError = () => {
    setErrorReg(false);
  };

  // ручка отправки
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = nameValidation.value;
    const email = emailValidation.value;
    const password = passwordValidation.value;

    handleRegister(name, email, password);
  };

  return(
    <AuthReg title={'Добро пожаловать!'} handleSubmit={handleSubmit} handleDisable={handleOnDisableButton}>
      <div className='authreg__input-container'>
        <span className='authreg__span'>Имя</span>
        <input
          className='authreg__input'
          type='text'
          placeholder='Виталий'
          name='name'
          required
          onClick={handleResetAuthError}
          onChange={nameValidation.onChange}
          onBlur={nameValidation.onBlur}
          value={nameValidation.value}
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
          onClick={handleResetAuthError}
          onChange={emailValidation.onChange}
          onBlur={emailValidation.onBlur}
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
          onChange={passwordValidation.onChange}
          onBlur={passwordValidation.onBlur}
          value={passwordValidation.value}
        />
      </div>
      {minNameValid() && <span className='authreg__error'>Имя должно быть не менее 2 символов</span>}
      {maxNameValid() && <span className='authreg__error'>Имя должно быть не более 30 символов</span>}
      {emailValid() && <span className='authreg__error'>Введен некорректный email</span>}
      {emptyValid() && <span className='authreg__error'>Все поля обязательны к заполнению</span>}
      {errorReg && <span className='authreg__error'>Произошла ошибка, попробуйте снова</span>}
    </AuthReg>
  );
}

export default Register;
