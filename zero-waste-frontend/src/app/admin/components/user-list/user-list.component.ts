import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,MatDialogModule,NotificationDialogComponent], // No additional imports needed for this component
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  openNotificationDialog(userId: number): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: { userId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notificationService
          .sendNotification({ userId, message: result.message })
          .subscribe(() => {
            alert('Notification sent successfully');
          });
      }
    });
  }
}
