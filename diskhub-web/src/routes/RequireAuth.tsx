import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { AppBootstrap } from '../components/common/AppBootstrap';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuth = authService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppBootstrap>{children}</AppBootstrap>;
}

