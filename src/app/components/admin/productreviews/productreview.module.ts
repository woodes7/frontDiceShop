import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductreviewRoutingModule } from './productreview-routing.module';
import { ProductreviewListComponent } from './productreview-list/productreview-list.component';
import { ProductreviewFormComponent } from './productreview-form/productreview-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ProductreviewListComponent,
    ProductreviewFormComponent
  ],
  imports: [
    CommonModule,
    ProductreviewRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class ProductReviewModule { }
