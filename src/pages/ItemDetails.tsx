
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { itemService } from '@/backend/services/itemService';
import { IItem } from '@/backend/models/Item';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [proposingSwap, setProposingSwap] = useState(false);

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

  const handleProposeSwap = async () => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to propose a swap");
      navigate('/login');
      return;
    }

    if (!item) return;

    setProposingSwap(true);
    
    try {
      // In a real app, this would be an API call to create a swap proposal
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("Swap proposal sent! The owner will contact you soon.");
      
      // In a real app, navigate to a swap proposals page
      // For now, we'll just simulate success
    } catch (err) {
      console.error("Error proposing swap:", err);
      toast.error("Failed to send swap proposal. Please try again.");
    } finally {
      setProposingSwap(false);
    }
  };
  
  const handleContactOwner = () => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to contact the owner");
      navigate('/login');
      return;
    }
    
    if (!item) return;
    
    // In a real app, this would open a chat or message form
    toast.success("Message feature coming soon!");
  };

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

  const isOwner = user?.id === item.ownerId;

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
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
                }}
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
              isOwner ? (
                <div className="bg-blue-50 p-4 rounded-md text-center mb-6">
                  <p>This is your item. You can't propose a swap with yourself.</p>
                  <Button className="mt-4" asChild>
                    <Link to="/my-items">Manage My Items</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Button 
                    className="w-full"
                    onClick={handleProposeSwap}
                    disabled={proposingSwap}
                  >
                    {proposingSwap ? "Sending Proposal..." : "Propose a Swap"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleContactOwner}
                  >
                    Contact Owner
                  </Button>
                </div>
              )
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
