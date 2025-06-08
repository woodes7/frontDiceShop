import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponDto } from '../model/CouponDto';
import { environment } from '../../environments/environment.development';
import { PagedResult } from '../model/PagedResult'; // Asegúrate de tener esta clase

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private baseUrl = `${environment.apiURL}/coupon`;

  constructor(private http: HttpClient) {}

  getCoupons(): Observable<CouponDto[]> {
    return this.http.get<CouponDto[]>(`${this.baseUrl}/cupons`);
  }

  getCouponsPaged(pageNumber: number, pageSize: number, search?: string): Observable<PagedResult<CouponDto>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PagedResult<CouponDto>>(`${this.baseUrl}/cuponsPaged`, { params });
  }

  getCouponById(id: number): Observable<CouponDto> {
    return this.http.get<CouponDto>(`${this.baseUrl}/${id}`);
  }

  addCoupon(coupon: CouponDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add`, coupon);
  }

  updateCoupon(coupon: CouponDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/edit`, coupon);
  }

  deleteCoupon(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete/${id}`);
  }
}
