import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { ProductDto } from '../../../../model/ProductDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'image', 'name', 'description', 'price', 'stock',
    'categoryName', 'discountCode', 'active', 'releaseDate', 'actions'
  ];
  products: ProductDto[] = [];

  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.pageNumber, this.pageSize, null!, this.searchTerm).subscribe({
      next: (response) => {
        this.products = response.items;
        this.totalItems = response.totalCount;
      }
    });
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onSearchChange(): void {
    this.pageNumber = 1;
    this.paginator.firstPage();
    this.loadProducts();
  }

  onAdd(): void {
    this.router.navigate(['/admin/products/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/products/form', id]);
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
        this.productService.deleteProduct(id).subscribe((res) => {
          if (res) {
            Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente.', 'success')
              .then(() => {
                this.loadProducts(); // Recargar después de eliminar
              });
          }
        });
      }
    });
  }
}
