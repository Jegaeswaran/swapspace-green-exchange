
// MongoDB User model schema
// This is a demonstration of how the model would be structured

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<IUser | null> {
    console.log(`Simulating MongoDB query: Find user by email ${email}`);
    // In a real app, this would query MongoDB
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

  static async create(userData: Partial<IUser>): Promise<IUser> {
    console.log('Simulating MongoDB query: Create new user', userData);
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
