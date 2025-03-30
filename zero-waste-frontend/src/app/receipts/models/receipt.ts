import { GroceryItem } from '../../groceries/models/grocery-item';

export interface Receipt {
    id: string;
    imagePath: string;
    userId: string;
    items: GroceryItem[];
    createdAt: Date;
}