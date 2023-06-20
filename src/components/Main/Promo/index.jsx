import webimg from '../../../images/Promo/webimage.png';

import './Promo.css';

function Promo() {
  return(
    <header className='header'>
      <div className='header__container'>
        <h1 className='header__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='header__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className='header__button'>Узнать больше</button>
      </div>
      <img className='header__image' src={webimg} alt="Картинка Веб-разработки" />
    </header>
  )
}

export default Promo;
