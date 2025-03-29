import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { Receipt } from '../../models/receipt.model';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.css']
})
export class ReceiptDetailComponent implements OnInit {
  receipt: Receipt | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receiptService: ReceiptService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.receiptService.getReceipt(id).subscribe({
        next: (receipt) => {
          this.receipt = receipt;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error || 'Failed to load receipt';
          this.loading = false;
        }
      });
    } else {
      this.router.navigate(['/receipts']);
    }
  }
}