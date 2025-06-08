import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { OrderRequest } from '../model/OrderRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiURL}/Payment`;

  constructor(private http: HttpClient) { }

  pay(order: OrderRequest): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(
      `${this.apiUrl}/create-checkout-session`,
      order
    );
  }
  postPurchase(userId: number): Observable<boolean> {
    console.log(this.apiUrl)
    return this.http.get<boolean>(`${this.apiUrl}/postPurchase?userId=${userId}`)
  }

}
