
// MongoDB Item model schema
// This is a demonstration of how the model would be structured

export interface IItem {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  imageUrl: string;
  location: string;
  ownerId: string;
  ownerName: string;
  createdAt: Date;
  updatedAt: Date;
}

// In a real Node.js backend with Mongoose, you would define a schema:
/*
const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true }
}, { timestamps: true });

export const Item = mongoose.model('Item', ItemSchema);
*/

// Helper function to validate image URLs
const validateImageUrl = (url: string): string => {
  if (!url) return '';
  
  // If it's already a full URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // For Unsplash placeholder format
  if (url.startsWith('photo-')) {
    return `https://images.unsplash.com/${url}`;
  }
  
  // Return as-is if none of the conditions match
  return url;
};

// For demonstration in Lovable:
export class ItemModel {
  static async findAll(): Promise<IItem[]> {
    console.log('Simulating MongoDB query: Find all items');
    // Mock data similar to what's in your Index.tsx
    return [
      {
        id: '1',
        title: 'Vintage Record Player',
        description: 'Fully functional vintage record player in excellent condition. Perfect for vinyl enthusiasts.',
        category: 'Electronics',
        condition: 'Good',
        imageUrl: validateImageUrl('photo-1618160702438-9b02ab6515c9'),
        location: 'Portland, OR',
        ownerId: 'user1',
        ownerName: 'Alex Johnson',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Mid-Century Modern Sofa',
        description: 'Beautiful 3-seater sofa in teal blue. Minimal wear and very comfortable.',
        category: 'Furniture',
        condition: 'Like New',
        imageUrl: validateImageUrl('photo-1581091226825-a6a2a5aee158'),
        location: 'Seattle, WA',
        ownerId: 'user2',
        ownerName: 'Jamie Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'Professional Camera Kit',
        description: 'DSLR camera with multiple lenses and accessories. Perfect for photography enthusiasts.',
        category: 'Electronics',
        condition: 'Excellent',
        imageUrl: validateImageUrl('photo-1488590528505-98d2b5aba04b'),
        location: 'New York, NY',
        ownerId: 'user3',
        ownerName: 'Chris Wilson',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        title: 'Mountain Bike',
        description: 'High-quality mountain bike, barely used. Great for trails and outdoor adventures.',
        category: 'Sports',
        condition: 'Like New',
        imageUrl: validateImageUrl('photo-1649972904349-6e44c42644a7'),
        location: 'Denver, CO',
        ownerId: 'user4',
        ownerName: 'Taylor Brown',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // More items would be here from actual database
    ];
  }

  static async findById(id: string): Promise<IItem | null> {
    console.log(`Simulating MongoDB query: Find item by id ${id}`);
    const items = await this.findAll();
    return items.find(item => item.id === id) || null;
  }

  static async create(itemData: Partial<IItem>): Promise<IItem> {
    console.log('Simulating MongoDB query: Create new item', itemData);
    
    // Validate the image URL if provided
    const imageUrl = itemData.imageUrl ? validateImageUrl(itemData.imageUrl) : '';
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      title: itemData.title || '',
      description: itemData.description || '',
      category: itemData.category || '',
      condition: itemData.condition || '',
      imageUrl: imageUrl,
      location: itemData.location || '',
      ownerId: itemData.ownerId || '',
      ownerName: itemData.ownerName || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
