import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ShoppingcartitemDto } from '../model/ShoppingcartitemDto';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartItemService {
  private apiUrl = `${environment.apiURL}/ShoppingCartItem`;

  constructor(private http: HttpClient) {}

  getItemsByCartId(cartId: number, isCart: boolean = false): Observable<ShoppingcartitemDto[]> {
    return this.http.get<ShoppingcartitemDto[]>(`${this.apiUrl}/${cartId}/items?isCart=${isCart}`);
  }

  getItemById(id: number): Observable<ShoppingcartitemDto> {
    return this.http.get<ShoppingcartitemDto>(`${this.apiUrl}/item/${id}`);
  }

  addItem(item: ShoppingcartitemDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, item);
  }

  updateItem(item: ShoppingcartitemDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, item);
  }

  deleteItem(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
}