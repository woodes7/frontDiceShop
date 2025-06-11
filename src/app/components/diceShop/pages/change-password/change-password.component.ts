import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../service/user.service'; // Ajusta si la ruta cambia
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
  }
  
onChangePassword(): void {
  if (this.newPassword !== this.confirmPassword) {
    Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    return;
  }

  this.userService.resetPasswordWithToken(this.token, this.newPassword).subscribe({
    next: (res) => {
      Swal.fire('Éxito', res.message, 'success');
    },
    error: (err) => {
      Swal.fire('Error', err.error.message || 'Token inválido o expirado', 'error');
    }
  });
}

}
