// src/components/ProtectedRoute/ProtectedRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || (role && currentUser.role !== role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
