
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

interface ItemSearchProps {
  onSearch: (query: string, category: string, condition: string) => void;
}

const ItemSearch: React.FC<ItemSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all-categories');
  const [condition, setCondition] = useState('all-conditions');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, category, condition);
  };

  const categories = [
    "All Categories",
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Sports",
    "Home & Garden",
    "Toys & Games",
    "Other"
  ];

  const conditions = [
    "All Conditions",
    "New",
    "Like New",
    "Good",
    "Fair",
    "Poor"
  ];

  const resetSearch = () => {
    setSearchQuery('');
    setCategory('all-categories');
    setCondition('all-conditions');
    onSearch('', 'all-categories', 'all-conditions');
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger>
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((cond) => (
                <SelectItem key={cond} value={cond.toLowerCase().replace(' ', '-')}>
                  {cond}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" className="whitespace-nowrap">
            Search Items
          </Button>
          <Button type="button" variant="outline" onClick={resetSearch}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ItemSearch;
