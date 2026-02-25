export interface InventoryItem {
  id: string;
  sku?: string;
  name?: string;
  [key: string]: unknown;
}

export interface ItemBatch {
  id: string;
  batchNumber?: string;
  [key: string]: unknown;
}

export interface StockLedgerEntry {
  id: string;
  [key: string]: unknown;
}
