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
