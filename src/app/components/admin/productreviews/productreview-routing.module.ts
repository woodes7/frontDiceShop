// src/app/components/admin/categories/product-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductreviewListComponent } from './productreview-list/productreview-list.component';
import { ProductreviewFormComponent } from './productreview-form/productreview-form.component';

const routes: Routes = [
  { path: '', component: ProductreviewListComponent },
  { path: 'form', component: ProductreviewFormComponent },
  { path: 'form/:id', component: ProductreviewFormComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductreviewRoutingModule {}
