import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignalrService {
  readonly unreadCount = signal(0);
  // Stub for real SignalR hub connection when backend is ready
  connect(): void {
    console.log('SignalR connected');
    this.unreadCount.set(Math.floor(Math.random() * 10));
  }

  disconnect(): void {
    console.log('SignalR disconnected');
    this.unreadCount.set(0);
  }
}
