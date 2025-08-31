'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('detective_user');
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
    localStorage.setItem('detective_user', username);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('detective_user');
  };

  return {
    currentUser,
    isAuthenticated,
    login,
    logout
  };
}