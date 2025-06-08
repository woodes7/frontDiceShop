// src/app/components/admin/categories/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { BillingAddressListComponent } from '../billingAddresses/billing-address-list/billing-address-list.component';
import { BillingAddressFormComponent } from '../billingAddresses/billing-address-form/billing-address-form.component';
import { CategoryListComponent } from '../categories/category-list/category-list.component';
import { CategoryFormComponent } from '../categories/category-form/category-form.component';
import { LayoutAdminComponent } from '../layout-admin/layout-admin.component';
import { adminGuard } from '../../../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [

      {
        path: 'products',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../products/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'categories',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../categories/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../users/user.module').then(
            (m) => m.UsersModule
          )
      },
      {
        path: 'productreviews',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../productreviews/productreview.module').then(
            (m) => m.ProductReviewModule
          )
      },
      {
        path: 'orders',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../orders/order.module').then(
            (m) => m.OrderModule
          )
      },
      {
        path: 'discounts',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../discounts/discount.module').then(
            (m) => m.DiscountModule
          )
      },
      {
        path: 'billingAddresses',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../billingAddresses/billing-address.module').then(
            (m) => m.BillingAddressModule
          )
      },
       {
        path: 'coupons',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../coupons/coupon.module').then(
            (m) => m.CouponModule
          )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
