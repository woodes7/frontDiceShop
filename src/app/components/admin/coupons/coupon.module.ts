import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CouponRoutingModule } from './coupon-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    CouponFormComponent,
    CouponListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CouponRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CouponModule { }
