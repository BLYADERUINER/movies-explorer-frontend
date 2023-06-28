import NavTab from '../NavTab';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from '../Footer';

import './Movies.css';

function Movies({
  moviesData,
  foundMoviesData,
  handleFoundMoviesData,
  searchInputValue,
  searchCheckboxValue,
  handleSearchInputValue,
  handleSearchCheckboxValue,
  saveMovie,
}) {
  return(
    <div className='movies'>
      <NavTab logined />
      <SearchForm
        movies={moviesData}
        inputValue={searchInputValue}
        checkboxValue={searchCheckboxValue}
        handleFoundMoviesData={handleFoundMoviesData}
        handleSearchInputValue={handleSearchInputValue}
        handleSearchCheckboxValue={handleSearchCheckboxValue}
      />
      <MoviesCardList
        foundMovies={foundMoviesData}
        saveMovie={saveMovie}
      />
      <Footer />
    </div>
  )
}

export default Movies;
