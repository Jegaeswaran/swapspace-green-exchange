
import React from 'react';
import ItemCard, { ItemProps } from './ItemCard';

interface ItemGridProps {
  items: ItemProps[];
}

const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;
