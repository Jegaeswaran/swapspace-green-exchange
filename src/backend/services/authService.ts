
// Authentication service
import { UserModel, IUser } from '../models/User';

// API base URL for backend calls
const API_BASE_URL = 'http://localhost:4000/api';

export const authService = {
  login: async (email: string, password: string): Promise<{user: IUser, token: string} | null> => {
    try {
      console.log('Attempting login via API');
      
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // If API endpoint doesn't exist yet or fails, fall back to the mock implementation
      if (!response.ok) {
        console.log('API login endpoint not available, using mock implementation');
        return await fallbackLogin(email, password);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to mock implementation
      return await fallbackLogin(email, password);
    }
  },
  
  register: async (userData: Partial<IUser>): Promise<{user: IUser, token: string} | null> => {
    try {
      console.log('Registering new user via API');
      
      // First check if user already exists
      if (userData.email) {
        const existingUser = await UserModel.findByEmail(userData.email);
        if (existingUser) {
          console.log('User already exists');
          return null; // User already exists
        }
      }
      
      // Create user in the database via API
      const newUser = await UserModel.create(userData);
      
      // Generate JWT token (simulated)
      const token = `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`;
      
      return { 
        user: {
          ...newUser,
          password: '***hidden***' // Don't return actual password
        }, 
        token 
      };
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }
};

// Fallback login implementation if API is not available
async function fallbackLogin(email: string, password: string): Promise<{user: IUser, token: string} | null> {
  const user = await UserModel.findByEmail(email);
    
  if (!user || user.password !== password) { // In real app, use bcrypt.compare
    return null;
  }
  
  // Generate JWT token (simulated)
  const token = `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`;
  
  return { 
    user: {
      ...user,
      password: '***hidden***' // Don't return actual password
    }, 
    token 
  };
}
