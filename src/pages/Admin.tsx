
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemProps } from '@/components/items/ItemCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Admin: React.FC = () => {
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 'user1', name: 'Alex Johnson', email: 'alex@example.com', status: 'active', itemsListed: 2, joinDate: '2023-04-15' },
    { id: 'user2', name: 'Jamie Smith', email: 'jamie@example.com', status: 'active', itemsListed: 1, joinDate: '2023-05-20' },
    { id: 'user3', name: 'Morgan Lee', email: 'morgan@example.com', status: 'inactive', itemsListed: 1, joinDate: '2023-06-10' },
    { id: 'user4', name: 'Jordan Wilson', email: 'jordan@example.com', status: 'active', itemsListed: 1, joinDate: '2023-07-05' },
  ]);

  // Mock data for items
  const [items, setItems] = useState<ItemProps[]>([
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
  ]);

  // Mock reported items
  const [reportedItems, setReportedItems] = useState([
    { 
      id: '2', 
      title: 'Mid-Century Modern Sofa',
      ownerName: 'Jamie Smith',
      reason: 'Inaccurate description', 
      reportedBy: 'user3',
      reporterName: 'Morgan Lee',
      date: '2025-04-15',
      status: 'pending'
    }
  ]);

  // Mock data for statistics
  const stats = {
    totalUsers: users.length,
    totalItems: items.length,
    activeSwaps: 2,
    totalSwapsCompleted: 5
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        toast.success(`User status updated to ${newStatus}`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
    toast.success("Item removed successfully");
  };

  const handleResolveReport = (reportId: string) => {
    setReportedItems(reportedItems.filter(report => report.id !== reportId));
    toast.success("Report marked as resolved");
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Listed Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalItems}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Swaps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.activeSwaps}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed Swaps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalSwapsCompleted}</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="reports">Reported Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items Listed</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>{user.itemsListed}</TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Manage Items</CardTitle>
                <CardDescription>View and manage all listed items</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.condition}</TableCell>
                        <TableCell>{item.ownerName}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mr-2"
                          >
                            View
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reported Items</CardTitle>
                <CardDescription>View and resolve reported item issues</CardDescription>
              </CardHeader>
              <CardContent>
                {reportedItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportedItems.map(report => (
                        <TableRow key={report.id}>
                          <TableCell>{report.title}</TableCell>
                          <TableCell>{report.ownerName}</TableCell>
                          <TableCell>{report.reporterName}</TableCell>
                          <TableCell>{report.reason}</TableCell>
                          <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                            >
                              View Item
                            </Button>
                            <Button 
                              variant="default"
                              size="sm" 
                              onClick={() => handleResolveReport(report.id)}
                            >
                              Resolve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p>No reported items at this time.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
