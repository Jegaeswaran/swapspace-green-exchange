
// Item service to handle business logic
import { ItemModel, IItem } from '../models/Item';

export const itemService = {
  getAllItems: async (): Promise<IItem[]> => {
    return await ItemModel.findAll();
  },
  
  getItemById: async (id: string): Promise<IItem | null> => {
    return await ItemModel.findById(id);
  },
  
  createItem: async (itemData: Partial<IItem>): Promise<IItem> => {
    return await ItemModel.create(itemData);
  }
};
