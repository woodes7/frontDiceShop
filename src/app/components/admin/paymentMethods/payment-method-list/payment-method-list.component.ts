import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaymentMethodService } from '../../../../service/payment-method.service';
import { PaymentMethodDto } from '../../../../model/PaymentMethodDto';

@Component({
  selector: 'app-payment-method-list',
  standalone: false,
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {
  displayedColumns: string[] = ['userFullName', 'paymentType', 'paymentDetails', 'isPrimary', 'creationDate', 'actions'];
  paymentMethods: PaymentMethodDto[] = [];

  constructor(
    private paymentMethodService: PaymentMethodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPaymentMethods();
  }

  getPaymentMethods(): void {
    this.paymentMethodService.getPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods = response;
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['/admin/paymentMethods/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/paymentMethods/form', id]);
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
        this.paymentMethodService.deletePaymentMethod(id).subscribe((res) => {
          if (res) {
            Swal.fire('Eliminado', 'El método de pago ha sido eliminado correctamente.', 'success')
              .then(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/admin/paymentMethods']);
                });
              });
          }
        });
      }
    });
  }
}
