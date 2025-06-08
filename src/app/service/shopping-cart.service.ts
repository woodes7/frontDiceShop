import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ShoppingcartDto } from '../model/ShoppingcartDto';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl = `${environment.apiURL}/ShoppingCart`;

  constructor(private http: HttpClient) {}

  getShoppingCarts(): Observable<ShoppingcartDto[]> {
    return this.http.get<ShoppingcartDto[]>(`${this.apiUrl}`);
  }

  getShoppingCartById(id: number): Observable<ShoppingcartDto> {
    return this.http.get<ShoppingcartDto>(`${this.apiUrl}/${id}`);
  }

  getShoppingCartByUserId(userId: number): Observable<ShoppingcartDto> {
    return this.http.get<ShoppingcartDto>(`${this.apiUrl}/getByUser?userId=${userId}`);
  }

  addShoppingCart(cart: ShoppingcartDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, cart);
  }

  updateShoppingCart(cart: ShoppingcartDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, cart);
  }

  deleteShoppingCart(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
}