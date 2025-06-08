import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto } from '../model/ProductDto'; // Asegúrate de tener este modelo creado
import { environment } from '../../environments/environment.development';
import { PagedResult } from '../model/PagedResult';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiURL}/Product`;

  constructor(private http: HttpClient) {}

  // getProducts(): Observable<ProductDto[]> {
  //   return this.http.get<ProductDto[]>(`${this.apiUrl}/products`);
  // }

  getProductById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/${id}`);
  }

  getProducts(pageNumber: number, pageSize: number, category?: string, search?: string): Observable<PagedResult<ProductDto>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (category) params = params.set('categoryId', category);
    if (search) params = params.set('search', search);

    return this.http.get<PagedResult<ProductDto>>(`${this.apiUrl}/products`, { params });
  }

  addProduct(product: ProductDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, product);
  }

  updateProduct(product: ProductDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, product);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/products`, { params: { id: id.toString() } });
  }
}
