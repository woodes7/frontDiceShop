import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { UserDto } from '../../../model/UserDto';
import { AuthService } from '../../../service/auth.service';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: UserDto | null = null;
  isUserAdmin: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.authService.currentUser$,
        this.authService.token$
      ]).subscribe(([user, token]) => {
        this.currentUser = user;
        if (user && token) {
          this.isAdmin(user.id);
        } else {
          this.isUserAdmin = false;
        }
      })
    );
  }

  isAdmin(userId: number) {
    this.adminService.isAdmin(userId).subscribe({
      next: (response) => {
        this.isUserAdmin = response;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
