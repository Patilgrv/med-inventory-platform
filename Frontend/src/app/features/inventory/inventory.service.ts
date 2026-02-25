import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { InventoryItem, ItemBatch, StockLedgerEntry, PaginatedResult, QueryParams } from '@core/models';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private api: ApiService) {}

  getItems(params?: QueryParams): Observable<PaginatedResult<InventoryItem>> {
    return this.api.getPaginated<InventoryItem>('inventory/items', params);
  }

  getItemById(id: string): Observable<InventoryItem> {
    return this.api.get<InventoryItem>(`inventory/items/${id}`);
  }

  createItem(item: Partial<InventoryItem>): Observable<InventoryItem> {
    return this.api.post<InventoryItem>('inventory/items', item);
  }

  updateItem(id: string, item: Partial<InventoryItem>): Observable<InventoryItem> {
    return this.api.put<InventoryItem>(`inventory/items/${id}`, item);
  }

  getExpiringItems(days: 30 | 60 | 90): Observable<InventoryItem[]> {
    return this.api.get<InventoryItem[]>('inventory/expiring', { days });
  }

  getLowStockItems(): Observable<InventoryItem[]> {
    return this.api.get<InventoryItem[]>('inventory/low-stock');
  }

  getBatchesByItem(itemId: string): Observable<ItemBatch[]> {
    return this.api.get<ItemBatch[]>(`inventory/items/${itemId}/batches`);
  }

  getStockLedger(itemId: string, params?: QueryParams): Observable<PaginatedResult<StockLedgerEntry>> {
    return this.api.getPaginated<StockLedgerEntry>(`inventory/items/${itemId}/ledger`, params);
  }

  transferStock(fromWarehouseId: string, toWarehouseId: string, itemId: string, qty: number): Observable<void> {
    return this.api.post<void>('inventory/transfer', { fromWarehouseId, toWarehouseId, itemId, qty });
  }
}