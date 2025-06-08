import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from '../model/OrderDto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiURL}/order`;

  constructor(private http: HttpClient) {}

  // Obtener todos los pedidos
  getOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.apiUrl}/order`);
  }

  // Obtener un pedido por ID
  getOrder(id: number): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${this.apiUrl}/order?id=${id}`);
  }

   getOrdersByUser(userId: number): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.apiUrl}/orderByUser?userId=${userId}`);
  }

  // Crear un nuevo pedido
  addOrder(order: OrderDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, order);
  }

  // Editar pedido existente
  updateOrder(order: OrderDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, order);
  }

  // Eliminar pedido
  deleteOrder(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete?id=${id}`);
  }
}
