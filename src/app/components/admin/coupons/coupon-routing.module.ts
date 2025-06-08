import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';

const routes: Routes = [
  { path: '', component: CouponListComponent },
  { path: 'form', component: CouponFormComponent },
  { path: 'form/:id', component: CouponFormComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule {}
