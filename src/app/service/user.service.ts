import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../model/UserDto';
import { environment } from '../../environments/environment.development';
import { PagedResult } from '../model/PagedResult';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiURL}/User`;

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/users`);
  }

  getUsersPaged(pageNumber: number, pageSize: number, search?: string): Observable<PagedResult<UserDto>> {
    const params: any = { pageNumber, pageSize };
    if (search) {
      params.search = search;
    }

    return this.http.get<PagedResult<UserDto>>(`${this.apiUrl}/usersPaged`, { params });
  }


  // Obtener un usuario por ID
  getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/user/${id}`);
  }

  // Crear nuevo usuario
  addUser(user: UserDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/add`, user);
  }

  // Editar usuario existente
  updateUser(user: UserDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/edit`, user);
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }

  // inicio sesión
  login(email: string, password: string): Observable<UserDto> {
    let params = new HttpParams()
      .set('email', email)
      .set('pass', password);
    return this.http.get<UserDto>(`${this.apiUrl}/login`, { params });
  }

  
register(user: UserDto): Observable<boolean> {
  return this.http.post<boolean>(`${this.apiUrl}/register`, user).pipe(
    switchMap(success => {
      if (success) {
        return this.sendConfirmationEmail(user.email);
      } else {
        throw new Error('Error al registrar usuario');
      }
    })
  );
}


  changePassword(userId: number, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      userId,
      newPassword
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiURL}/token/generateToken?email=${email}`, {});
  }
  
  resetPasswordWithToken(token: string, newPassword: string): Observable<any> {
  console.log("4");

  const params = new HttpParams()
    .set('tokenValue', token)
    .set('newPassword', newPassword);
  console.log("5");
  return this.http.post(`${environment.apiURL}/token/reset-password`, null, { params });
}

sendConfirmationEmail(email: string): Observable<boolean> {
  const params = new HttpParams().set('email', email);
  return this.http.post<boolean>(`${this.apiUrl}/send-confirmation`, null, { params });
}

  confirmEmail(token: string) {
    const params = new HttpParams().set('token', token);
    return this.http.post(`${this.apiUrl}/confirm-email`, null, { params });
  }


}


