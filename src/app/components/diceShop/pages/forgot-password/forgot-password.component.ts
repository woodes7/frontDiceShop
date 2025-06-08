import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private userService: UserService,) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });    
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const email = this.form.value.email;

    this.userService.forgotPassword(email).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Se ha enviado un correo para restablecer tu contraseña.', 'success');
      },
      error: () => {
        Swal.fire('Error', 'No se encontró ninguna cuenta con ese correo.', 'error');
      }
    });
  }

}
