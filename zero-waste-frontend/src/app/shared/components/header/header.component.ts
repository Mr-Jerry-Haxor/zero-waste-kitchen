import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isAdmin$: Observable<boolean>;
  notificationsEnabled$: Observable<boolean>;

  constructor(
    public authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.notificationsEnabled$ = this.notificationService.getNotificationStatus();
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.notificationService.requestPermission().subscribe({
        error: (err) => console.error('Failed to get notification permission:', err)
      });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleNotifications(): void {
    // this.notificationsEnabled$.subscribe((enabled) => {
    //   this.notificationService.toggleNotifications(!enabled);
    // });
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
  }
}