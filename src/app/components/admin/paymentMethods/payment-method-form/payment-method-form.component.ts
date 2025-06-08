import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PaymentMethodDto } from '../../../../model/PaymentMethodDto';
import { PaymentMethodService } from '../../../../service/payment-method.service';

@Component({
  selector: 'app-payment-method-form',
  standalone: false,
  templateUrl: './payment-method-form.component.html'
})
export class PaymentMethodFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paymentMethodService: PaymentMethodService,
    private router: Router
  ) {
    this.loadForm(new PaymentMethodDto());
  }

  loadForm(method: PaymentMethodDto): void {
    this.form = this.fb.group({
      userId: [method.userId, Validators.required],
      paymentType: [method.paymentType, Validators.required],
      paymentDetails: [method.paymentDetails, Validators.required],
      creationDate: [method.creationDate],
      isPrimary: [method.isPrimary]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;

    if (this.isEdit) {
      this.getPaymentMethod(this.id!);
    } else {
      this.loadForm(new PaymentMethodDto());
    }
  }

  getPaymentMethod(id: number): void {
    this.paymentMethodService.getPaymentMethod(id).subscribe({
      next: (response) => {
        this.loadForm(response);
      }
    });
  }

  getPaymentMethodForm(): PaymentMethodDto {
    const method = new PaymentMethodDto();
    method.userId = this.form.get('userId')?.value;
    method.paymentType = this.form.get('paymentType')?.value;
    method.paymentDetails = this.form.get('paymentDetails')?.value;
    method.creationDate = this.form.get('creationDate')?.value;
    method.isPrimary = this.form.get('isPrimary')?.value;
    return method;
  }

  onSubmit(): void {
    const method = this.getPaymentMethodForm();
    if (this.form.valid) {
      if (this.isEdit) {
        method.id = this.id!;
        this.update(method);
      } else {
        this.add(method);
      }
    }
  }

  add(method: PaymentMethodDto): void {
    this.paymentMethodService.addPaymentMethod(method).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Creado', 'El método de pago se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/paymentMethods']));
        }
      }
    });
  }

  update(method: PaymentMethodDto): void {
    this.paymentMethodService.updatePaymentMethod(method).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Actualizado', 'El método de pago se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/paymentMethods']));
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/paymentmethods']);
  }
}
