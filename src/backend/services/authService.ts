
// Authentication service
import { UserModel, IUser } from '../models/User';

export const authService = {
  login: async (email: string, password: string): Promise<{user: IUser, token: string} | null> => {
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
  },
  
  register: async (userData: Partial<IUser>): Promise<{user: IUser, token: string} | null> => {
    // Check if user already exists
    if (userData.email) {
      const existingUser = await UserModel.findByEmail(userData.email);
      if (existingUser) {
        return null; // User already exists
      }
    }
    
    // Create new user
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
  }
};
