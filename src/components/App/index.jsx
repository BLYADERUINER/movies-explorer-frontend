import { Route, Routes } from "react-router-dom";

import Main from "../Main";
import Movies from "../Movies";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>
  );
}

export default App;
