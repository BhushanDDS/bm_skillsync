// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export const ProtectedRoute = ({ requiredRole, redirectPath = '/login' }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // If a specific role is required and user doesn't have it
  if (requiredRole && !user.role?.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  console.log('User role:', user.role);
  console.log('Required role:', requiredRole);
  console.log('User:', user);
  return <Outlet />;
};