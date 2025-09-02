'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  const login = () => {
    signIn('google');
  };

  const logout = () => {
    signOut();
  };

  return {
    currentUser: session?.user?.name || session?.user?.email || null,
    user: session?.user || null,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout
  };
}