import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from '@core/services/common/signalr.service';
import { AuthService } from '@core/auth/auth.service';
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private signalr = inject(SignalrService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    // Connect SignalR as soon as we have a logged-in user
    if (this.auth.isLoggedIn()) {
      this.signalr.connect();
    }
  }
}