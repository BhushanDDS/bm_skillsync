// src/contexts/UserContext.jsx
import { createContext, useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getMe,
    retry: false,
    onSuccess: (res) => {
      setUser(res.data);
    },
    onError: () => {
      setUser(null);
    },
  });

  // Register
  const registerMutation = useMutation({
    mutationFn: authApi.register,
  });

  // Login
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      const user = res.data.user;
      console.log(user);
      
      setUser(user);
      queryClient.setQueryData(['user'], user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Logout
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear ALL application state
      queryClient.clear();
      setUser(null);
      
      // Cancel pending requests
      const controller = new AbortController();
      controller.abort();
      
      // Force full page reload to reset axios state
      window.location.href = '/login';
    }
  });

  const register = (formData) => registerMutation.mutateAsync(formData);
  const login = (credentials) => loginMutation.mutateAsync(credentials);
  const logout = () => logoutMutation.mutateAsync();

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        isLoggedIn: !!user,
        debugInfo: { user, isLoading },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
