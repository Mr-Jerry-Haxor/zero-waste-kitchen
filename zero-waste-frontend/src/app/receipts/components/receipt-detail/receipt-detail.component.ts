import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { Receipt } from '../../models/receipt';

@Component({
  selector: 'app-receipt-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.css']
})
export class ReceiptDetailComponent implements OnInit {
  loading = true;
  error = '';
  receipt: Receipt | null = null;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private receiptService: ReceiptService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/receipts']);
      return;
    }

    this.receiptService.getReceipt(id).subscribe({
      next: (receipt) => {
        this.receipt = receipt;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load receipt';
        this.loading = false;
      }
    });
  }
}