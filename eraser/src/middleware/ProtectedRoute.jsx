import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated,user }) => {
  console.log(isAuthenticated);
  if (!isAuthenticated && !user) {
    return <Navigate to={"/login"} replace={true} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
