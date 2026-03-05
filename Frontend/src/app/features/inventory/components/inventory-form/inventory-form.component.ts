import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
})
export class InventoryFormComponent implements OnInit {
  form!: FormGroup;
  isEdit  = signal(false);
  saving  = signal(false);
  errorMsg = signal('');

  private itemId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.isEdit.set(!!this.itemId);
    this.buildForm();

    if (this.isEdit() && this.itemId) {
      this.inventoryService.getItemById(this.itemId).subscribe((item: any) => {
        this.form.patchValue({
          name:                item.name,
          genericName:         item.genericName,
          skuCode:             item.skuCode,
          category:            item.category,
          uom:                 item.uom,
          warehouseId:         item.warehouseId,
          abcClass:            item.abcClass,
          xyzClass:            item.xyzClass,
          minStockLevel:       item.minStockLevel,
          maxStockLevel:       item.maxStockLevel,
          reorderLevel:        item.reorderLevel,
        });
      });
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name:                 ['', Validators.required],
      genericName:          [''],
      skuCode:              ['', Validators.required],
      category:             ['', Validators.required],
      uom:                  ['', Validators.required],
      warehouseId:          ['', Validators.required],
      abcClass:             ['A', Validators.required],
      xyzClass:             ['X'],
      minStockLevel:        [0,  [Validators.required, Validators.min(0)]],
      maxStockLevel:        [0,  [Validators.required, Validators.min(1)]],
      reorderLevel:         [0],
      storageInstructions:  [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.errorMsg.set('');

    const payload = this.form.value;

    const request$ = this.isEdit()
      ? this.inventoryService.updateItem(this.itemId!, payload)
      : this.inventoryService.createItem(payload);

    request$.subscribe({
      next: (item: any) => {
        this.saving.set(false);
        this.router.navigate(['/inventory', item.id]);
      },
      error: () => {
        this.saving.set(false);
        this.errorMsg.set('Failed to save item. Please try again.');
      },
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }

  canPreview(): boolean {
    const min = this.form.get('minStockLevel')?.value;
    const max = this.form.get('maxStockLevel')?.value;
    return max > 0 && min >= 0;
  }

  minPct(): number {
    const min = this.form.get('minStockLevel')?.value ?? 0;
    const max = this.form.get('maxStockLevel')?.value ?? 1;
    return Math.round((min / max) * 100);
  }

  rolPct(): number {
    const rol = this.form.get('reorderLevel')?.value ?? 0;
    const max = this.form.get('maxStockLevel')?.value ?? 1;
    return Math.round((rol / max) * 100);
  }

  abcHint(cls: string): string {
    return cls === 'A' ? 'High value' : cls === 'B' ? 'Medium' : 'Low value';
  }

  xyzHint(cls: string): string {
    return cls === 'X' ? 'Steady demand' : cls === 'Y' ? 'Variable' : 'Irregular';
  }
}