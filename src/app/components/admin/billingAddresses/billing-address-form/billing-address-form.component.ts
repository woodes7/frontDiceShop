import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BillingAddressService } from '../../../../service/billing-address.service';
import { BillingaddressDto } from '../../../../model/BillingaddressDto';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-billingaddress-form',
  standalone: false,
  templateUrl: './billing-address-form.component.html',
  styleUrls: ['./billing-address-form.component.css']
})
export class BillingAddressFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id: number | null = null;
  currentAddress: BillingaddressDto = {} as BillingaddressDto;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private billingAddressService: BillingAddressService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.loadForm(new BillingaddressDto())
  }

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.isEdit = this.id > 0;

    if (this.isEdit) {
      this.billingAddressService.getBillingAddress(this.id).subscribe({
        next: (res) => {
          this.currentAddress = res;
          this.loadForm(res);
        }
      });
    } else {
      this.loadForm({} as BillingaddressDto);
    }
  }

  loadForm(address: BillingaddressDto): void {
   
    this.form = this.fb.group({
      country: [address.country, Validators.required],
      state: [address.state, Validators.required],
      city: [address.city, Validators.required],
      street: [address.street, Validators.required],
      streetNumber: [address.streetNumber],
      door: [address.door],
      block: [address.block],
      floor: [address.floor],
      postalCode: [address.postalCode, Validators.required],
      isPrimary: [address.isPrimary ?? false],
    });
  }

  getFormData(): BillingaddressDto {
    const values = this.form.value;

   // this.currentAddress.creationDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')!;

    return {
      ...this.currentAddress,
      ...values,
    };
  }

  onSubmit(): void {  
    const address = this.getFormData();

    if (this.isEdit) {
      address.id = this.id!;
      this.billingAddressService.updateBillingAddress(address).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire('Actualizado', 'La dirección se ha actualizado correctamente.', 'success')
              .then(() => this.router.navigate(['/admin/billingAddresses']));
          }
        } 
      });
    } else {
      this.billingAddressService.addBillingAddress(address).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire('Creado', 'La dirección se ha creado correctamente.', 'success')
              .then(() => this.router.navigate(['/admin/billingAddresses']));
          }
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/admin/billingAddresses']);
  }
}
