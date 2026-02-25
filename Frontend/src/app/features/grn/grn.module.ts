import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrnRoutingModule } from './grn-routing.module';
import { GrnPageComponent } from './grn-page.component';

@NgModule({
  declarations: [GrnPageComponent],
  imports: [CommonModule, GrnRoutingModule],
})
export class GrnModule {}
