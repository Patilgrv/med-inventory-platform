/** Dashboard KPI summary from API */
export interface DashboardKpi {
  totalSkus: number;
  totalStockValue: number;
  criticalAlerts: number;
  openPurchaseOrders: number;
  pendingApprovals: number;
  expiringIn30Days: number;
}

/** Single data point for stock movement chart */
export interface StockMovementData {
  date: string;
  inbound?: number;
  outbound?: number;
}

/** ROL (Reorder Level) alert item */
export interface RolAlert {
  id: string;
  itemName: string;
  currentStock: number;
  reorderLevel: number;
  daysRemaining: number;
  severity: string;
}

/** Purchase order for pending approvals list */
export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorName: string;
  totalAmount: number;
  approvalLevel: number;
  createdAt: string;
  items: { id: string; [key: string]: unknown }[];
}
