import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DiscountListComponent,
    DiscountFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginator,
    DiscountRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class DiscountModule { }
