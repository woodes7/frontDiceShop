import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductreviewDto } from '../model/ProductreviewDto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  private apiUrl = `${environment.apiURL}/ProductReview`;

  constructor(private http: HttpClient) { }

  getProductReview(id: number): Observable<ProductreviewDto> {
    return this.http.get<ProductreviewDto>(`${this.apiUrl}/${id}`);
  }
  getProductReviews(): Observable<ProductreviewDto[]> {
    return this.http.get<ProductreviewDto[]>(`${this.apiUrl}/prodcutReviews`);
  }

  addProductReview(review: ProductreviewDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, review);
  }

  updateProductReview(review: ProductreviewDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/edit`, review);
  }

  deleteProductReview(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`, {
      params: { id: id.toString() }
    });
  }

  getReviewsByProductId(productId: number): Observable<ProductreviewDto[]> {
    return this.http.get<ProductreviewDto[]>(`${this.apiUrl}/byProduct/${productId}`);
  }

  getReviewsByProductIdOfUser(productId: number, userId: number): Observable<ProductreviewDto> {
    return this.http.get<ProductreviewDto>(`${this.apiUrl}/byProductOfUser?productId=${productId}&userId=${userId}`);
  }


}
