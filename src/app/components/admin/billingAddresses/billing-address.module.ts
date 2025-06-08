import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BillingAddressRoutingModule } from './billing-address-routing.module';
import { BillingAddressListComponent } from './billing-address-list/billing-address-list.component';
import { BillingAddressFormComponent } from './billing-address-form/billing-address-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [
   BillingAddressListComponent,
   BillingAddressFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginator,
    BillingAddressRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers:[DatePipe]
})
export class BillingAddressModule { }
