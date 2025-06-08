// src/app/components/admin/categories/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { FormBillingAddressComponent } from './form-billing-address/form-billing-address.component';
import { logedGurad } from '../../../guards/loged.guard';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';

const routes: Routes = [
  { path: 'product/:id', component:  ProductDetailComponent },
  { path: 'cart', component:  CartComponent, canActivate:[logedGurad] },
  { path: 'order', component:  OrderComponent, canActivate:[logedGurad] },
  { path: 'user', component:  UserDetailComponent, canActivate:[logedGurad] },
  { path: 'payment', component:  PaymentComponent, canActivate:[logedGurad] },
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
