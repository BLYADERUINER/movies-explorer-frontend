import NavTab from '../NavTab';
import SearchForm from '../Movies/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList';
import Footer from '../Footer';

import './SavedMovies.css';

function SavedMovies() {
  return(
    <div className='movies'>
    <NavTab logined />
    <SearchForm />
    <MoviesCardList savedMovies />
    <Footer />
  </div>
  );
}

export default SavedMovies;
