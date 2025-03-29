export interface GroceryItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    expiryDate: Date;
    storageLocation: 'fridge' | 'pantry' | 'freezer';
    receiptId?: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }