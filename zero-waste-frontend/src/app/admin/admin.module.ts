import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../core/guards/auth.guard'; // Adjust the path as necessary

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, canActivate: [AuthGuard] } // Protect the route
];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    FormsModule // Import FormsModule for ngModel
  ],
  exports: [RouterModule]
})
export class AdminModule {}
