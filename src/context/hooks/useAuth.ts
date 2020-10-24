import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.post('/api/refresh_token').then(async req => {
      const accessToken = await req.data.access_token;
      axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
    }).finally(() => {
      setLoading(false);
    });
  }, [isAuthenticated]);
  
  function handleLogin(didAuthenticate: boolean) {
    setIsAuthenticated(didAuthenticate);
  }

  async function handleLogout() {
    await axios.post('/logout');
    setIsAuthenticated(false);
  }

  return { isAuthenticated, loading, handleLogin, handleLogout }
}
