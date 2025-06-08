import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { OrderDetailFormComponent } from './order-detail-form/order-detail-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    OrderDetailListComponent,
    OrderDetailFormComponent
  ],
  imports: [
    CommonModule,
    OrderDetailRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class OrderDetailModule { }
