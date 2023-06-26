import React, { createContext, useState, useEffect } from "react";
import { api } from '../service/api';
import history from '../service/history'
const Context = createContext();

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
  }, [])

  async function handleLogin() {
    const { data: { token } } = await api.post('/authenticated');

    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push('/painel-admin');
  }

  if (loading) {
    return <h1>Carregando...</h1>
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };