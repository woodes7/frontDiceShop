import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../model/UserDto'; // Ajusta el path si es diferente

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromSession();
  }

  setUser(user: UserDto): void {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
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
