
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/swapspace';

app.use(cors());
app.use(express.json());

// --- Mongoose Models ---

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // NOTE: Store hashed passwords in production!
  location: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  condition: String,
  imageUrl: String,
  location: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownerName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// --- MongoDB Connection ---
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("MongoDB connection error:", err));

// --- Helper Functions ---
const validateImageUrl = (url) => {
  if (!url) return null;
  
  // If it's already a full URL (starts with http:// or https://)
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

// --- API Routes ---

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().populate('ownerId', 'name');
    
    // Format the items to ensure proper image URLs
    const formattedItems = items.map(item => {
      const formattedItem = item.toObject();
      formattedItem.imageUrl = validateImageUrl(formattedItem.imageUrl);
      return formattedItem;
    });
    
    res.json(formattedItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items." });
  }
});

// Get item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('ownerId', 'name');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    
    const formattedItem = item.toObject();
    formattedItem.imageUrl = validateImageUrl(formattedItem.imageUrl);
    
    res.json(formattedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch item." });
  }
});

// Create new item
app.post('/api/items', async (req, res) => {
  try {
    const { title, description, category, condition, imageUrl, location, ownerId, ownerName } = req.body;
    
    const validatedImageUrl = validateImageUrl(imageUrl);
    
    const newItem = new Item({
      title,
      description,
      category,
      condition,
      imageUrl: validatedImageUrl,
      location,
      ownerId,
      ownerName
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create item.', details: err.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// Register new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "User with this email already exists." });
    }
    const newUser = new User({ name, email, password, location });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user.', details: err.message });
  }
});

// Health check
app.get('/', (req, res) => res.send('API running and connected to MongoDB!'));

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
