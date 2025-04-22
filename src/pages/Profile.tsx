
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemGrid from '@/components/items/ItemGrid';
import { ItemProps } from '@/components/items/ItemCard';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    id: 'user1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@example.com',
    location: 'Portland, OR',
    bio: 'I love finding new homes for items I no longer use. Passionate about sustainability and reducing waste.',
    avatarUrl: '' // No avatar yet
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...user });

  // Mock item data
  const userItems: ItemProps[] = [
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
      id: '5',
      title: 'Digital SLR Camera',
      description: 'Canon EOS Rebel T7 with 18-55mm lens. Lightly used with all accessories.',
      category: 'Electronics',
      condition: 'Like New',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      location: 'Portland, OR',
      ownerId: 'user1',
      ownerName: 'Alex Johnson'
    }
  ];

  // Mock completed swaps data
  const completedSwaps: ItemProps[] = [
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
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(editFormData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Profile info */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback className="bg-swapspace-green-DEFAULT text-white text-2xl">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                    <CardDescription>{user.location}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-1">About me</h3>
                      <p>{user.bio}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-1">Email</h3>
                      <p>{user.email}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-1">Location</h3>
                      <p>{user.location}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-1">Member since</h3>
                      <p>April 2023</p>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={editFormData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={editFormData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={editFormData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">About Me</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={editFormData.bio}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSubmit}>Save Changes</Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditFormData({ ...user });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
          
          {/* Right column - Items and Swaps */}
          <div className="md:w-2/3">
            <Tabs defaultValue="listings">
              <TabsList className="mb-4">
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="completed">Completed Swaps</TabsTrigger>
                <TabsTrigger value="pending">Pending Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="listings">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">My Listed Items</h2>
                  <Button>+ Add New Item</Button>
                </div>
                {userItems.length > 0 ? (
                  <ItemGrid items={userItems} />
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p className="mb-4">You haven't listed any items yet.</p>
                      <Button>List Your First Item</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                <h2 className="text-xl font-semibold mb-4">Completed Swaps</h2>
                {completedSwaps.length > 0 ? (
                  <ItemGrid items={completedSwaps} />
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p>You haven't completed any swaps yet.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="pending">
                <h2 className="text-xl font-semibold mb-4">Pending Swap Requests</h2>
                <Card>
                  <CardContent className="text-center py-12">
                    <p>You don't have any pending swap requests.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
