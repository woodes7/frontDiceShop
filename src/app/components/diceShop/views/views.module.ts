import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ViewsRoutingModule } from './views-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PayComponent } from './pay/pay.component';
import { CartComponent } from './cart/cart.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormBillingAddressComponent } from './form-billing-address/form-billing-address.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { OrdersComponent } from './orders/orders.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ProductDetailComponent,
    PayComponent,
    OrdersComponent,
    CartComponent,
    FormBillingAddressComponent,
    UserDetailComponent,
    PaymentCancelComponent,
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ViewsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckbox,
    MatDatepickerModule
  ]
})
export class ViewsModule { }
