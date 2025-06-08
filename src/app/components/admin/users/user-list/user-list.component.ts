import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { UserDto } from '../../../../model/UserDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'avatar', 'actions'];
  users: UserDto[] = [];
   pageSize = 10;
  pageNumber = 1;
  totalItems = 0;
  searchTerm = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsersPaged(this.pageNumber, this.pageSize, this.searchTerm).subscribe({
      next: (response) => {
        this.users = response.items;
        this.totalItems = response.totalCount;
      }
    });
  }

  onSearchChange(): void {
    this.pageNumber = 1;
    this.getUsers();
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  onAdd(): void {
    this.router.navigate(['users/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['users/form', id]);
  }

  onDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((res) => {
          if (res) {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado correctamente.', 'success')
              .then(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['users']);
                });
              });
          }
        });
      }
    });
  }
}
