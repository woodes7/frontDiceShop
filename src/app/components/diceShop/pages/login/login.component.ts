import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';
import { UserDto } from '../../../../model/UserDto';
import { AdminService } from '../../../../service/admin.service';
import { AuthService } from '../../../../service/auth.service';
import Swal from 'sweetalert2';
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
   this.getUser();
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

  login(){
     this.userService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        response.password = "";
        this.authService.setUser(response.user); // Aquí notificas al resto
        this.authService.setToken(response.token);
        this.isAdmin(response.user);
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas.';
      }
    });
  }

  getUser() {
      this.userService.checkUser(this.email).subscribe(
        {
          next: (response) => {
              if (response.email != "") {
                if(response.confirmed == false){
                Swal.fire({
                  icon: 'warning',
                  title: 'No ha confirmado su cuenta',
                  text: 'Parece que no ha confirmado la cuenta con este correo',
                  confirmButtonText:'Enviar confirmación',
                  cancelButtonText:'Cancelar'
                })
                  .then((res) => {
                    if(res.isConfirmed)
                      this.userService.sendConfirmationEmail(this.email).subscribe();
                  });
              }else
                this.login();
            } else
              this.errorMessage = 'Credenciales incorrectas.';
          }
        }
      );
    }
}
