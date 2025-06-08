import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');

    console.log(this.token);
    if (this.token) {
      this.userService.confirmEmail(this.token).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Tu cuenta ha sido confirmada correctamente', 'success')
            .then(() => this.router.navigate(['/pages/login']));
        },
        error: () => {
          Swal.fire('Error', 'No se pudo confirmar tu cuenta', 'error')
            .then(() => this.router.navigate(['/pages/register']));
        }
      });
    } else {
      Swal.fire('Error', 'Token no válido', 'error');
    }
  }
}
