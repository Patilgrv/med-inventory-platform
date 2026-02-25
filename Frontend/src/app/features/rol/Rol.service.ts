import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolAlert, RolCalculation, PaginatedResult, QueryParams } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class RolService {
  private api = inject(ApiService);

  getAlerts(params?: QueryParams): Observable<PaginatedResult<RolAlert>> {
    return this.api.getPaginated<RolAlert>('rol/alerts', params);
  }

  getAlertById(id: string): Observable<RolAlert> {
    return this.api.get<RolAlert>(`rol/alerts/${id}`);
  }

  getCalculationForItem(itemId: string): Observable<RolCalculation> {
    return this.api.get<RolCalculation>(`rol/calculate/${itemId}`);
  }

  resolveAlert(alertId: string, remarks: string): Observable<void> {
    return this.api.patch<void>(`rol/alerts/${alertId}/resolve`, { remarks });
  }

  triggerManualCheck(): Observable<{ alertsGenerated: number }> {
    return this.api.post<{ alertsGenerated: number }>('rol/trigger-check', {});
  }

  getStockOutPredictions(): Observable<RolAlert[]> {
    return this.api.get<RolAlert[]>('rol/stockout-predictions');
  }
}