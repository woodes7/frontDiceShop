import { Component } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';
import { UserDto } from '../../../../model/UserDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: UserDto = {
    id: 0,
    fullName: '',
    email: '',
    phone: '',
    avatar: '',
    password: '',
    emailConfirmed: false,
    registrationDate: null
  };
  confirmed: boolean;

  constructor(private userService: UserService, private router: Router) { }

  onRegister(): void {
    if (!this.user.fullName || !this.user.email || !this.user.password) {
      Swal.fire('Error', 'Por favor, completa todos los campos obligatorios', 'warning');
      return;
    }
    this.getUser();
  }
  getUser() {
    this.userService.checkUser(this.user.email).subscribe(
      {
        next: (response) => {
          if (!response) {
              Swal.fire({
                icon: 'warning',
                title: 'Ya existe un usuario no confirmado',
                text: 'Parece que ya existe un usuario con este correo pero no ha sido confirmado',
                confirmButtonText:'Enviar confirmación',
                cancelButtonText:'Cancelar'
              })
                .then((res) => {
                  if(res.isConfirmed)
                    this.userService.sendConfirmationEmail(this.user.email).subscribe(
                      {
                        next:(response) => {                        
                        }
                      }
                    );
                });
            
          } else
            this.register();
        }
      }
    );
  }

  register() {
    this.userService.register(this.user).subscribe({
      next: (success) => {
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Usuario registrado correctamente. Revisa tu correo para confirmar tu cuenta.'
          })
            .then(() => this.router.navigate(['/login']));
        } else {
          Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
        }
      },
      error: () => {
        Swal.fire('Error', 'Correo ya registrado o error en el servidor', 'error');
      }
    });
  }
}
