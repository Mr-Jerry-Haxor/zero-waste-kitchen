export interface GroceryItem {
  id: number;
  user_id: number;
  name: string;
  quantity: number;
  unit: string;
  barcode?: string;
  batch_number?: string;
  manufacture_date?: string;
  expiry_date?: string;
  description?: string; 
  storage_location: string;
  created_at: string;
  updated_at: string;
}