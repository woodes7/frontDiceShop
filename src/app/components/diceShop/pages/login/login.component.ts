import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';
import { UserDto } from '../../../../model/UserDto';
import { AdminService } from '../../../../service/admin.service';
import { AuthService } from '../../../../service/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router, private adminService: AdminService, private authService: AuthService) { }


  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    if (userData)
      this.router.navigate(['/']);
  }

  onLogin(): void {
    this.userService.login(this.email, this.password).subscribe({
      next: (user: UserDto) => {
        user.password = "";
        this.authService.setUser(user); // Aquí notificas al resto
        this.isAdmin(user);
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas.';
      }
    });
  }

  isAdmin(user: UserDto) {
    this.adminService.isAdmin(user.id).subscribe(
      {
        next: (response) => {
          if (response) {
            this.router.navigate(['/admin']);

          } else {

            this.router.navigate(['/']);
          }
        }
      }
    );
  }
}
