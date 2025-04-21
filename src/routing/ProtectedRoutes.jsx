import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.loading) return null;

  if (!auth?.isAuthenticated || !auth?.token) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.loading) return null;

  if (!auth?.isAuthenticated || auth?.role !== "Admin") {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};