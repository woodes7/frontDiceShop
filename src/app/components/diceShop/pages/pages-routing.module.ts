// src/app/components/admin/categories/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingAddressFormComponent } from '../../admin/billingAddresses/billing-address-form/billing-address-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmRegisterComponent } from './confirm-register/confirm-register.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'register', component:  RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'confirm-email/:token', component: ConfirmRegisterComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
