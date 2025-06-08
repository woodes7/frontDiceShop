import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountDto } from '../model/DiscountDto';
import { environment } from '../../environments/environment.development';
import { PagedResult } from '../model/PagedResult';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private apiUrl = `${environment.apiURL}/Discount`;

  constructor(private http: HttpClient) {}

  // Obtener todos los descuentos
  getDiscounts(): Observable<DiscountDto[]> {
    return this.http.get<DiscountDto[]>(`${this.apiUrl}/discounts`);
  }

  getDiscountsPaged(pageNumber: number, pageSize: number, search?: string): Observable<PagedResult<DiscountDto>> {
  let params = new HttpParams()
    .set('pageNumber', pageNumber)
    .set('pageSize', pageSize);

  if (search) {
    params = params.set('search', search);
  }
  console.log("etras")
  return this.http.get<PagedResult<DiscountDto>>(`${this.apiUrl}/discountsPaged`, { params });
}


  // Obtener un descuento por ID
  getDiscount(id: number): Observable<DiscountDto> {
    return this.http.get<DiscountDto>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo descuento
  addDiscount(discount: DiscountDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, discount);
  }

  // Editar descuento existente
  updateDiscount(discount: DiscountDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, discount);
  }

  // Eliminar descuento
  deleteDiscount(id: number): Observable<boolean> {
    // El backend espera `id` como query param. Sería mejor cambiarlo a /delete/{id}
    return this.http.delete<boolean>(`${this.apiUrl}/delete?id=${id}`);
  }
}
