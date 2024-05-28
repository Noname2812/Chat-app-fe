import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { getAuthState } from "../redux/reducers/authReducers";

export function RequireAuth({ children }) {
  const { user } = useAppSelector(getAuthState);
  let location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
