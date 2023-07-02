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
  shortFoundMovies,
  handleFoundMoviesData,
  searchInputValue,
  searchCheckboxValue,
  handleSearchInputValue,
  handleSearchCheckboxValue,
  handleShortFoundMovies,
  handleDeleteMovie,
  resultSearch,
  setResultSearch,
}) {
  return(
    <div className='movies'>
      <NavTab logined />
      <SearchForm
        movies={moviesData}
        foundMoviesData={foundMoviesData}
        shortFoundMovies={shortFoundMovies}
        inputValue={searchInputValue}
        checkboxValue={searchCheckboxValue}
        handleFoundMoviesData={handleFoundMoviesData}
        handleSearchInputValue={handleSearchInputValue}
        handleSearchCheckboxValue={handleSearchCheckboxValue}
        handleShortFoundMovies={handleShortFoundMovies}
        setResultSearch={setResultSearch}
      />
      <MoviesCardList
        movies={foundMoviesData}
        savedMovies={savedMoviesData}
        saveMovie={saveMovie}
        shortFoundMovies={shortFoundMovies}
        deleteMovie={handleDeleteMovie}
        resultSearch={resultSearch}
        checkboxValue={searchCheckboxValue}
        handleFoundMoviesData={handleFoundMoviesData}
      />
      <Footer />
    </div>
  )
}

export default Movies;
