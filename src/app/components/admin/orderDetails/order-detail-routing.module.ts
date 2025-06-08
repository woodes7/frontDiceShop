// src/app/components/admin/categories/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { OrderDetailFormComponent } from './order-detail-form/order-detail-form.component';


const routes: Routes = [
  { path: '', component: OrderDetailListComponent },
  { path: 'form', component: OrderDetailFormComponent },
  { path: 'form/:id', component: OrderDetailFormComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailRoutingModule {}
