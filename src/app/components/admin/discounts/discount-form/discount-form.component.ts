import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountDto } from '../../../../model/DiscountDto';
import { DiscountService } from '../../../../service/discount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount-form',
  standalone: false,
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.css']
})
export class DiscountFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  discount: DiscountDto;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private discountService: DiscountService,
    private router: Router
  ) {
    this.loadForm(new DiscountDto());
    this.discount = new DiscountDto();
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;

    if (this.isEdit) {
      this.getDiscount(this.id!);
    } else {
      this.loadForm(new DiscountDto());
    }
  }

  loadForm(discount: DiscountDto): void {
    this.form = this.fb.group({
      code: [discount.code, Validators.required],
      amount: [discount.amount, [Validators.required, Validators.min(0)]],
      discountType: [discount.discountType, Validators.required],
      startDate: [discount.startDate, Validators.required],
      endDate: [discount.endDate, Validators.required],
      active: [discount.active, Validators.required]
    });
  }

  getDiscount(id: number): void {
    this.discountService.getDiscount(id).subscribe({
      next: (response) => {
        this.discount = response;
        this.loadForm(response);
      }
    });
  }

  getDiscountForm(): DiscountDto {
    const discount = new DiscountDto();

    discount.code = this.form.controls['code'].value;
    discount.amount = this.form.controls['amount'].value;
    discount.discountType = this.form.controls['discountType'].value;
    discount.startDate = this.form.controls['startDate'].value;
    discount.endDate = this.form.controls['endDate'].value;
    discount.active = this.form.controls['active'].value;

    return discount;
  }

  onSubmit(): void {
    const discount = this.getDiscountForm();

    if (this.form.valid) {
      if (this.isEdit) {
        discount.id = this.id!;
        this.update(discount);
      } else {
        this.add(discount);
      }
    }
  }

  add(discount: DiscountDto): void {
    this.discountService.addDiscount(discount).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Creado', 'El descuento se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/discounts']));
        }
      }
    });
  }

  update(discount: DiscountDto): void {
    this.discountService.updateDiscount(discount).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Actualizado', 'El descuento se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/discounts']));
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/admin/discounts']);
  }
}
