import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponService } from '../../../../service/coupon.service';
import { CouponDto } from '../../../../model/CouponDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-form',
  standalone: false,
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private router: Router
  ) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      discountAmount: [0, [Validators.required, Validators.min(0.01)]],
      expirationDate: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      userId: [null]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const dto: CouponDto = this.form.value;

      this.couponService.addCoupon(dto).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cupón creado correctamente', 'success').then(() => {
            this.router.navigate(['/admin/coupon/list']);
          });
        },
        error: () => {
          Swal.fire('Error', 'No se pudo crear el cupón', 'error');
        }
      });
    }
  }
}
