import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItem } from '@core/models';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent {
  @Input() items: InventoryItem[] = [];
  @Input() loading = false;
  @Input() page = 1;
  @Input() pageSize = 20;
  @Input() total = 0;
  @Input() totalPages = 1;

  @Output() rowClick      = new EventEmitter<InventoryItem>();
  @Output() editClick     = new EventEmitter<InventoryItem>();
  @Output() ledgerClick   = new EventEmitter<InventoryItem>();
  @Output() transferClick = new EventEmitter<InventoryItem>();
  @Output() pageChange     = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() sortChange     = new EventEmitter<string>();

  selectedIds = new Set<string>();

  // ── Helpers ──────────────────────────────────────────────────────────

  stockPercent(item: InventoryItem): number {
    const max = item.maxStockLevel ?? 0;
    if (max === 0) return 0;
    const current = item.currentStock ?? 0;
    return Math.min(100, Math.round((current / max) * 100));
  }

  barClass(item: InventoryItem): string {
    const pct = this.stockPercent(item);
    if (pct <= 15) return 'fill-red';
    if (pct <= 40) return 'fill-amber';
    return 'fill-green';
  }

  stockValClass(item: InventoryItem): string {
    if (item.status === 'Critical' || item.status === 'OutOfStock') return 'val-red';
    if (item.status === 'Low') return 'val-amber';
    return 'val-green';
  }

  statusClass(status: InventoryItem['status']): string {
    const map: Record<string, string> = {
      Healthy:    'status-green',
      Low:        'status-amber',
      Critical:   'status-red',
      OutOfStock: 'status-red',
      Expiring:   'status-amber',
      Expired:    'status-red',
    };
    return map[status ?? ''] ?? '';
  }

  abcClass(cls: InventoryItem['abcClass']): string {
    if (cls === 'A') return 'abc-a';
    if (cls === 'B') return 'abc-b';
    return 'abc-c';
  }

  isExpirySoon(item: InventoryItem): boolean {
    return item['status'] === 'Expiring';
  }

  isExpired(item: InventoryItem): boolean {
    return item['status'] === 'Expired';
  }

  // ── Selection ────────────────────────────────────────────────────────

  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  toggleSelect(id: string): void {
    this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id);
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.items.forEach(i => this.selectedIds.add(i.id));
    } else {
      this.selectedIds.clear();
    }
  }

  // ── Sort ─────────────────────────────────────────────────────────────

  sortBy(col: string): void {
    this.sortChange.emit(col);
  }

  // ── Pagination ───────────────────────────────────────────────────────

  pageNumbers(): number[] {
    const total = this.totalPages;
    const cur   = this.page;
    const pages: number[] = [];

    for (let i = Math.max(1, cur - 2); i <= Math.min(total, cur + 2); i++) {
      pages.push(i);
    }
    return pages;
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }
}