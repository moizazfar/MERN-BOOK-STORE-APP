import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AuthenticatedMiddleware = ({ isLoggedIn, role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (role == "ADMIN") navigate("/admin/dashboard");
  }, [role]);

  if (!isLoggedIn) return <Navigate to="/" />;

  return <Outlet />;
};

export default AuthenticatedMiddleware;
