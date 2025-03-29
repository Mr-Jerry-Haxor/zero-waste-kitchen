import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryService } from '../../services/grocery.service';
import { GroceryItem } from '../../models/grocery-item.model';

@Component({
  selector: 'app-grocery-detail',
  templateUrl: './grocery-detail.component.html',
  styleUrls: ['./grocery-detail.component.css']
})
export class GroceryDetailComponent implements OnInit {
  grocery: GroceryItem | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groceryService: GroceryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.groceryService.getGrocery(id).subscribe({
        next: (grocery) => {
          this.grocery = grocery;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error || 'Failed to load grocery item';
          this.loading = false;
        }
      });
    } else {
      this.router.navigate(['/groceries']);
    }
  }

  deleteGrocery(): void {
    if (this.grocery && confirm('Are you sure you want to delete this item?')) {
      this.groceryService.deleteGrocery(this.grocery.id).subscribe({
        next: () => {
          this.router.navigate(['/groceries']);
        },
        error: (err) => {
          this.error = err.error || 'Failed to delete grocery item';
        }
      });
    }
  }
}