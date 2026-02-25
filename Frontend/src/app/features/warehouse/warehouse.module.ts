import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehousePageComponent } from './warehouse-page.component';

@NgModule({
  declarations: [WarehousePageComponent],
  imports: [CommonModule, WarehouseRoutingModule],
})
export class WarehouseModule {}
