// grocery-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { GroceryService } from '../../services/grocery.service';
import { GroceryItem } from '../../models/grocery-item';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { GroceryEditDialogComponent } from '../grocery-edit-dialog/grocery-edit-dialog.component';

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule, // Add this for mat-icon
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  groceries: GroceryItem[] = [];
  filteredGroceries: GroceryItem[] = [];
  loading = true;
  searchTerm = '';
  error: string | null = null;

  constructor(
    private groceryService: GroceryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadGroceries();
  }

  loadGroceries(): void {
    this.loading = true;
    this.error = null;

    this.groceryService.getAllGroceries().subscribe({
      next: (groceries) => {
        this.groceries = groceries;
        this.filteredGroceries = [...groceries];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load groceries. Please try again later.';
        console.error('Failed to load groceries:', err);
      }
    });
  }

  filterGroceries(): void {
    if (!this.searchTerm.trim()) {
      this.filteredGroceries = [...this.groceries];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredGroceries = this.groceries.filter((grocery) =>
      grocery.name.toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(GroceryEditDialogComponent, {
      width: '400px',
      data: { grocery: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGroceries();
        this.snackBar.open('Grocery item added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  openEditDialog(grocery: GroceryItem): void {
    const dialogRef = this.dialog.open(GroceryEditDialogComponent, {
      width: '400px',
      data: { grocery }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGroceries();
        this.snackBar.open('Grocery item updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  deleteGrocery(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Grocery',
        message: 'Are you sure you want to delete this grocery item? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.groceryService.deleteGrocery(id.toString()).subscribe({
          next: () => {
            this.groceries = this.groceries.filter((grocery) => grocery.id !== id);
            this.filterGroceries();
            this.snackBar.open('Grocery item deleted successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          },
          error: (err) => {
            console.error('Failed to delete grocery:', err);
            this.snackBar.open('Failed to delete grocery item. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  isExpired(expiryDate: string | undefined): boolean {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  }
}