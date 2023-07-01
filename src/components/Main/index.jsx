import NavTab from '../NavTab';
import Promo from './Promo';
import AboutProject from './AboutProject';
import Techs from './Techs';
import AboutMe from './AboutMe';
import Footer from '../Footer';

import './Main.css';

function Main({ loggedIn }) {
  return (
    <>
      <NavTab logined={loggedIn} />
      <Promo />
      <main className='main'>
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  )
}

export default Main;
