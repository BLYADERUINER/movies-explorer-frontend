import { Navigate } from 'react-router-dom';

function LogginedProtectedRoute({loggedIn, children}) {
  return (
    loggedIn ? <Navigate to="/movies" replace /> : children
  );
}

export default LogginedProtectedRoute;
