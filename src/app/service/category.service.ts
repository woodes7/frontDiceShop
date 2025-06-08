import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from '../model/CategoryDto'; // Ajusta si es otro path
import { environment } from '../../environments/environment.development';
import { PagedResult } from '../model/PagedResult';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiURL}/Category`;

  constructor(private http: HttpClient) { }

  // GET: Obtener todas las categorías
  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/categories`);
  }

  getCategoriesPaged(page: number, pageSize: number, search: string = ''): Observable<PagedResult<CategoryDto>> {
    return this.http.get<PagedResult<CategoryDto>>(
      `${this.apiUrl}/categoriesPaged?page=${page}&pageSize=${pageSize}&search=${search}`
    );
  }

  // GET: Obtener una categoría por ID
  getCategoryById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiUrl}/${id}`);
  }

  // POST: Crear nueva categoría
  addCategory(category: CategoryDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, category);
  }

  // PUT: Editar categoría
  updateCategory(category: CategoryDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, category);
  }

  // DELETE: Eliminar categoría por ID
  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
}
