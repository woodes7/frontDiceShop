import { Component } from '@angular/core';
import { OrderDto } from '../../../../model/OrderDto';
import { OrderService } from '../../../../service/order.service';
import { OrderDetailDto } from '../../../../model/OrderdetailDto';
import { OrderDetailService } from '../../../../service/order-detail.service';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: OrderDto[] = [];
  expandedOrderId: number | null = null;

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.authService.currentUser$.subscribe(
      {
        next: (response) => {
          if (response)
            this.orderService.getOrdersByUser(response?.id).subscribe({
              next: (data) => {
                this.orders = data;
              }
            });
        }
      }
    )

  }

  loadOrderDetails(order: OrderDto): void {
      this.orderDetailService.getOrderDetailsByOrder(order.id).subscribe({
      next: (data) => {
       order.orderDetails = data;
      },
      error: err => console.error(`Error al cargar detalles para pedido ${order.id}`, err)
    });
  }
}
