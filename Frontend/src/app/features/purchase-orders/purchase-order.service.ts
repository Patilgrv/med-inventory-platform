import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { PurchaseOrder, PaginatedResult, QueryParams } from '@core/models';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  constructor(private api: ApiService) {}

  getPOs(params?: QueryParams): Observable<PaginatedResult<PurchaseOrder>> {
    return this.api.getPaginated<PurchaseOrder>('purchase-orders', params);
  }

  getPoById(id: string): Observable<PurchaseOrder> {
    return this.api.get<PurchaseOrder>(`purchase-orders/${id}`);
  }

  createPO(po: Partial<PurchaseOrder>): Observable<PurchaseOrder> {
    return this.api.post<PurchaseOrder>('purchase-orders', po);
  }

  updatePO(id: string, po: Partial<PurchaseOrder>): Observable<PurchaseOrder> {
    return this.api.put<PurchaseOrder>(`purchase-orders/${id}`, po);
  }

  approvePO(id: string, remarks?: string): Observable<void> {
    return this.api.patch<void>(`purchase-orders/${id}/approve`, { remarks });
  }

  rejectPO(id: string, reason: string): Observable<void> {
    return this.api.patch<void>(`purchase-orders/${id}/reject`, { reason });
  }

  cancelPO(id: string, reason: string): Observable<void> {
    return this.api.patch<void>(`purchase-orders/${id}/cancel`, { reason });
  }

  getPendingApprovals(): Observable<PurchaseOrder[]> {
    return this.api.get<PurchaseOrder[]>('purchase-orders/pending-approvals');
  }

  getSlaBreaches(): Observable<PurchaseOrder[]> {
    return this.api.get<PurchaseOrder[]>('purchase-orders/sla-breaches');
  }
}