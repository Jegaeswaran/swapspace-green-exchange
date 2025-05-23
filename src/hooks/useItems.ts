
import { useState, useEffect } from 'react';
import { ItemProps } from '@/components/items/ItemCard';
import { itemService } from '@/backend/services/itemService';

export const useItems = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const fetchedItems = await itemService.getAllItems();
      setItems(fetchedItems);
      setError(null);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const searchItems = async (query: string, category: string, condition: string) => {
    setLoading(true);
    try {
      const searchResults = await itemService.searchItems(query, category, condition);
      setItems(searchResults);
      setError(null);
      return searchResults;
    } catch (err) {
      console.error('Error searching items:', err);
      setError('Failed to search items. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, refetch: fetchItems, searchItems };
};
