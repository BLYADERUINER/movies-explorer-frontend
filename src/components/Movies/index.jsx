import NavTab from '../NavTab';
import SearchForm from './SearchForm';

import './Movies.css';

function Movies() {
  return(
    <div className='movies'>
      <NavTab logined />
      <SearchForm />
    </div>
  )
}

export default Movies;
