
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ItemGrid from '@/components/items/ItemGrid';
import ItemSearch from '@/components/items/ItemSearch';
import { useItems } from '@/hooks/useItems';
import { ItemProps } from '@/components/items/ItemCard';

const Browse: React.FC = () => {
  const { items, loading, error } = useItems();
  const [filteredItems, setFilteredItems] = useState<ItemProps[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleSearch = (query: string, category: string, condition: string) => {
    const searchQuery = query.toLowerCase();
    const categoryFilter = category.toLowerCase().replace('all-categories', '');
    const conditionFilter = condition.toLowerCase().replace('all-conditions', '');
    
    const filtered = items.filter(item => {
      const matchesQuery = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery);
        
      const matchesCategory = !categoryFilter || 
        item.category.toLowerCase().includes(categoryFilter);
        
      const matchesCondition = !conditionFilter || 
        item.condition.toLowerCase().includes(conditionFilter);
        
      return matchesQuery && matchesCategory && matchesCondition;
    });
    
    setFilteredItems(filtered);
    setIsFiltered(true);
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tighter mb-6">Browse Items</h1>
        
        <div className="mb-8">
          <ItemSearch onSearch={handleSearch} />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-lg">Loading items...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (isFiltered && filteredItems.length === 0) ? (
          <div className="bg-amber-50 p-6 rounded-md text-center">
            <h3 className="text-lg font-semibold mb-2">No items found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <ItemGrid items={isFiltered ? filteredItems : items} />
        )}
      </div>
    </Layout>
  );
};

export default Browse;
