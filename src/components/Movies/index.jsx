import NavTab from '../NavTab';
import SearchForm from './SearchForm';
import Footer from '../Footer';

import './Movies.css';
import MoviesCardList from './MoviesCardList';

function Movies() {
  return(
    <div className='movies'>
      <NavTab logined />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  )
}

export default Movies;
