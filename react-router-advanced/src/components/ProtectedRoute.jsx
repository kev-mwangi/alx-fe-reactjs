import React from 'react';
import { Navigate } from 'react-router-dom';


const useAuth = () => {
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  
  return {
    isAuthenticated,
    user,
    login: (userData) => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout: () => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  };
};

function ProtectedRoute({ children, requireAdmin = false }) {
  const auth = useAuth();
  
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  
  if (requireAdmin && (!auth.user || auth.user.role !== 'admin')) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  
  return children;
}

export default ProtectedRoute;
export { useAuth }; 