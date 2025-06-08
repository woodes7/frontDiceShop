import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../../service/user.service';
import { UserDto } from '../../../../model/UserDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  form!: FormGroup;
  user: UserDto = {} as UserDto;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    this.loadForm(new UserDto())
  }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.getUser(this.user.id);
    } else
      this.router.navigate(['/']);
  }

  getUser(userId: number) {
    this.userService.getUser(userId).subscribe(
      {
        next: (response) => {
          if (response)
            this.loadForm(response);
        }
      }
    );
  }

  loadForm(user: UserDto): void {
    this.form = this.fb.group({
      fullName: [user.fullName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone],
      avatar: [user.avatar],
      password: [user.password]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const updatedUser = { ...this.user, ...this.form.value };
    this.userService.updateUser(updatedUser).subscribe({
      next: (res) => {
        if (res) {
          Swal.fire('Actualizado', 'Datos del usuario actualizados', 'success');
          Swal.fire('Actualizado', 'Datos del usuario actualizados', 'success')
            .then(() => location.reload());
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }


}
