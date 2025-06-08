import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodRoutingModule } from './paymentMehod-routing.module';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';
import { PaymentMethodFormComponent } from './payment-method-form/payment-method-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core'; // obligatorio para fechas

@NgModule({
  declarations: [
    PaymentMethodListComponent,
    PaymentMethodFormComponent
  ],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PaymentMethodModule { }
