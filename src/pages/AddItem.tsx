
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const categories = [
  "Electronics", "Furniture", "Clothing", "Books", "Sports", "Home & Garden", "Toys & Games", "Other"
];

const conditions = [
  "New", "Like New", "Good", "Fair", "Poor"
];

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    imageUrl: '',
    location: '',
    swapPreference: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For demonstration purposes, we'll use a mock API endpoint
      // In a real app, this would be a server API call
      console.log("Submitted form data:", form);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Item added successfully!");
      navigate('/profile');
    } catch (err: any) {
      toast.error(err.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Add a New Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="What are you offering?"
                  required
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Provide details about your item, such as brand, size, age, etc."
                  required
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    className="w-full p-2 border rounded-md"
                    required
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition *</Label>
                  <select
                    id="condition"
                    name="condition"
                    className="w-full p-2 border rounded-md"
                    required
                    value={form.condition}
                    onChange={handleChange}
                  >
                    <option value="">Select condition</option>
                    {conditions.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Paste an image URL"
                  value={form.imageUrl}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="swapPreference">What are you looking to swap for? (Optional)</Label>
                <textarea
                  id="swapPreference"
                  name="swapPreference"
                  className="w-full min-h-[80px] p-3 border rounded-md"
                  placeholder="Describe what you're interested in receiving in return"
                  value={form.swapPreference}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Item"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddItem;
