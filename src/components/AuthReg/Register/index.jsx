import AuthReg from '../index';

function Register() {
  return(
    <AuthReg title={'Добро пожаловать!'}>
      <div className='authreg__input-container'>
        <span className='authreg__span'>Имя</span>
        <input
          className='authreg__input'
          type='text'
          placeholder='Виталий'
          required
        />
      </div>
      <div className='authreg__input-container'>
        <span className='authreg__span'>E-mail</span>
        <input
          className='authreg__input'
          type='email'
          placeholder='pochta@yandex.ru'
          required
        />
      </div>
      <div className='authreg__input-container'>
        <span className='authreg__span'>Пароль</span>
        <input className='authreg__input' type='password' required />
      </div>
    </AuthReg>
  );
}

export default Register;
