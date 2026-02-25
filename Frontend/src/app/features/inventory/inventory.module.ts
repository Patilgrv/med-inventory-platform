import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryPageComponent } from './inventory-page.component';

@NgModule({
  declarations: [InventoryPageComponent],
  imports: [CommonModule, InventoryRoutingModule],
})
export class InventoryModule {}
