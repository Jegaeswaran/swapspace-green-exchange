
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ItemProps } from '@/components/items/ItemCard';
import ItemGrid from '@/components/items/ItemGrid';
import NotFound from './NotFound';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ItemProps | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch item details
    const fetchItem = async () => {
      setLoading(true);
      
      // Mock item data - In a real app, this would come from your API
      const mockItems: Record<string, ItemProps> = {
        '1': {
          id: '1',
          title: 'Vintage Record Player',
          description: 'Fully functional vintage record player in excellent condition. Perfect for vinyl enthusiasts. Features three-speed playback (33, 45, and 78 RPM), built-in speakers, and an authentic retro design. The needle was recently replaced and all mechanical components are in working order. Great sound quality for a vintage piece.',
          category: 'Electronics',
          condition: 'Good',
          imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
          location: 'Portland, OR',
          ownerId: 'user1',
          ownerName: 'Alex Johnson'
        },
        '2': {
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
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (id && mockItems[id]) {
        setItem(mockItems[id]);
      }
      
      setLoading(false);
    };
    
    fetchItem();
  }, [id]);
  
  // Mock similar items
  const similarItems: ItemProps[] = [
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
  ];

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-swapspace-green-DEFAULT border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-gray-500">Loading item details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!item) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="mb-6">
          <Link to="/browse" className="text-swapspace-green-DEFAULT hover:underline flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Browse
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item Image */}
          <div>
            <div className="rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <Badge>{item.condition}</Badge>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {item.location}
                </span>
                <span>•</span>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Listed By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-swapspace-green-DEFAULT text-white">
                      {item.ownerName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{item.ownerName}</p>
                    <p className="text-sm text-gray-500">Member since 2023</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Propose a Swap</Button>
              </CardFooter>
            </Card>
            
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Message User
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
                </svg>
                Report Item
              </Button>
            </div>
          </div>
        </div>
        
        {/* Similar Items */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
          <ItemGrid items={similarItems} />
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetails;
