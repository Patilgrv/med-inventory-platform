import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignalrService } from '@core/services/signalr.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  searchQuery = '';

  constructor(public signalr: SignalrService) {}

  onSearch(): void {
    // Navigate to global search results
    console.log('Search:', this.searchQuery);
  }
}

