import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function RequireAuth({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return <h3>Checking user...</h3>;
  }

  if (user === false) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
