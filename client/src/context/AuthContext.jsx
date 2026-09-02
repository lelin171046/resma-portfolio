import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setAdmin(res.data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setAdmin(res.data.admin);
    return res.data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setAdmin(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    await axios.post('/api/auth/change-password', { currentPassword, newPassword });
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, changePassword, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}