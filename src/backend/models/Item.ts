
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
        imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
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
        imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
        location: 'Seattle, WA',
        ownerId: 'user2',
        ownerName: 'Jamie Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
    return {
      id: Math.random().toString(36).substr(2, 9),
      title: itemData.title || '',
      description: itemData.description || '',
      category: itemData.category || '',
      condition: itemData.condition || '',
      imageUrl: itemData.imageUrl || '',
      location: itemData.location || '',
      ownerId: itemData.ownerId || '',
      ownerName: itemData.ownerName || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
