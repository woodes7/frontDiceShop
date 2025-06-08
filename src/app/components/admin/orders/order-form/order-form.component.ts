import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDto } from '../../../../model/OrderDto';
import { OrderService } from '../../../../service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-form',
  standalone: false,
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
    this.loadForm(new OrderDto());
  }

  loadForm(order: OrderDto): void {
    this.form = this.fb.group({
      userId: [order.userId, Validators.required],
      orderDate: [order.orderDate, Validators.required],
      status: [order.status, Validators.required],
      paymentMethodId: [order.paymentMethodId],
      billingAddressId: [order.billingAddressId]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;

    if (this.isEdit) {
      this.getOrder(this.id!);
    } else {
      this.loadForm(new OrderDto());
    }
  }

  getOrder(id: number): void {
    this.orderService.getOrder(id).subscribe({
      next: (response: OrderDto) => {
        this.loadForm(response);
      }
    });
  }

  getOrderForm(): OrderDto {
    const order = new OrderDto();
    order.userId = this.form.get('userId')?.value;
    order.orderDate = this.form.get('orderDate')?.value;
    order.status = this.form.get('status')?.value;
    order.paymentMethodId = this.form.get('paymentMethodId')?.value;
    order.billingAddressId = this.form.get('billingAddressId')?.value;
    return order;
  }

  onSubmit(): void {
    const order = this.getOrderForm();
    if (this.form.valid) {
      if (this.isEdit) {
        order.id = this.id!;
        this.update(order);
      } else {
        this.add(order);
      }
    }
  }

  add(order: OrderDto): void {
    this.orderService.addOrder(order).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Creado', 'El pedido se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/orders']));
        }
      }
    });
  }

  update(order: OrderDto): void {
    this.orderService.updateOrder(order).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Actualizado', 'El pedido se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/rders']));
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/admin/orders']);
  }
}
