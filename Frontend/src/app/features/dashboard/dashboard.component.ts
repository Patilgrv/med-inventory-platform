import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardService } from './dashboard.service';
import type { DashboardKpi, StockMovementData, RolAlert, PurchaseOrder } from './dashboard.models';
import { InventoryItem } from '@core/models';
import { InventoryService } from '../inventory/inventory.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  kpi               = signal<DashboardKpi | null>(null);
  stockMovement     = signal<StockMovementData[]>([]);
  topAlerts         = signal<RolAlert[]>([]);
  pendingApprovals  = signal<PurchaseOrder[]>([]);
  filteredInventory = signal<InventoryItem[] | any[]>([]);
  chartDays         = signal<7 | 30 | 90>(7);
  inventoryFilter   = signal<'all' | 'low' | 'expiring'>('all');

  constructor(
    private dashService: DashboardService,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashService.getKpis().subscribe(k => this.kpi.set(k));
    this.dashService.getTopAlerts().subscribe(a => this.topAlerts.set(a));
    this.dashService.getPendingApprovals().subscribe(p => this.pendingApprovals.set(p));
    this.loadChart(7);
    this.loadInventorySnapshot('all');
  }

  loadChart(days: 7 | 30 | 90): void {
    this.chartDays.set(days);
    this.dashService.getStockMovement(days).subscribe(d => this.stockMovement.set(d));
  }

  setInventoryFilter(filter: 'all' | 'low' | 'expiring'): void {
    this.inventoryFilter.set(filter);
    this.loadInventorySnapshot(filter);
  }

  private loadInventorySnapshot(filter: 'all' | 'low' | 'expiring'): void {
    if (filter === 'low') {
      this.inventoryService.getLowStockItems().subscribe(items => {
        this.filteredInventory.set(items.slice(0, 8));
      });
    } else if (filter === 'expiring') {
      this.inventoryService.getExpiringItems(30).subscribe(items => {
        this.filteredInventory.set(items.slice(0, 8));
      });
    } else {
      this.inventoryService
        .getItems({ page: 1, pageSize: 8, sortBy: 'status', sortDir: 'asc' })
        .subscribe(res => this.filteredInventory.set(res.items));
    }
  }

  // ── Inventory snapshot helpers ──────────────────────────────────────

  getStockPercent(item: InventoryItem): number {
    if (item['maxStockLevel'] === 0) return 0;
    return Math.min(100, Math.round(((item['currentStock'] as unknown as number) / (item['maxStockLevel'] as unknown as number)) * 100));
  }

  getStockBarClass(item: InventoryItem): string {
    const pct = this.getStockPercent(item);
    if (pct <= 20) return 'fill-red';
    if (pct <= 50) return 'fill-amber';
    return 'fill-green';
  }

  getStockClass(item: InventoryItem): string {
    if (item['status'] === 'Critical' || item['status'] === 'OutOfStock') return 'stock-critical';
    if (item['status'] === 'Low') return 'stock-warning';
    return 'stock-ok';
  }

  getStatusBadgeClass(status: InventoryItem['status']): string {
    const map: Record<string, string> = {
      Healthy:    'badge-green',
      Low:        'badge-amber',
      Critical:   'badge-red',
      OutOfStock: 'badge-red',
      Expiring:   'badge-amber',
      Expired:    'badge-red',
    };
    return map[status as string] ?? 'badge-blue';
  }

  isExpiringItem(item: InventoryItem): boolean {
    return item['status'] === 'Expiring' || item['status'] === 'Expired';
  }

  goToItem(id: string): void {
    this.router.navigate(['/inventory', id]);
  }

  // ── PO approval helpers ─────────────────────────────────────────────

  getLevelBadgeClass(level: number): string {
    return level === 1 ? 'badge-amber' : level === 2 ? 'badge-blue' : 'badge-purple';
  }

  approvePo(id: string): void {
    // TODO: open ApprovalDialogComponent, then call PurchaseOrderService.approvePO()
    console.log('Approve PO', id);
  }

  rejectPo(id: string): void {
    // TODO: open RejectDialogComponent
    console.log('Reject PO', id);
  }
}