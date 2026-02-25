import { Component, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { SignalrService } from '@core/services/signalr.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
  badgeColor?: 'red' | 'amber' | 'blue';
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  user = this.auth.currentUser;
  isAdmin = computed(() => this.auth.hasRole('Admin'));
  userInitials = computed(() => {
    const name = this.user()?.name ?? '';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  });

  coreNav: NavItem[] = [
    { label: 'Dashboard', icon: '⬛', route: '/dashboard' },
    { label: 'Inventory', icon: '📦', route: '/inventory', badge: 3, badgeColor: 'amber' },
    { label: 'ROL System', icon: '🔄', route: '/rol', badge: 7, badgeColor: 'red' },
    { label: 'GRN', icon: '📋', route: '/grn', badge: 2, badgeColor: 'blue' },
    { label: 'Purchase Orders', icon: '🛒', route: '/purchase-orders' },
  ];

  opsNav: NavItem[] = [
    { label: 'Vendors', icon: '🏢', route: '/vendors' },
    { label: 'Warehouse', icon: '🏗️', route: '/warehouse' },
    { label: 'Returns', icon: '↩️', route: '/returns' },
    { label: 'Reports', icon: '📊', route: '/reports' },
    { label: 'Notifications', icon: '🔔', route: '/notifications' },
  ];

  adminNav: NavItem[] = [
    { label: 'User Management', icon: '👥', route: '/user-management' },
    { label: 'Settings', icon: '⚙️', route: '/settings' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
  }
}

