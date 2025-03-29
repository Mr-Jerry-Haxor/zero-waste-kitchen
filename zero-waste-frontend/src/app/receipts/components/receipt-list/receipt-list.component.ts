import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../../services/receipt.service';
import { Receipt } from '../../models/receipt.model';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {
  receipts: Receipt[] = [];
  loading = true;

  constructor(private receiptService: ReceiptService) {}

  ngOnInit(): void {
    this.loadReceipts();
  }

  loadReceipts(): void {
    this.receiptService.getAllReceipts().subscribe({
      next: (receipts) => {
        this.receipts = receipts;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getTotalItems(receipt: Receipt): number {
    return receipt.items?.length || 0;
  }

  getTotalAmount(receipt: Receipt): number {
    return receipt.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
  }
}