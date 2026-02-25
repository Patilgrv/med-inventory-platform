import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrnPageComponent } from './grn-page.component';

const routes: Routes = [
  { path: '', component: GrnPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrnRoutingModule {}
