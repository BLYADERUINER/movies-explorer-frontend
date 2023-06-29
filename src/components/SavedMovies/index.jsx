import NavTab from '../NavTab';
import SearchForm from '../Movies/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList';
import Footer from '../Footer';

import './SavedMovies.css';
import { useState } from 'react';

function SavedMovies({ moviesData, handleFoundMoviesData,  handleDeleteMovie }) {
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
      />
      <MoviesCardList
        movies={moviesData}
        deleteMovie={handleDeleteMovie}
      />
      <Footer />
    </div>
  );
}

export default SavedMovies;
