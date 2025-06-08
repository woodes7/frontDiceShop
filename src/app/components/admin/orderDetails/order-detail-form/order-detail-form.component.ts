import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderDetailService } from '../../../../service/order-detail.service';
import Swal from 'sweetalert2';
import { OrderDetailDto } from '../../../../model/OrderdetailDto';


@Component({
  selector: 'app-orderdetail-form',
  standalone: false,
  templateUrl: './order-detail-form.component.html'
})
export class OrderDetailFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) {
    this.loadForm(new OrderDetailDto());
  }

  loadForm(detail: OrderDetailDto): void {
      this.form = this.fb.group({
      orderId: [detail.orderId, Validators.required],
      productId: [detail.productId, Validators.required],
      quantity: [detail.quantity, [Validators.required, Validators.min(1)]],
      unitPrice: [detail.unitPrice, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;

    if (this.isEdit) {
      this.getOrderDetail(this.id!);
    } else {
      this.loadForm(new OrderDetailDto());
    }
  }

  getOrderDetail(id: number): void {
    this.orderDetailService.getOrderDetail(id).subscribe({
      next: (response: OrderDetailDto) => {
        this.loadForm(response);
      }
    });
  }

  getOrderDetailForm(): OrderDetailDto {
    const detail = new OrderDetailDto();
    detail.orderId = this.form.get('orderId')?.value;
    detail.productId = this.form.get('productId')?.value;
    detail.quantity = this.form.get('quantity')?.value;
    detail.unitPrice = this.form.get('unitPrice')?.value;
    return detail;
  }

  onSubmit(): void {
    const detail = this.getOrderDetailForm();
    if (this.form.valid) {
      if (this.isEdit) {
        detail.id = this.id!;
        this.update(detail);
      } else {
        this.add(detail);
      }
    }
  }

  add(detail: OrderDetailDto): void {
    this.orderDetailService.addOrderDetail(detail).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Creado', 'El detalle del pedido se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/orderdetails']));
        }
      }
    });
  }

  update(detail: OrderDetailDto): void {
    this.orderDetailService.updateOrderDetail(detail).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Actualizado', 'El detalle del pedido se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/orderdetails']));
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/orderdetails']);
  }
}
