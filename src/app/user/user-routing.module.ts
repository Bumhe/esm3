import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserPaymentComponent } from './user-register/user-payment/user-payment.component';
//import { UserLoginComponent } from './user-login/user-login.component';
import { ConfirmComponent } from '././user-register/confirm/confirm.component';
import { PaymentcheckComponent } from '././user-register/paymentcheck/paymentcheck.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'members', component: UserListComponent},
  { path: 'check-payment', component: PaymentcheckComponent},
  { path: 'register', component: UserRegisterComponent},
  { path: 'payment/:registrationId', component: UserPaymentComponent},
  { path: 'confirm', component: ConfirmComponent}
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class UserRoutingModule { }
