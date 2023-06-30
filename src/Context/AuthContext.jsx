import React, { createContext, useState, useEffect } from "react";
import { api } from '../service/api';
import history from '../service/history';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin() {
    try {
      const response = await api.post('/login');
      const { token } = response.data;

      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    setAuthenticated(false);
    history.push('/login');
  }

  if (loading) {
    return <h1>Carregando...</h1>
  }

  return (
    <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
