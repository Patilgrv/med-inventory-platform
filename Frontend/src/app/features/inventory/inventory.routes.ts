import { Routes } from '@angular/router';

export const inventoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/inventory-list/inventory-list.component').then(m => m.InventoryListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/inventory-form/inventory-form.component').then(m => m.InventoryFormComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/inventory-form/inventory-form.component').then(m => m.InventoryFormComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/inventory-detail/inventory-detail.component').then(m => m.InventoryDetailComponent),
  },
];
