import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsPageComponent } from './vendors-page.component';

@NgModule({
  declarations: [VendorsPageComponent],
  imports: [CommonModule, VendorsRoutingModule],
})
export class VendorsModule {}
