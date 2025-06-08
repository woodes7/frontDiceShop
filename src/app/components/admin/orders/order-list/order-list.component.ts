import { Component, OnInit } from '@angular/core';
import { OrderDto } from '../../../../model/OrderDto';
import { OrderService } from '../../../../service/order.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  standalone:false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit { 

  displayedColumns: string[] = ['userFullName', 'orderDate', 'status', 'actions'];
  orders: OrderDto[];

constructor(private orderService: OrderService, private router: Router) {
   this.orders = [];
}
  ngOnInit(): void {
    this.get();
  }

  get(){

    this.orderService.getOrders().subscribe({
      next:(respose)=>{
        this.orders = respose;
      }
    })
  }

   onAdd(): void {
    this.router.navigate(['/admin/orders/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/orders/form', id]);
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
        this.orderService.deleteOrder(id).subscribe((res) => {
          if (res) {
            Swal.fire('Eliminado', 'La categoría ha sido eliminada correctamente.', 'success')
            .then(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/admin/orders']);

              });
            });
          }
        });
      }
    });
  }

}
