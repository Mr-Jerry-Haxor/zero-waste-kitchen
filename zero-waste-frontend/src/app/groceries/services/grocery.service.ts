import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroceryItem } from '../models/grocery-item.model';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  constructor(private http: HttpClient) { }

  getAllGroceries(): Observable<GroceryItem[]> {
    return this.http.get<GroceryItem[]>(`${environment.apiUrl}/groceries`);
  }

  getGrocery(id: string): Observable<GroceryItem> {
    return this.http.get<GroceryItem>(`${environment.apiUrl}/groceries/${id}`);
  }

  createGrocery(grocery: Omit<GroceryItem, 'id'>): Observable<GroceryItem> {
    return this.http.post<GroceryItem>(`${environment.apiUrl}/groceries`, grocery);
  }

  updateGrocery(id: string, grocery: Partial<GroceryItem>): Observable<GroceryItem> {
    return this.http.put<GroceryItem>(`${environment.apiUrl}/groceries/${id}`, grocery);
  }

  deleteGrocery(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/groceries/${id}`);
  }

  getExpiringGroceries(): Observable<GroceryItem[]> {
    return this.http.get<GroceryItem[]>(`${environment.apiUrl}/groceries/expiring`);
  }
}