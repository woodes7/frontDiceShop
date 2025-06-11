import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../service/category.service';
import { CategoryDto } from '../../../../model/CategoryDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  categories: CategoryDto[];
  totalItems = 0;
  pageIndex = 0;
  pageSize = 5;
  searchTerm = '';

  constructor(private categoryService: CategoryService, private router: Router) {
    this.categories = [];

  }
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategoriesPaged(this.pageIndex + 1, this.pageSize, this.searchTerm)
      .subscribe(result => {
        this.categories = result.items;
        this.totalItems = result.totalCount;
      });
  }

  onSearchChange(): void {
    this.pageIndex = 0;
    this.loadCategories();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories();
  }

  onAdd(): void {
    this.router.navigate(['/admin/categories/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/categories/form', id]);
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
        this.categoryService.deleteCategory(id).subscribe({
          next: (res) => {
            if (res) {
              Swal.fire('Eliminado', 'La categoría ha sido eliminada correctamente.', 'success')
                .then(() => {
                  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/admin/categories']);
                  });
                });
            }
          },
          error: (err) => {
            // Aquí capturas el error de Foreign Key
            if (err.status === 409 || err.status === 400 || err.error?.includes('FOREIGN KEY')) {
              Swal.fire(
                'No se puede eliminar',
                'La categoría está asociada a uno o más productos. Elimina primero los productos asociados.',
                'error'
              );
            } else {
              Swal.fire(
                'Error',
                'Ocurrió un error al intentar eliminar la categoría.',
                'error'
              );
            }
          }
        });
      }
    });
  }


}
