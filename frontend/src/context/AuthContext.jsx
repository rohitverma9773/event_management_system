import { createContext, useContext, useEffect, useState } from 'react';
import { api, setAuthToken } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t) setAuthToken(t);
    return t && u ? { token: t, user: JSON.parse(u) } : { token: null, user: null };
  });

  useEffect(() => {
    if (auth.token) setAuthToken(auth.token);
  }, [auth.token]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, user: null });
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
