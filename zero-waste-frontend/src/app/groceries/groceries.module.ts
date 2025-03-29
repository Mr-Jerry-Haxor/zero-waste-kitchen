import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { GroceryEditDialogComponent } from './components/grocery-edit-dialog/grocery-edit-dialog.component';
import { GroceryDetailComponent } from './components/grocery-detail/grocery-detail.component';
import { GroceryService } from './services/grocery.service';

@NgModule({
  declarations: [
    GroceryListComponent,
    GroceryEditDialogComponent,
    GroceryDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: GroceryListComponent },
      { path: ':id', component: GroceryDetailComponent }
    ])
  ],
  providers: [GroceryService]
})
export class GroceriesModule { }