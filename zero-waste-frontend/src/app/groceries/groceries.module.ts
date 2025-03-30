import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { AuthGuard } from '../core/guards/auth.guard'; // Import the AuthGuard

const routes: Routes = [
  { path: '', component: GroceryListComponent, canActivate: [AuthGuard] } // Protect the route
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroceriesModule {}