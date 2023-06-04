import NavTab from '../NavTab';
import Promo from './Promo';
import AboutProject from './AboutProject';
import Techs from './Techs';

import './Main.css';

function Main() {
  return (
    <div className='main'>
      <NavTab />
      <Promo />
      <AboutProject />
      <Techs />
    </div>
  )
}

export default Main;
