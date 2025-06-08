import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillingaddressDto } from '../model/BillingaddressDto';
import { environment } from '../../environments/environment.development';
import { PagedResult } from '../model/PagedResult';

@Injectable({
  providedIn: 'root'
})
export class BillingAddressService {
  private apiUrl = `${environment.apiURL}/BillingAddress`;

  constructor(private http: HttpClient) {}

  // Obtener todas las direcciones de facturación
  getBillingAddresses(): Observable<BillingaddressDto[]> {
    return this.http.get<BillingaddressDto[]>(`${this.apiUrl}/billingAdresses`);
  }

  getBillingAddressesPaged(pageNumber: number, pageSize: number, search?: string): Observable<PagedResult<BillingaddressDto>> {
  const params: any = { pageNumber, pageSize };
  if (search) {
    params.search = search;
  }
  return this.http.get<PagedResult<BillingaddressDto>>(`${this.apiUrl}/billingAdressesPaged`, { params });
}

  
  // Obtener una dirección de facturación por ID
  getBillingAddress(id: number): Observable<BillingaddressDto> {
    return this.http.get<BillingaddressDto>(`${this.apiUrl}/billingAddress/${id}`);
  }

  // Agregar nueva dirección de facturación
  addBillingAddress(address: BillingaddressDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, address);
  }

  // Editar dirección de facturación
  updateBillingAddress(address: BillingaddressDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, address);
  }

  // Eliminar dirección de facturación
  deleteBillingAddress(id: number): Observable<boolean> {
    // El backend espera el ID como parámetro en la URL, aunque no lo declaraste explícitamente.
    // Asegúrate que acepte `[HttpDelete("delete/{id}")]` para que sea RESTful.
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }

  getPrimaryBillingAddressByUser(userId: number): Observable<BillingaddressDto> {
    return this.http.get<BillingaddressDto>(`${this.apiUrl}/primary/${userId}`);
  }

}
