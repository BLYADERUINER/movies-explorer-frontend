import { Route, Routes } from "react-router-dom";

import Main from "../Main";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/saved-movies" element={<SavedMovies />} />
    </Routes>
  );
}

export default App;
