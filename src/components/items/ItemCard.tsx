
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ItemProps {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  imageUrl: string;
  location: string;
  ownerId: string;
  ownerName: string;
}

const ItemCard: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <div className="item-card animate-fade-in">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2 bg-swapspace-green-light">
          {item.condition}
        </Badge>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline">{item.category}</Badge>
          <span className="text-xs text-gray-500">{item.location}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Listed by {item.ownerName}
          </div>
          
          <Button asChild size="sm">
            <Link to={`/items/${item.id}`}>View Item</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
