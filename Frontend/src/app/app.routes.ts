import { Routes } from '@angular/router';
import { authGuard, roleGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  // Auth (no layout)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
  },

  // Main app (with sidebar layout)
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    // canActivate: [authGuard],
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/inventory/inventory.module').then(m => m.InventoryModule),
      },
      {
        path: 'grn',
        loadChildren: () =>
          import('./features/grn/grn.module').then(m => m.GrnModule),
      },
      {
        path: 'purchase-orders',
        loadChildren: () =>
          import('./features/purchase-orders/purchase-orders.module').then(m => m.PurchaseOrdersModule),
      },
      {
        path: 'vendors',
        loadChildren: () =>
          import('./features/vendors/vendors.module').then(m => m.VendorsModule),
      },
      {
        path: 'warehouse',
        loadChildren: () =>
          import('./features/warehouse/warehouse.module').then(m => m.WarehouseModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.routes').then(m => m.reportsRoutes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then(m => m.notificationsRoutes),
      },
      {
        path: 'user-management',
        canActivate: [roleGuard(['Admin'])],
        loadChildren: () =>
          import('./features/user-management/user-management.module').then(m => m.UserManagementModule),
      },
    ],
  },

  { path: 'unauthorized', loadComponent: () => import('./shared/components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  { path: '**', redirectTo: 'dashboard' },
];