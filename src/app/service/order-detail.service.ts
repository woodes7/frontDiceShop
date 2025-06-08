import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { OrderDetailDto } from '../model/OrderdetailDto';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = `${environment.apiURL}/orderDetail`;

  constructor(private http: HttpClient) {}

  // Obtener todos los detalles de pedidos
  getOrderDetails(): Observable<OrderDetailDto[]> {
    return this.http.get<OrderDetailDto[]>(`${this.apiUrl}/orderDetail`);
  }

  // Obtener detalle de pedido por ID
  getOrderDetail(id: number): Observable<OrderDetailDto> {
    return this.http.get<OrderDetailDto>(`${this.apiUrl}/orderDetail/${id}`);
  }

  // Agregar detalle de pedido
  addOrderDetail(orderDetail: OrderDetailDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, orderDetail);
  }

  // Editar detalle de pedido
  updateOrderDetail(orderDetail: OrderDetailDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, orderDetail);
  }

  // Eliminar detalle de pedido
  deleteOrderDetail(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
}
