
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

  // For data URLs (base64 images), return as is
  if (url.startsWith('data:image/')) {
    return url;
  }
  
  // Return as-is if none of the conditions match
  return url;
};

// Mock items for local development
const mockItems: IItem[] = [
  {
    id: '1',
    title: 'Vintage Record Player',
    description: 'Fully functional vintage record player in excellent condition. Perfect for vinyl enthusiasts.',
    category: 'Electronics',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d',
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
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
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
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
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
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890',
    location: 'Denver, CO',
    ownerId: 'user4',
    ownerName: 'Taylor Brown',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Local storage for added items during the session
let localItems: IItem[] = [...mockItems];

// For demonstration in Lovable:
export class ItemModel {
  static async findAll(): Promise<IItem[]> {
    console.log('Simulating MongoDB query: Find all items');
    return localItems;
  }

  static async findById(id: string): Promise<IItem | null> {
    console.log(`Simulating MongoDB query: Find item by id ${id}`);
    return localItems.find(item => item.id === id) || null;
  }

  static async create(itemData: Partial<IItem>): Promise<IItem> {
    console.log('Simulating MongoDB query: Create new item', itemData);
    
    // Validate the image URL if provided
    const imageUrl = itemData.imageUrl ? validateImageUrl(itemData.imageUrl) : '';
    
    // Create the new item
    const newItem: IItem = {
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
    
    // Add to local storage
    localItems.push(newItem);
    
    return newItem;
  }

  // Add a search method to filter items
  static async search(query: string, category: string, condition: string): Promise<IItem[]> {
    console.log(`Simulating MongoDB query: Search items with query="${query}", category="${category}", condition="${condition}"`);
    
    return localItems.filter(item => {
      const matchesQuery = !query || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
        
      const matchesCategory = !category || category === 'all-categories' || 
        item.category.toLowerCase() === category.toLowerCase();
        
      const matchesCondition = !condition || condition === 'all-conditions' || 
        item.condition.toLowerCase() === condition.toLowerCase();
        
      return matchesQuery && matchesCategory && matchesCondition;
    });
  }
}
