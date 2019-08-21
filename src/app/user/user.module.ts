import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import {SharedModule} from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPaymentComponent } from './user-register/user-payment/user-payment.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ConfirmComponent } from './user-register/confirm/confirm.component';
import { PaymentcheckComponent } from './user-register/paymentcheck/paymentcheck.component';
@NgModule({
  declarations: [
    UserListComponent,
    UserRegisterComponent,
    UserPaymentComponent,
    UserLoginComponent,
    ConfirmComponent,
    PaymentcheckComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
