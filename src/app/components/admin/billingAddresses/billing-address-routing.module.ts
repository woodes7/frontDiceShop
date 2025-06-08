// src/app/components/admin/billingAddresses/billing-addres-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingAddressListComponent } from './billing-address-list/billing-address-list.component';
import { BillingAddressFormComponent } from './billing-address-form/billing-address-form.component';

const routes: Routes = [
  { path: '', component: BillingAddressListComponent },
  { path: 'form', component: BillingAddressFormComponent },
  { path: 'form/:id', component: BillingAddressFormComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingAddressRoutingModule {}
