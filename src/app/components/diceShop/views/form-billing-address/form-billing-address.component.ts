import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingAddressService } from '../../../../service/billing-address.service';
import { BillingaddressDto } from '../../../../model/BillingaddressDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-billing-address',
  standalone: false,
  templateUrl: './form-billing-address.component.html',
  styleUrls: ['./form-billing-address.component.css']
})
export class FormBillingAddressComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id: number | null = null;
  currentAddress: BillingaddressDto = {} as BillingaddressDto;
  addresses: BillingaddressDto[] = [];
  displayedColumns: string[] = ['address', 'actions'];
  isFirst: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private billingAddressService: BillingAddressService
  ) {
    this.loadForm(new BillingaddressDto());
  }

  ngOnInit(): void {
    this.loadUserAddresses();
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
      isPrimary: [address.isPrimary ?? false]
    });
  }

  loadUserAddresses(): void {
    const user = sessionStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : 0;

    this.billingAddressService.getBillingAddressesByUser(userId).subscribe({
      next: (res) => {
        if (res.length == 0)
          this.isFirst = true;
        this.addresses = res;
      }
    });
  }


  getFormData(): BillingaddressDto {
    const user = sessionStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : 0;

    const values = this.form.value;
    return {
      ...this.currentAddress,
      ...values,
      userId: userId,
      isPrimary: this.isFirst ? true : values.isPrimary
    };
  }

  editInline(address: BillingaddressDto): void {
    this.router.navigate([`/views/billingAddress/${address.id}`])
    this.isEdit = true;
    this.currentAddress = address;
    this.loadForm(address);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // opcional: hace scroll al formulario
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const address = this.getFormData();

    if (this.isEdit) {
      this.billingAddressService.updateBillingAddress(address).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire('Actualizado', 'Dirección actualizada correctamente', 'success')
              .then(() => this.ngOnInit());
          }
        }
      });
    } else {
      this.billingAddressService.addBillingAddress(address).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire('Creado', 'Dirección creada correctamente', 'success')
              .then(() => this.router.navigate([`/views/billingAddress/${address.id}`]));
          }
        }
      });
    }
  }

  createNewAddress() {
    this.router.navigate(['/views/billingAddress']);
  }

  onBack(): void {
    this.router.navigate(['/views/pay']);
  }
}
