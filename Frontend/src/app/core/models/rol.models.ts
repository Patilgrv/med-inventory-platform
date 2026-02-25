export interface RolAlert {
  id: string;
  itemId?: string;
  itemName?: string;
  currentStock?: number;
  reorderLevel?: number;
  daysRemaining?: number;
  severity?: string;
  [key: string]: unknown;
}

export interface RolCalculation {
  itemId: string;
  reorderLevel?: number;
  recommendedOrderQty?: number;
  [key: string]: unknown;
}
