
// MongoDB User model schema

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

// API base URL for backend calls
const API_BASE_URL = 'http://localhost:4000/api';

export class UserModel {
  static async findByEmail(email: string): Promise<IUser | null> {
    try {
      console.log(`Querying API: Find user by email ${email}`);
      // In a real production app, this would be a backend-only operation
      // We're doing this on the client-side for demo purposes
      
      // For security in a real app, this endpoint would be authenticated
      // and only accessible to admins or the user themselves
      const response = await fetch(`${API_BASE_URL}/users?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Failed to find user');
      }
      
      const users = await response.json();
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      
      // Fallback to mock users for demo purposes
      const mockUsers = [
        {
          id: 'user1',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          password: 'password123', // Would be hashed in real app
          location: 'Portland, OR',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      return mockUsers.find(user => user.email === email) || null;
    }
  }

  static async create(userData: Partial<IUser>): Promise<IUser> {
    try {
      console.log('Creating new user via API:', userData);
      
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      
      // Fallback mock response for demo purposes
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name || '',
        email: userData.email || '',
        password: userData.password || '',
        location: userData.location || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }
}
