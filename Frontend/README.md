# SCWMS Frontend — Angular 17

Supply Chain & Warehouse Management System — Angular frontend for Softude Technologies.

## Tech Stack
- Angular 17 (Standalone Components + Signals)
- Angular Material 17
- ng2-charts (Chart.js) for data visualizations
- @microsoft/signalr for real-time notifications
- Reactive Forms + typed FormGroups

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (connects to .NET API at localhost:7001)
npm start

# Open browser
http://localhost:4200
```

---

## Project Structure

```
src/app/
├── core/
│   ├── auth/              # AuthService, login/logout, JWT storage
│   ├── guards/            # authGuard, roleGuard
│   ├── interceptors/      # jwtInterceptor (auto-attaches Bearer token + refresh)
│   ├── models/            # All TypeScript interfaces (index.ts)
│   └── services/
│       ├── api.service.ts      # Base HTTP wrapper
│       └── signalr.service.ts  # Real-time notifications hub
│
├── layout/
│   ├── layout/            # Shell component (sidebar + topbar + <router-outlet>)
│   ├── sidebar/           # Navigation sidebar
│   └── topbar/            # Top header bar
│
├── features/              # Lazy-loaded feature modules
│   ├── auth/              # Login page
│   ├── dashboard/         # KPIs, charts, alerts overview
│   ├── inventory/         # Stock items, batches, ledger
│   ├── rol/               # Reorder Level alerts & auto-PO tracking
│   ├── grn/               # Goods Receipt Notes + OCR upload
│   ├── purchase-orders/   # PO list, approval workflow
│   ├── vendors/           # Vendor master
│   ├── warehouse/         # Multi-warehouse + bin management
│   ├── returns/           # RMA tracking
│   ├── reports/           # Analytics dashboards
│   ├── notifications/     # Notification inbox
│   └── user-management/   # RBAC user admin
│
└── shared/
    ├── components/        # Reusable UI: badges, dialogs, tables
    ├── pipes/             # Custom pipes
    └── directives/        # Custom directives
```

---

## Environment Configuration

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7001/api',   // Your .NET Core API
  signalRHubUrl: 'https://localhost:7001/hubs',
};
```

---

## API Integration

All HTTP calls go through `ApiService` (`core/services/api.service.ts`):

```typescript
// GET with pagination
this.api.getPaginated<InventoryItem>('inventory/items', { page: 1, pageSize: 20 })

// POST
this.api.post<PurchaseOrder>('purchase-orders', poPayload)

// PATCH
this.api.patch<void>('purchase-orders/123/approve', { remarks: 'Approved' })
```

The `jwtInterceptor` automatically attaches `Authorization: Bearer <token>` to every request, and handles token refresh on 401 responses.

---

## SignalR (Real-time)

The `SignalrService` connects to `/hubs/notifications` on login.

Events received:
- `ReceiveNotification` → `AppNotification` object

The unread badge on the topbar bell icon is driven by `signalr.unreadCount()` (Angular Signal).

---

## Role-Based Access

User roles: `Admin | MedicalDirector | FinanceManager | DepartmentHOD | StoreKeeper | Viewer`

Protect routes:
```typescript
canActivate: [roleGuard(['Admin', 'MedicalDirector'])]
```

Check in components:
```typescript
this.auth.hasRole('Admin', 'FinanceManager')
```

---

## Next Steps — Components to Build

Each feature folder has a `components/` directory. These need to be created:

| Feature | Components |
|---------|-----------|
| inventory | inventory-list, inventory-detail, inventory-form |
| rol | rol-dashboard, rol-alert-detail |
| grn | grn-list, grn-detail, grn-form (with OCR upload) |
| purchase-orders | po-list, po-detail, po-form, approval-dialog |
| vendors | vendor-list, vendor-detail, vendor-form |
| warehouse | warehouse-list, warehouse-detail, transfer-dialog |
| returns | returns-list, returns-detail |
| reports | reports-dashboard (with Chart.js graphs) |

### Add Charts (ng2-charts)
```bash
npm install ng2-charts chart.js
```
Then use `<canvas baseChart>` in dashboard-page.component.ts.

### Add Angular Material
```bash
ng add @angular/material
```
Use `MatTable`, `MatDialog`, `MatSnackBar`, `MatFormField`.