import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<CurrentUser | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();

  private api = inject(ApiService);

  constructor(private router: Router) {
    // Optional: restore from sessionStorage on init
    const saved = sessionStorage.getItem('currentUser');
    if (saved) {
      try {
        this.currentUserSignal.set(JSON.parse(saved));
      } catch {
        sessionStorage.removeItem('currentUser');
      }
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSignal();
    return user?.role === role;
  }

  isLoggedIn(): boolean {
    return this.currentUserSignal() != null;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  setUser(user: CurrentUser): void {
    this.currentUserSignal.set(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(email: string, password: string): Observable<void> {
    return this.api.post<void>('auth/login', { email, password });
  }
}
