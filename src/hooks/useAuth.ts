
import { useState, useEffect } from 'react';
import { authService } from '@/backend/services/authService';
import { IUser } from '@/backend/models/User';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('swapspace_user');
    const storedToken = localStorage.getItem('swapspace_token');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        setAuth({
          user,
          token: storedToken,
          isAuthenticated: true
        });
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        // Clear invalid data
        localStorage.removeItem('swapspace_user');
        localStorage.removeItem('swapspace_token');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(email, password);
      
      if (!result) {
        setError('Invalid email or password');
        setLoading(false);
        return false;
      }
      
      const { user, token } = result;
      
      // Save to localStorage
      localStorage.setItem('swapspace_user', JSON.stringify(user));
      localStorage.setItem('swapspace_token', token);
      
      setAuth({
        user,
        token,
        isAuthenticated: true
      });
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string, location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.register({
        name,
        email,
        password,
        location
      });
      
      if (!result) {
        setError('User with this email already exists');
        setLoading(false);
        return false;
      }
      
      const { user, token } = result;
      
      // Save to localStorage
      localStorage.setItem('swapspace_user', JSON.stringify(user));
      localStorage.setItem('swapspace_token', token);
      
      setAuth({
        user,
        token,
        isAuthenticated: true
      });
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('swapspace_user');
    localStorage.removeItem('swapspace_token');
    
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false
    });
  };

  return { 
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    login,
    register,
    logout,
    loading,
    error
  };
};
