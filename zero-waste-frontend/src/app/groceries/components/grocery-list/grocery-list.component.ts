import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../../services/grocery.service';
import { GroceryItem } from '../../models/grocery-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  groceries: GroceryItem[] = [];
  filteredGroceries: GroceryItem[] = [];
  searchTerm = '';
  loading = true;

  constructor(
    private groceryService: GroceryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroceries();
  }

  loadGroceries(): void {
    this.groceryService.getAllGroceries().subscribe({
      next: (groceries) => {
        this.groceries = groceries;
        this.filteredGroceries = groceries;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterGroceries(): void {
    if (!this.searchTerm) {
      this.filteredGroceries = this.groceries;
      return;
    }
    this.filteredGroceries = this.groceries.filter(grocery =>
      grocery.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewDetails(id: string): void {
    this.router.navigate(['/groceries', id]);
  }

  deleteGrocery(id: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.groceryService.deleteGrocery(id).subscribe(() => {
        this.loadGroceries();
      });
    }
  }
}