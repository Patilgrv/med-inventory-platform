import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from '@core/services/signalr.service';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  constructor(private signalr: SignalrService, private auth: AuthService) {}

  ngOnInit(): void {
    // Connect SignalR as soon as we have a logged-in user
    if (this.auth.isLoggedIn()) {
      this.signalr.connect();
    }
  }
}