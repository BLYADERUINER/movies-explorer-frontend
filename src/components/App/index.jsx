import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { moviesApi } from "../../utils/api";

import Main from "../Main";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import Profile from "../Profile";
import Register from "../AuthReg/Register";
import Login from "../AuthReg/Login";
import NotFound from "../NotFound"; 

import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesApi.getMovies()
    .then((moviesData) => {
      setMovies(moviesData);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={<Movies moviesData={movies} />} />
      <Route path="/saved-movies" element={<SavedMovies />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
