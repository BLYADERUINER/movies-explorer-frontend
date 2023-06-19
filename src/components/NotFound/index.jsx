import { useNavigate, NavLink } from "react-router-dom";

import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  
  return(
    <div className="notfound">
      <span className="notfound__span">404</span>
      <p className="notfound__text">Страница не найдена</p>
      <NavLink className="notfound__link" to={navigate(-1)}>Назад</NavLink>
    </div>
  );
}

export default NotFound;
