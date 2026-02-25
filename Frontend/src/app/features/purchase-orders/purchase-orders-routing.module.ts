import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderPageComponent } from './purchase-order-page.component';

const routes: Routes = [
  { path: '', component: PurchaseOrderPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrdersRoutingModule {}
