import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '../../../../model/UserDto';
import { UserService } from '../../../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  user: UserDto;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.loadForm(new UserDto());
    this.user = new UserDto();
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;

    if (this.isEdit) {
      this.getUser(this.id!);
    } else {
      this.loadForm(new UserDto());
    }
  }

  loadForm(user: UserDto) {
    this.form = this.fb.group({
      fullName: [user.fullName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone],
      password: [user.password],
      avatar: [user.avatar],
    });
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user = response;
        this.loadForm(response);
      }
    });
  }

  getUserForm(): UserDto {
    const user = new UserDto();

    user.fullName = this.form.controls['fullName'].value;
    user.email = this.form.controls['email'].value;
    user.phone = this.form.controls['phone'].value;
    user.password = this.form.controls['password'].value;
    user.avatar = this.form.controls['avatar'].value;

    return user;
  }

  onSubmit(): void {
    const user = this.getUserForm();

    if (this.form.valid) {
      if (this.isEdit) {
        user.id = this.id!;
        user.registrationDate = this.user.registrationDate;
        this.update(user);
      } else {
        this.add(user);
      }
    }
  }

  add(user: UserDto) {
    this.userService.addUser(user).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Creado', 'El usuario se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/users']));
        }
      }
    });
  }

  update(user: UserDto) {
    this.userService.updateUser(user).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Actualizado', 'El usuario se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/users']));
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }
}
