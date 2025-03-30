import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this.tokenSubject.next(token);
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, {
      name, email, password
    }).pipe(
      tap(response => this.storeToken(response.token))
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, {
      email, password
    }).pipe(
      tap(response => {
        this.storeToken(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    const token = this.tokenSubject.value || localStorage.getItem('token');
    return token;
  }

  isAuthenticated(): boolean {
    const token = this.tokenSubject.value || localStorage.getItem('token');
    return !!token; // Returns true if a token exists, false otherwise
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }
}