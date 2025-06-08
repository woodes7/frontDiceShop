import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl: string;
  constructor(public http: HttpClient) { }


  isAdmin(userId: number): Observable<boolean>{
    this.apiUrl = `${environment.apiURL}/Administrator/isAdmin/${userId}`;
    return this.http.get<boolean>(this.apiUrl);
  }

}
