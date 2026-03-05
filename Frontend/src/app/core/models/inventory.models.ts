export interface InventoryItem {
  id: string;
  sku?: string;
  name?: string;
  genericName?: string;
  category?: string;
  warehouseId?: string;
  warehouseName?: string;
  currentStock?: number;
  reorderLevel?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  abcClass?: string;
  xyzClass?: string;
  expiryDate?: string;
  status?: string;
  lastUpdated?: string;
  batches?: ItemBatch[];
  ledger?: StockLedgerEntry[];
  uom?: string;
  skuCode?: string;
}

export interface ItemBatch {
  id: string;
  batchNumber?: string;
  expiryDate?: string;
  isActive?: boolean;
  grnId?: string;
  costPrice?: number;
  mfgDate?: string;
  quantity?: number;
  lastUpdated?: string;
}

export interface StockLedgerEntry {
  id: string;
  createdAt?: string;
  transactionType?: string;
  quantity?: number;
  balanceAfter?: number;
  referenceNo?: string;
  warehouseId?: string;
  batchNumber?: string;
  createdBy?: string;
}
