import NavTab from '../NavTab';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from '../Footer';

import './Movies.css';

function Movies({
  moviesData,
  saveMovie,
  savedMoviesData,
  foundMoviesData,
  handleFoundMoviesData,
  searchInputValue,
  searchCheckboxValue,
  handleSearchInputValue,
  handleSearchCheckboxValue,
  handleDeleteMovie,
  resultSearch,
  setResultSearch,
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
        setResultSearch={setResultSearch}
      />
      <MoviesCardList
        movies={foundMoviesData}
        savedMovies={savedMoviesData}
        saveMovie={saveMovie}
        deleteMovie={handleDeleteMovie}
        resultSearch={resultSearch}
      />
      <Footer />
    </div>
  )
}

export default Movies;
