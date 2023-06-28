import NavTab from '../NavTab';
import SearchForm from '../Movies/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList';
import Footer from '../Footer';

import './SavedMovies.css';

function SavedMovies({ movies, handleDeleteMovie }) {
  return(
    <div className='movies'>
      <NavTab logined />
      <SearchForm />
      <MoviesCardList
        movies={movies}
        deleteMovie={handleDeleteMovie}
      />
      <Footer />
    </div>
  );
}

export default SavedMovies;
