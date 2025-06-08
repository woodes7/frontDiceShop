import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '../../../model/UserDto';
import { AuthService } from '../../../service/auth.service';
import { AdminService } from '../../../service/admin.service';
1
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: UserDto | null = null;
  isUserAdmin: boolean;

  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUser();
  }

  isAdmin(userId: number) {
    this.adminService.isAdmin(userId).subscribe(
        {
          next:(response) => {
              this.isUserAdmin = response;
          }
        }
      );
  }

  getUser() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if(this.currentUser)
        this.isAdmin(this.currentUser?.id!);
    });
  }

  logout(): void {
    sessionStorage.removeItem('user');
    window.location.reload();
  }
}
