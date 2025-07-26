import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data (useful for initial load or refresh)
  const fetchUser = async () => {
    try {
      const response = await api.get('/user/me'); // You'll need to create this endpoint
      setUser(response.data.user);
      console.log(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check for user on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Clear cookie or call logout endpoint
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      loading,
      fetchUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};