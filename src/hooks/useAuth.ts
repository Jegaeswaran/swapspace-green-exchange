
import { useState, useEffect } from 'react';
import { authService } from '@/backend/services/authService';
import { IUser } from '@/backend/models/User';
import { toast } from 'sonner';

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
        console.log('User restored from localStorage:', user.name);
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
      
      toast.success(`Welcome back, ${user.name}!`);
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      
      // Using mock user for demonstration
      const mockUser = {
        id: 'user1',
        name: 'Demo User',
        email,
        password: '***hidden***',
        location: 'Portland, OR',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const mockToken = `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`;
      
      // Save mock data to localStorage
      localStorage.setItem('swapspace_user', JSON.stringify(mockUser));
      localStorage.setItem('swapspace_token', mockToken);
      
      setAuth({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true
      });
      
      toast.success(`Welcome, ${mockUser.name}! (Demo Mode)`);
      
      setLoading(false);
      return true;
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
      
      toast.success(`Welcome to SwapSpace, ${name}!`);
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      
      // Create mock user for demonstration
      const mockUser = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        password: '***hidden***',
        location,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const mockToken = `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`;
      
      // Save mock data to localStorage
      localStorage.setItem('swapspace_user', JSON.stringify(mockUser));
      localStorage.setItem('swapspace_token', mockToken);
      
      setAuth({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true
      });
      
      toast.success(`Welcome to SwapSpace, ${name}! (Demo Mode)`);
      
      setLoading(false);
      return true;
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
    
    toast.success('You have been logged out');
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
