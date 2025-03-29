import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  showNotifications = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.listenForNotifications((payload) => {
      this.notifications.unshift({
        title: payload.notification?.title || 'Notification',
        body: payload.notification?.body || '',
        timestamp: new Date()
      });
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}