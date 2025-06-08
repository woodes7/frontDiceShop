// src/app/components/admin/categories/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { PayComponent } from './pay/pay.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormBillingAddressComponent } from './form-billing-address/form-billing-address.component';
import { logedGurad } from '../../../guards/loged.guard';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'product/:id', component:  ProductDetailComponent },
  { path: 'cart', component:  CartComponent, canActivate:[logedGurad] },
  { path: 'pay', component:  PayComponent, canActivate:[logedGurad] },
  { path: 'orders', component:  OrdersComponent, canActivate:[logedGurad] },
  { path: 'user', component:  UserDetailComponent, canActivate:[logedGurad] },
  { path: 'payment-success', component:  PaymentSuccessComponent, canActivate:[logedGurad] },
  { path: 'payment-cancel', component:  PaymentCancelComponent, canActivate:[logedGurad] },
  { path: 'billingAddress', component:  FormBillingAddressComponent, canActivate:[logedGurad] },
  { path: 'billingAddress/:id', component:  FormBillingAddressComponent, canActivate:[logedGurad] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule {}
