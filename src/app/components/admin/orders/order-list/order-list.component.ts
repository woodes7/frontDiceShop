import { Component, OnInit } from '@angular/core';
import { OrderDto } from '../../../../model/OrderDto';
import { OrderService } from '../../../../service/order.service';
import { OrderDetailService } from '../../../../service/order-detail.service';
import { AuthService } from '../../../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: OrderDto[] = [];
  expandedOrderId: number | null = null;
  selectedStatus: string = "";

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      }
    });
  }

  loadOrderDetails(order: OrderDto): void {
    this.orderDetailService.getOrderDetailsByOrder(order.id).subscribe({
      next: (data) => {
        order.orderDetails = data;
        this.selectedStatus = order.orderStatus;
      },
      error: err => console.error(`Error al cargar detalles para pedido ${order.id}`, err)
    });
  }

changeStatus(order: OrderDto, newStatus: string): void {
  order.orderStatus = newStatus;
  this.updateOrder(order);
}

updateOrder(order: OrderDto){
this.orderService.updateOrder(order).subscribe({
    next: () => {
      Swal.fire('Editado', 'Estado editado', 'success');
    },
    error: () => {
      // si falla, puedes revertir y mostrar alerta
      Swal.fire('Error', 'No se pudo actualizar el estado.', 'error');
    }
  });
}
}
