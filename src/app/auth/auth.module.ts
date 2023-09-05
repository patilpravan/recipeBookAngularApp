import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticateUserComponent } from './authenticate-user/authenticate-user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthenticateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'authenticate', component: AuthenticateUserComponent },
    ]),
  ],
  exports: [],
})
export class AuthModule {}
