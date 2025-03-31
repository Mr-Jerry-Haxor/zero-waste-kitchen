import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, UserListComponent], // No additional imports needed for this component
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {}
