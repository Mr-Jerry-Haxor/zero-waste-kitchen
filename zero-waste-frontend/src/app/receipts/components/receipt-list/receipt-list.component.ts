import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { Receipt } from '../../models/receipt';

@Component({
  selector: 'app-receipt-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {
  receipts: Receipt[] = [];
  loading = true;
  errorMessage = '';

  constructor(private receiptService: ReceiptService) {}

  ngOnInit(): void {
    this.loadReceipts();
  }

  loadReceipts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.receiptService.getAllReceipts().subscribe({
      next: (receipts) => {
        this.receipts = receipts;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to load receipts';
      }
    });
  }
}
