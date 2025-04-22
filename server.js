
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// Mock database
let items = [
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
  }
  // Add more items if needed
];

app.use(cors());
app.use(express.json());

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// Create new item
app.post('/api/items', (req, res) => {
  const { title, description, category, condition, imageUrl, location, ownerId, ownerName } = req.body;
  const newItem = {
    id: (Math.random() * 1e16).toString(36),
    title,
    description,
    category,
    condition,
    imageUrl,
    location,
    ownerId,
    ownerName,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Health check
app.get('/', (req, res) => res.send('API running!'));

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
