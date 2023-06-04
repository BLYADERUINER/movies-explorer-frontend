import NavTab from '../NavTab';
import Promo from './Promo';
import AboutProject from './AboutProject';

import './Main.css';

function Main() {
  return (
    <div className='main'>
      <NavTab />
      <Promo />
      <AboutProject />
    </div>
  )
}

export default Main;
