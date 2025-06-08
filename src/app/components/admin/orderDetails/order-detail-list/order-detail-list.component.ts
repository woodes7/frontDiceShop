import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderDetailService } from '../../../../service/order-detail.service';
import { OrderDetailDto } from '../../../../model/OrderdetailDto';

@Component({
  selector: 'app-order-detail-list',
  standalone: false,
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.css']
})
export class OrderDetailListComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'productId', 'quantity', 'unitPrice', 'actions'];
  orderDetails: OrderDetailDto[] = [];

  constructor(
    private orderDetailService: OrderDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.orderDetailService.getOrderDetails().subscribe({
      next: (response) => {
        this.orderDetails = response;
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['orderDetails/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['orderDetails/form', id]);
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
        this.orderDetailService.deleteOrderDetail(id).subscribe((res) => {
          if (res) {
            Swal.fire('Eliminado', 'El detalle del pedido ha sido eliminado correctamente.', 'success')
              .then(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['orderDetails']);
                });
              });
          }
        });
      }
    });
  }
}
