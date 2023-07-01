import NavTab from '../NavTab';
import SearchForm from '../Movies/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList';
import Footer from '../Footer';

import './SavedMovies.css';
import { useState } from 'react';

function SavedMovies({
  moviesData,
  handleFoundMoviesData,
  handleDeleteMovie,
  resultSearch,
  setResultSearch,
  filteredFavoriteMovies,
  searchSavedMovies,
  setSearchSavedMovies,
}) {
  const [inputFavorite, setInputFavorite] = useState('');
  const [checkboxFavorite, setCheckboxFavorite] = useState(false);

  return(
    <div className='movies'>
      <NavTab logined />
      <SearchForm
        movies={moviesData}
        inputValue={inputFavorite}
        checkboxValue={checkboxFavorite}
        handleFoundMoviesData={handleFoundMoviesData}
        handleSearchInputValue={setInputFavorite}
        handleSearchCheckboxValue={setCheckboxFavorite}
        setResultSearch={setResultSearch}
        setSearchSavedMovies={setSearchSavedMovies}
      />
      <MoviesCardList
        movies={moviesData}
        filteredFavoriteMovies={filteredFavoriteMovies}
        deleteMovie={handleDeleteMovie}
        resultSearch={resultSearch}
        searchSavedMovies={searchSavedMovies}
      />
      <Footer />
    </div>
  );
}

export default SavedMovies;
