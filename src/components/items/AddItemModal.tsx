
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { itemService } from '@/backend/services/itemService';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onItemCreated: () => void;
  // Add optional props for Profile.tsx usage
  ownerId?: string;
  ownerName?: string;
  location?: string;
}

const initialForm = {
  title: '',
  description: '',
  category: '',
  condition: '',
  imageUrl: '',
};

const categories = [
  "Electronics", "Furniture", "Clothing", "Books", "Sports", "Home & Garden", "Toys & Games", "Other"
];

const conditions = [
  "New", "Like New", "Good", "Fair", "Poor"
];

const AddItemModal: React.FC<AddItemModalProps> = ({ 
  open, 
  onClose, 
  onItemCreated,
  ownerId,
  ownerName,
  location
}) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("You need to be logged in to add items");
      onClose();
      navigate('/login');
      return;
    }
    
    setLoading(true);

    try {
      // First try the API call
      let success = false;
      try {
        const response = await fetch("http://localhost:4000/api/items", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            ownerId: ownerId || user?.id || 'anonymous',
            ownerName: ownerName || user?.name || 'Anonymous User',
            location: location || user?.location || 'Unknown Location',
          })
        });
        
        if (response.ok) {
          success = true;
        } else {
          console.error("API error:", await response.json());
        }
      } catch (apiErr) {
        console.error("API unavailable:", apiErr);
      }
      
      // If API fails, use our local implementation
      if (!success) {
        // Use our local implementation instead
        await itemService.createItem({
          ...form,
          ownerId: ownerId || user?.id || 'anonymous',
          ownerName: ownerName || user?.name || 'Anonymous User',
          location: location || user?.location || 'Unknown Location',
        });
      }
      
      setForm(initialForm);
      toast.success("Item added successfully!");
      onClose();
      onItemCreated();
    } catch (err: any) {
      console.error("Error adding item:", err);
      toast.error("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={open ? onClose : () => {}}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>Fill in the details of your item to list it for swapping.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required value={form.title} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 rounded border border-gray-300"
              rows={3}
              required
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="category">Category</Label>
              <select name="category" id="category" className="w-full border p-2 rounded" required value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="w-1/2">
              <Label htmlFor="condition">Condition</Label>
              <select name="condition" id="condition" className="w-full border p-2 rounded" required value={form.condition} onChange={handleChange}>
                <option value="">Select Condition</option>
                {conditions.map(con => <option key={con} value={con}>{con}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" placeholder="Paste image URL" value={form.imageUrl} onChange={handleChange} />
            <div className="text-xs text-gray-400 mt-1">Paste a link to an image (e.g. from Unsplash).</div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Item"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;
