import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type InventoryFilterTab = 'all' | 'critical' | 'low' | 'expiring' | 'classA' | 'classB' | 'classC';

export interface InventoryFilterState {
  tab: InventoryFilterTab;
  search: string;
  warehouseId: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

export interface WarehouseOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-inventory-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-filters.component.html',
  styleUrls: ['./inventory-filters.component.scss'],
})
export class InventoryFiltersComponent implements OnInit {
  @Input() warehouses: WarehouseOption[] = [];
  @Input() counts: Partial<Record<InventoryFilterTab, number>> = {};

  @Output() filterChange  = new EventEmitter<InventoryFilterState>();
  @Output() addClicked    = new EventEmitter<void>();
  @Output() exportClicked = new EventEmitter<void>();

  state: InventoryFilterState = {
    tab: 'all',
    search: '',
    warehouseId: '',
    sortBy: 'status',
    sortDir: 'asc',
  };

  tabs: { label: string; value: InventoryFilterTab; count?: number; urgent?: boolean }[] = [];

  ngOnInit(): void {
    this.buildTabs();
  }

  ngOnChanges(): void {
    this.buildTabs();
  }

  private buildTabs(): void {
    this.tabs = [
      { label: 'All Items',   value: 'all',      count: this.counts['all'] },
      { label: '🔴 Critical', value: 'critical', count: this.counts['critical'], urgent: true },
      { label: '🟡 Low Stock',value: 'low',      count: this.counts['low'], urgent: true },
      { label: '⏱ Expiring',  value: 'expiring', count: this.counts['expiring'] },
      { label: 'Class A',     value: 'classA',   count: this.counts['classA'] },
      { label: 'Class B',     value: 'classB',   count: this.counts['classB'] },
      { label: 'Class C',     value: 'classC',   count: this.counts['classC'] },
    ];
  }

  setTab(tab: InventoryFilterTab): void {
    this.state.tab = tab;
    this.emit();
  }

  onSearchChange(val: string): void {
    this.state.search = val;
    this.emit();
  }

  clearSearch(): void {
    this.state.search = '';
    this.emit();
  }

  toggleSortDir(): void {
    this.state.sortDir = this.state.sortDir === 'asc' ? 'desc' : 'asc';
    this.emit();
  }

  emit(): void {
    this.filterChange.emit({ ...this.state });
  }
}