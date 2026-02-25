import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrdersRoutingModule } from './purchase-orders-routing.module';
import { PurchaseOrderPageComponent } from './purchase-order-page.component';

@NgModule({
  declarations: [PurchaseOrderPageComponent],
  imports: [CommonModule, PurchaseOrdersRoutingModule],
})
export class PurchaseOrdersModule {}
