import { Navigate } from 'react-router-dom';

function ProtectedRouteElement({loggedIn, children}) {
  return (
    loggedIn ? children : <Navigate to="/signin" replace />
  );
}

export default ProtectedRouteElement;
