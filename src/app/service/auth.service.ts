import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../model/UserDto'; // Ajusta el path si es diferente

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
   private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();

  constructor() {
    this.loadUserFromSession();
  }

  setUser(user: UserDto): void {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

   setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  loadUserFromSession(): void {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user: UserDto = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
    }
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('user');
  }

  getUser(): UserDto | null {
    return this.currentUserSubject.value;
  }
}
