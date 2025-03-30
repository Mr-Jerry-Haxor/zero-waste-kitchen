import { Component } from '@angular/core';
import { ReceiptService } from '../../services/receipt.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipt-upload',
  imports: [CommonModule],
  templateUrl: './receipt-upload.component.html',
  styleUrls: ['./receipt-upload.component.css']
})
export class ReceiptUploadComponent {
  selectedFile: File | null = null;
  uploading = false;
  errorMessage = '';

  constructor(
    private receiptService: ReceiptService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadReceipt(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file';
      return;
    }

    this.uploading = true;
    this.errorMessage = '';

    this.receiptService.uploadReceipt(this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        this.router.navigate(['/receipts']);
      },
      error: (err) => {
        this.uploading = false;
        this.errorMessage = err.error || 'Upload failed';
      }
    });
  }
}



