import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryItem } from '@core/models';
import { InventoryStatsBarComponent, InventoryStats } from '../inventory-stats-bar/inventory-stats-bar.component';
import { InventoryFiltersComponent, InventoryFilterState } from '../inventory-filters/inventory-filters.component';
import { InventoryTableComponent } from '../inventory-table/inventory-table.component';
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    InventoryStatsBarComponent,
    InventoryFiltersComponent,
    InventoryTableComponent,
  ],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {

  // ── State signals ──────────────────────────────────────────────────
  items      = signal<InventoryItem[]>([]);
  loading    = signal(false);
  page       = signal(1);
  pageSize   = signal(20);
  total      = signal(0);
  totalPages = signal(1);

  stats      = signal<InventoryStats | null>(null);
  warehouses = signal<{ id: string; name: string }[]>([]);

  tabCounts = signal<Record<string, number>>({});

  // Current filter state
  private filter: InventoryFilterState = {
    tab: 'all',
    search: '',
    warehouseId: '',
    sortBy: 'status',
    sortDir: 'asc',
  };

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
    this.loadStats();
    this.loadItems();
  }

  // ── Data loading ───────────────────────────────────────────────────

  private loadItems(): void {
    this.loading.set(true);

    const params: Record<string, string | number> = {
      page:     this.page(),
      pageSize: this.pageSize(),
      sortBy:   this.filter.sortBy,
      sortDir:  this.filter.sortDir,
    };

    if (this.filter.search)      params['search']      = this.filter.search;
    if (this.filter.warehouseId) params['warehouseId'] = this.filter.warehouseId;

    // Map tab → API filter param
    const tabMap: Record<string, string> = {
      critical: 'Critical',
      low:      'Low',
      expiring: 'Expiring',
      classA:   'A',
      classB:   'B',
      classC:   'C',
    };
    if (this.filter.tab !== 'all') {
      if (['classA', 'classB', 'classC'].includes(this.filter.tab)) {
        params['abcClass'] = tabMap[this.filter.tab];
      } else {
        params['status'] = tabMap[this.filter.tab];
      }
    }

    this.inventoryService.getItems(params).subscribe({
      next: (res: any) => {
        this.items.set(res.data);
        this.total.set(res.total);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private loadStats(): void {
    // Load counts for all tabs + KPI stats in parallel
    this.inventoryService.getItems({ pageSize: 1 }).subscribe((r : any) => {
      this.tabCounts.update(c => ({ ...c, all: r.total }));
    });
    this.inventoryService.getLowStockItems().subscribe((items: any) => {
      const critical = items.filter((i: any) => i.status === 'Critical').length;
      const low      = items.filter((i: any) => i.status === 'Low').length;
      this.tabCounts.update(c => ({ ...c, critical, low }));

      this.stats.set({
        totalSkus:      0,           // will be set below
        totalValue:     0,
        lowStockCount:  low,
        expiringCount:  0,
        outOfStockCount: items.filter((i: any) => i.status === 'OutOfStock').length,
        warehouseCount: 3,
      });
    });
    this.inventoryService.getExpiringItems(30).subscribe((items: any) => {
      this.tabCounts.update(c => ({ ...c, expiring: items.length }));
      this.stats.update(s => s ? { ...s, expiringCount: items.length } : s);
    });
  }

  private loadWarehouses(): void {
    // TODO: inject WarehouseService and load real data
    this.warehouses.set([
      { id: 'wh-01', name: 'WH-01 Main Store' },
      { id: 'wh-02', name: 'WH-02 Cold Storage' },
      { id: 'wh-03', name: 'WH-03 Annexe' },
    ]);
  }

  // ── Filter / sort / page handlers ─────────────────────────────────

  onFilterChange(state: InventoryFilterState): void {
    this.filter = state;
    this.page.set(1);   // reset to page 1 on filter change
    this.loadItems();
  }

  onPageChange(p: number): void {
    this.page.set(p);
    this.loadItems();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
    this.loadItems();
  }

  onSortChange(col: string): void {
    if (this.filter.sortBy === col) {
      this.filter.sortDir = this.filter.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.filter.sortBy  = col;
      this.filter.sortDir = 'asc';
    }
    this.loadItems();
  }

  onExport(): void {
    // TODO: call InventoryService.exportToExcel() and trigger download
    console.log('Export triggered');
  }

  // ── Navigation ────────────────────────────────────────────────────

  goToDetail(item: InventoryItem): void {
    this.router.navigate(['/inventory', item.id]);
  }

  goToEdit(item: InventoryItem): void {
    this.router.navigate(['/inventory', item.id, 'edit']);
  }

  goToLedger(item: InventoryItem): void {
    this.router.navigate(['/inventory', item.id], { fragment: 'ledger' });
  }

  goToAdd(): void {
    this.router.navigate(['/inventory/new']);
  }

  openTransfer(item: InventoryItem): void {
    // TODO: open StockTransferDialogComponent
    console.log('Open transfer dialog for', item.name);
  }
}