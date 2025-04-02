// ocr-preview-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { OcrResult } from '../../models/receipt';

@Component({
  selector: 'app-ocr-preview-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule
  ],
  templateUrl: './ocr-preview-dialog.component.html',
  styleUrls: ['./ocr-preview-dialog.component.css']
})
export class OcrPreviewDialogComponent {
  editedItems: any[];
  showRawText = false;
  confidence: number;

  constructor(
    public dialogRef: MatDialogRef<OcrPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      image: string, 
      ocrResult: {
        storeName: string;
        purchaseDate: Date;
        totalAmount: number;
        items: any[];
        rawText: string;
        confidence: number;
      } 
    }
  ) {
    this.editedItems = [...data.ocrResult.items];
    this.confidence = data.ocrResult.confidence;
  }

  onSave(): void {
    this.dialogRef.close('upload');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addItem(): void {
    this.editedItems.push({
      name: '',
      quantity: 1,
      unit: 'pcs'
    });
  }

  removeItem(index: number): void {
    this.editedItems.splice(index, 1);
  }

  trackByIndex(index: number): number {
    return index;
  }

  getConfidenceColor(): string {
    if (this.confidence > 80) return 'green';
    if (this.confidence > 60) return 'orange';
    return 'red';
  }
}