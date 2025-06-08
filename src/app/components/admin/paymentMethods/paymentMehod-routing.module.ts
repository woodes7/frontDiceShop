// src/app/components/admin/categories/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';
import { PaymentMethodFormComponent } from './payment-method-form/payment-method-form.component';

const routes: Routes = [
  { path: '', component: PaymentMethodListComponent },
  { path: 'form', component: PaymentMethodFormComponent },
  { path: 'form/:id', component: PaymentMethodFormComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMethodRoutingModule {}
