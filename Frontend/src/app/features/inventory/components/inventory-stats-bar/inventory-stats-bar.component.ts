import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface InventoryStats {
  totalSkus: number;
  totalValue: number;
  lowStockCount: number;
  expiringCount: number;
  outOfStockCount: number;
  warehouseCount: number;
}

@Component({
  selector: 'app-inventory-stats-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-stats-bar.component.html',
  styleUrls: ['./inventory-stats-bar.component.scss'],
})
export class InventoryStatsBarComponent {
  @Input() stats: InventoryStats | null = null;
}