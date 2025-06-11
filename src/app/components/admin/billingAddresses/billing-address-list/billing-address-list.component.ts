import { Component, OnInit } from '@angular/core';
import { BillingAddressService } from '../../../../service/billing-address.service';
import { BillingaddressDto } from '../../../../model/BillingaddressDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing-address-list',
  standalone: false,
  templateUrl: './billing-address-list.component.html',
  styleUrls: ['./billing-address-list.component.css']
})
export class BillingAddressListComponent implements OnInit {
    pageSize = 10;
  pageNumber = 1;
  totalItems = 0;
  searchTerm = '';
  displayedColumns: string[] = [
    'userFullName',
    'country',
    'state',
    'city',
    'street',
    'postalCode',
    'isPrimary',
    'creationDate',
    'actions'
  ];
  billingAddresses: BillingaddressDto[] = [];

  constructor(
    private billingAddressService: BillingAddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBillingAddresses();
  }

   getBillingAddresses(): void {
    this.billingAddressService.getBillingAddressesPaged(this.pageNumber, this.pageSize, this.searchTerm).subscribe({
      next: (response) => {
        this.billingAddresses = response.items;
        this.totalItems = response.totalCount;
      }
    });
  }

  onSearchChange(): void {
    this.pageNumber = 1;
    this.getBillingAddresses();
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getBillingAddresses();
  }

  onAdd(): void {
    this.router.navigate(['/admin/billingAddresses/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/billingAddresses/form', id]);
  }
onDelete(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.billingAddressService.deleteBillingAddress(id).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire('Eliminado', 'La dirección de facturación ha sido eliminada correctamente.', 'success')
              .then(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/admin/billingAddresses']);
                });
              });
          }
        },
        error: (err) => {
          // Personaliza este bloque según el error que lance tu backend
          if (err.status === 409 || err.status === 400 || (err.error && err.error.toString().includes('FOREIGN KEY'))) {
            Swal.fire(
              'No se puede eliminar',
              'No se puede eliminar la dirección porque está asociada a otros registros. Elimina primero las relaciones dependientes.',
              'error'
            );
          } else {
            Swal.fire(
              'Error',
              'Ocurrió un error al intentar eliminar la dirección de facturación.',
              'error'
            );
          }
        }
      });
    }
  });
}
}
