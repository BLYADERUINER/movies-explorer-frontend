import NavTab from '../NavTab';
import Promo from './Promo';
import AboutProject from './AboutProject';
import Techs from './Techs';
import AboutMe from './AboutMe';
import Footer from '../Footer';

import './Main.css';

function Main() {
  return (
    <div className='main'>
      <NavTab />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
  )
}

export default Main;
