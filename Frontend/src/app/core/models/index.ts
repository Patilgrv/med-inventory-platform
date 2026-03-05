export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page?: number;
  pageSize?: number;
}

export interface GoodsReceiptNote {
  id: string;
  grnNumber?: string;
  purchaseOrderId?: string;
  status?: string;
  receivedAt?: string;
  items?: unknown[];
  [key: string]: unknown;
}

export interface PurchaseOrder {
  id: string;
  poNumber?: string;
  vendorName?: string;
  totalAmount?: number;
  approvalLevel?: number;
  createdAt?: string;
  items?: unknown[];
  [key: string]: unknown;
}

// Re-export for other features (inventory, rol, etc.)
export type { InventoryItem, ItemBatch, StockLedgerEntry } from './inventory.models';
export type { RolAlert, RolCalculation } from './rol.models';
export type { Medicine, CreateMedicineRequest, UpdateMedicineRequest } from './medicine.models';
