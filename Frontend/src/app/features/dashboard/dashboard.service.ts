import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { DashboardKpi, StockMovementData, RolAlert, PurchaseOrder } from './dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getKpis(): Observable<DashboardKpi> {
    return of({
      totalSkus: 0,
      totalStockValue: 0,
      criticalAlerts: 0,
      openPurchaseOrders: 0,
      pendingApprovals: 0,
      expiringIn30Days: 0,
    });
  }

  getStockMovement(_days: 7 | 30 | 90): Observable<StockMovementData[]> {
    return of([]);
  }

  getTopAlerts(): Observable<RolAlert[]> {
    return of([]);
  }

  getPendingApprovals(): Observable<PurchaseOrder[]> {
    return of([]);
  }
}
