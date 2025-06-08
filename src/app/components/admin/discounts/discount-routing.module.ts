// src/app/components/admin/categories/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';


const routes: Routes = [
  { path: '', component: DiscountListComponent },
  { path: 'form', component: DiscountFormComponent },
  { path: 'form/:id', component: DiscountFormComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule {}
