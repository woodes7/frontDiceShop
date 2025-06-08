import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethodDto } from '../model/PaymentMethodDto';
import { environment } from '../../environments/environment.development';
import { ShoppingcartDto } from '../model/ShoppingcartDto';
import { OrderRequest } from '../model/OrderRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private apiUrl = `${environment.apiURL}/PaymentMethod`;

  constructor(private http: HttpClient) { }

  // Obtener todos los métodos de pago
  getPaymentMethods(): Observable<PaymentMethodDto[]> {
    return this.http.get<PaymentMethodDto[]>(`${this.apiUrl}/paymentMethod`);
  }

  // Obtener un método de pago por ID de usuario
  getPaymentMethod(id: number): Observable<PaymentMethodDto> {
    return this.http.get<PaymentMethodDto>(`${this.apiUrl}/user/${id}`);
  }

  // Crear nuevo método de pago
  addPaymentMethod(paymentMethod: PaymentMethodDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, paymentMethod);
  }

  // Editar método de pago existente
  updatePaymentMethod(paymentMethod: PaymentMethodDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, paymentMethod);
  }

  // Eliminar método de pago por ID (query param)
  deletePaymentMethod(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }

pay(order: OrderRequest): Observable<{ url: string }> {
  return this.http.post<{ url: string }>(
    `${this.apiUrl}/create-checkout-session`,
    order
  );
}




}
