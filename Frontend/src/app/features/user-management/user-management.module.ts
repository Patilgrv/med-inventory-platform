import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementPageComponent } from './user-management-page.component';

@NgModule({
  declarations: [UserManagementPageComponent],
  imports: [CommonModule, UserManagementRoutingModule],
})
export class UserManagementModule {}
