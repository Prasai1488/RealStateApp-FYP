// src/components/ProtectedRoute/ProtectedRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children, username }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || (username && currentUser.username !== username)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
