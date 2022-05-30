import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../mainLayout/mainLayout";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const ProtectedRoutes = (props) => {
  const isAuth = useAuth();
  return isAuth ? <MainLayout {...props} /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
