import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Route {...rest} element={element} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
