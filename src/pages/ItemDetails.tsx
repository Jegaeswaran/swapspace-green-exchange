
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { itemService } from '@/backend/services/itemService';
import { IItem } from '@/backend/models/Item';
import { useAuth } from '@/hooks/useAuth';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError('Item ID is missing');
        setLoading(false);
        return;
      }
      
      try {
        const fetchedItem = await itemService.getItemById(id);
        if (fetchedItem) {
          setItem(fetchedItem);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        console.error('Error fetching item details:', err);
        setError('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg">Loading item details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !item) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 py-8">
          <Card className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="mb-6">{error || 'Item not found'}</p>
            <Button asChild>
              <Link to="/browse">Back to Browse</Link>
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item Image */}
          <div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-auto object-cover" 
              />
            </div>
          </div>
          
          {/* Item Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{item.title}</h1>
              <Badge>{item.condition}</Badge>
            </div>
            
            <div className="flex items-center text-gray-500 mb-6">
              <span>{item.location}</span>
              <span className="mx-2">•</span>
              <span>Listed by {item.ownerName}</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{item.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Details</h2>
              <div className="grid grid-cols-2 gap-y-2">
                <span className="text-gray-500">Category:</span>
                <span>{item.category}</span>
                <span className="text-gray-500">Condition:</span>
                <span>{item.condition}</span>
              </div>
            </div>
            
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <Button className="w-full">
                  Propose a Swap
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Owner
                </Button>
              </div>
            ) : (
              <div className="bg-amber-50 p-4 rounded-md text-center mb-6">
                <p className="mb-4">You need to be logged in to propose a swap</p>
                <div className="flex gap-4 justify-center">
                  <Button asChild size="sm">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetails;
