import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messaging;

  constructor(private http: HttpClient, private authService: AuthService) {
    const app = initializeApp(environment.firebase);
    this.messaging = getMessaging(app);
  }

  requestPermission(): Promise<string> {
    return getToken(this.messaging, { 
      vapidKey: environment.firebase.vapidKey 
    }).then((currentToken) => {
      if (currentToken) {
        this.http.post(`${environment.apiUrl}/user/fcm-token`, { 
          token: currentToken 
        }).subscribe();
        return currentToken;
      } else {
        throw new Error('No registration token available.');
      }
    });
  }

  listenForNotifications(callback: (payload: any) => void): void {
    onMessage(this.messaging, (payload) => {
      callback(payload);
    });
  }
}