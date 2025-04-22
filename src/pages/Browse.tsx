
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ItemGrid from '@/components/items/ItemGrid';
import ItemSearch from '@/components/items/ItemSearch';
import { ItemProps } from '@/components/items/ItemCard';

const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    category: '',
    condition: ''
  });

  // Mock items data
  const allItems: ItemProps[] = [
    {
      id: '1',
      title: 'Vintage Record Player',
      description: 'Fully functional vintage record player in excellent condition. Perfect for vinyl enthusiasts.',
      category: 'Electronics',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      location: 'Portland, OR',
      ownerId: 'user1',
      ownerName: 'Alex Johnson'
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
      ownerName: 'Jamie Smith'
    },
    {
      id: '3',
      title: 'Camping Tent (4-Person)',
      description: 'Spacious 4-person tent, used twice. Includes rainfly and carry bag.',
      category: 'Sports',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      location: 'Denver, CO',
      ownerId: 'user3',
      ownerName: 'Morgan Lee'
    },
    {
      id: '4',
      title: 'Mountain Bike',
      description: 'Trek mountain bike, 21 speeds. Some scratches but mechanically sound.',
      category: 'Sports',
      condition: 'Fair',
      imageUrl: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
      location: 'Austin, TX',
      ownerId: 'user4',
      ownerName: 'Jordan Wilson'
    },
    {
      id: '5',
      title: 'Digital SLR Camera',
      description: 'Canon EOS Rebel T7 with 18-55mm lens. Lightly used with all accessories.',
      category: 'Electronics',
      condition: 'Like New',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      location: 'Chicago, IL',
      ownerId: 'user5',
      ownerName: 'Casey Brown'
    },
    {
      id: '6',
      title: 'Board Game Collection',
      description: 'Collection of 5 popular strategy games. All complete with all pieces.',
      category: 'Toys & Games',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      location: 'Boston, MA',
      ownerId: 'user6',
      ownerName: 'Taylor Green'
    },
    {
      id: '7',
      title: 'Leather Jacket',
      description: 'Men\'s medium brown leather jacket. Real leather, minimal wear.',
      category: 'Clothing',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
      location: 'Los Angeles, CA',
      ownerId: 'user7',
      ownerName: 'Robin Parker'
    },
    {
      id: '8',
      title: 'Gardening Tools Set',
      description: 'Complete set of gardening tools including shovel, rake, and pruning shears.',
      category: 'Home & Garden',
      condition: 'Fair',
      imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      location: 'Miami, FL',
      ownerId: 'user8',
      ownerName: 'Sam Wilson'
    }
  ];

  // Filter items based on search params
  const filteredItems = allItems.filter(item => {
    const matchesQuery = searchParams.query === '' || 
      item.title.toLowerCase().includes(searchParams.query.toLowerCase()) ||
      item.description.toLowerCase().includes(searchParams.query.toLowerCase());
    
    const matchesCategory = searchParams.category === '' || 
      item.category.toLowerCase() === searchParams.category.toLowerCase();
    
    const matchesCondition = searchParams.condition === '' || 
      item.condition.toLowerCase().replace(' ', '-') === searchParams.condition.toLowerCase();
    
    return matchesQuery && matchesCategory && matchesCondition;
  });

  const handleSearch = (query: string, category: string, condition: string) => {
    setSearchParams({ query, category, condition });
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter mb-4">Browse Items</h1>
          <p className="text-lg text-gray-600">
            Find items to swap from our community members
          </p>
        </div>
        
        <ItemSearch onSearch={handleSearch} />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Available
            </h2>
          </div>
          
          {filteredItems.length > 0 ? (
            <ItemGrid items={filteredItems} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-gray-600">
                Try adjusting your search filters or check back later for new items.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
