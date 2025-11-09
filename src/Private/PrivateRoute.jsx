import { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;