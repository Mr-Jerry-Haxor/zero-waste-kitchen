import { GroceryItem } from '../../groceries/models/grocery-item';

export interface Receipt {
    id: string;
    imagePath: string;
    userId: string;
    items: GroceryItem[];
    createdAt: Date;
    store_name?: string;
    purchase_date?: Date;
    total_amount?: number;
}



export interface OcrResult {
  storeName: string;
  purchaseDate: Date;
  totalAmount: number;
  items: GroceryItem[];
  rawText: string;
  confidence: number;
}