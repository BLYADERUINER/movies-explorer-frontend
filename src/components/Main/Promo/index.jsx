import webimg from '../../../images/Promo/webimage.png';

function Promo () {
  return(
    <div className='promo'>
      <div className='promo__container'>
        <h1 className='promo__header'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className='promo__button'>Узнать больше</button>
      </div>
      <img className='promo__button' src={webimg} alt="Картинка Веб-разработки" />
    </div>
  )
}

export default Promo;
