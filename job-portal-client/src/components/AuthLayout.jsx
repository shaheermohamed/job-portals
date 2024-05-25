import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

function AuthLayout() {
  return (
    <div>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default AuthLayout;
