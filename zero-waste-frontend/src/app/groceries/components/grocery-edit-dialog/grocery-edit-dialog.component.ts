import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroceryService } from '../../services/grocery.service';
import { GroceryItem } from '../../models/grocery-item.model';

@Component({
  selector: 'app-grocery-edit-dialog',
  templateUrl: './grocery-edit-dialog.component.html',
  styleUrls: ['./grocery-edit-dialog.component.css']
})
export class GroceryEditDialogComponent {
  groceryForm = this.fb.group({
    name: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(0.1)]],
    unit: [''],
    expiryDate: ['', Validators.required],
    storageLocation: ['fridge', Validators.required]
  });

  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private groceryService: GroceryService,
    private dialogRef: MatDialogRef<GroceryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grocery?: GroceryItem }
  ) {
    if (data?.grocery) {
      this.isEdit = true;
      this.groceryForm.patchValue({
        ...data.grocery,
        expiryDate: new Date(data.grocery.expiryDate).toISOString().split('T')[0]
      });
    }
  }

  onSubmit(): void {
    if (this.groceryForm.valid) {
      this.loading = true;
      const formValue = this.groceryForm.value;
      const groceryData = {
        ...formValue,
        expiryDate: new Date(formValue.expiryDate!)
      };

      const operation = this.isEdit
        ? this.groceryService.updateGrocery(this.data.grocery!.id, groceryData)
        : this.groceryService.createGrocery(groceryData);

      operation.subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}