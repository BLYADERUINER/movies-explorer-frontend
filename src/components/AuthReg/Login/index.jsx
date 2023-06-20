import AuthReg from "../index";

function Login() {
  return(
    <AuthReg title={'Рады видеть!'}>
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

export default Login;
