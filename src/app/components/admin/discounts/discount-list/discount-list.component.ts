import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../../../service/discount.service';
import { DiscountDto } from '../../../../model/DiscountDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount-list',
  standalone: false,
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'amount', 'discountType', 'startDate', 'endDate', 'active', 'actions'];
  discounts: DiscountDto[] = [];
    pageSize = 10;
  pageNumber = 1;
  totalItems = 0;
  searchTerm = '';

  constructor(
    private discountService: DiscountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDiscounts();
  }

   getDiscounts(): void {
    this.discountService.getDiscountsPaged(this.pageNumber, this.pageSize, this.searchTerm).subscribe({
      next: (response) => {
        this.discounts = response.items;
        this.totalItems = response.totalCount;
      }
    });
  }

  onSearchChange(): void {
    this.pageNumber = 1;
    this.getDiscounts();
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getDiscounts();
  }

  onAdd(): void {
    this.router.navigate(['/admin/discounts/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/discounts/form', id]);
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
        this.discountService.deleteDiscount(id).subscribe((res) => {
          if (res) {
            Swal.fire('Eliminado', 'El descuento ha sido eliminado correctamente.', 'success')
              .then(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/admin/discounts']);
                });
              });
          }
        });
      }
    });
  }
}
