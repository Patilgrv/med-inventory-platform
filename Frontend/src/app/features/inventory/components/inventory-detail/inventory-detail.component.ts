import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InventoryItem, ItemBatch, StockLedgerEntry } from '@core/models';
import { InventoryService } from '../../inventory.service';

type ActiveTab = 'overview' | 'batches' | 'ledger';

@Component({
  selector: 'app-inventory-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
})
export class InventoryDetailComponent implements OnInit {
  item          = signal<InventoryItem | null>(null);
  batches       = signal<ItemBatch[]>([]);
  ledger        = signal<StockLedgerEntry[]>([]);
  loading       = signal(true);
  ledgerLoading = signal(false);
  activeTab     = signal<ActiveTab>('overview');
  ledgerPage    = signal(1);
  ledgerTotalPages = signal(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.inventoryService.getItemById(id).subscribe((item: any) => {
      this.item.set(item);
      this.batches.set(item.batches);
      this.loading.set(false);
    });

    // If routed with #ledger fragment, jump straight to ledger tab
    if (this.route.snapshot.fragment === 'ledger') {
      this.loadLedger();
    }
  }

  loadBatches(): void {
    this.activeTab.set('batches');
    // Batches come with the item — already loaded
  }

  loadLedger(): void {
    this.activeTab.set('ledger');
    this.loadLedgerPage(1);
  }

  loadLedgerPage(page: number): void {
    const id = this.item()?.id;
    if (!id) return;
    this.ledgerLoading.set(true);
    this.ledgerPage.set(page);
    this.inventoryService.getStockLedger(id, { page, pageSize: 20 }).subscribe((res: any) => {
      this.ledger.set(res.data);
      this.ledgerTotalPages.set(res.totalPages);
      this.ledgerLoading.set(false);
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────

  nearestExpiry(): string | null {
    const batches = this.item()?.batches ?? [];
    if (batches.length === 0) return null;
    return batches
      .filter(b => b.isActive)
      .map(b => b.expiryDate)
      .sort()[0] ?? null;
  }

  stockPercent(item: InventoryItem): number {
    const max = item.maxStockLevel ?? 0;
    if (max === 0) return 0;
    return Math.min(100, Math.round(((item.currentStock ?? 0) / max) * 100));
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
      Healthy: 'status-green', Low: 'status-amber',
      Critical: 'status-red', OutOfStock: 'status-red',
      Expiring: 'status-amber', Expired: 'status-red',
    };
    return map[status ?? ''] ?? '';
  }

  abcClass(cls: string): string {
    return cls === 'A' ? 'abc-a' : cls === 'B' ? 'abc-b' : 'abc-c';
  }

  daysUntilExpiry(batch: ItemBatch): number {
    const diff = new Date(batch.expiryDate ?? '').getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  isExpiringSoon(batch: ItemBatch): boolean {
    const days = this.daysUntilExpiry(batch);
    return days > 0 && days <= 90;
  }

  isExpired(batch: ItemBatch): boolean {
    return this.daysUntilExpiry(batch) <= 0;
  }

  daysClass(days: number): string {
    if (days <= 0)  return 'days-red';
    if (days <= 30) return 'days-red';
    if (days <= 90) return 'days-amber';
    return 'days-green';
  }

  txnClass(type: string): string {
    const map: Record<string, string> = {
      GRN: 'txn-green', Issue: 'txn-red',
      Transfer: 'txn-blue', Adjustment: 'txn-amber', Return: 'txn-purple',
    };
    return map[type] ?? '';
  }

  // ── Navigation ────────────────────────────────────────────────────────

  goToEdit(): void {
    this.router.navigate(['/inventory', this.item()!.id, 'edit']);
  }

  openTransfer(): void {
    // TODO: open StockTransferDialogComponent
    console.log('Transfer stock for', this.item()!.name);
  }
}