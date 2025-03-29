import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Receipt } from '../models/receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private apiUrl = `${environment.apiUrl}/receipts`;

  constructor(private http: HttpClient) {}

  getAllReceipts(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(this.apiUrl);
  }

  getReceipt(id: string): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.apiUrl}/${id}`);
  }

  uploadReceipt(file: File): Observable<Receipt> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Receipt>(`${this.apiUrl}/upload`, formData);
  }

  deleteReceipt(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
