import { Component, OnInit } from '@angular/core';
import { ProductreviewDto } from '../../../../model/ProductreviewDto';
import { ProductReviewService } from '../../../../service/product-review.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-review-list',
  standalone: false,
  templateUrl: './productreview-list.component.html',
  styleUrls: ['./productreview-list.component.css']
})
export class ProductreviewListComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'userFullName',
    'rating',
    'comment',
    'reviewDate',
    'actions'
  ];
  reviews: ProductreviewDto[] = [];

  constructor(
    private productReviewService: ProductReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.productReviewService.getProductReviews().subscribe({
      next: (response) => {
        this.reviews = response;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las reseñas', 'error');
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['/admin/reviews/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin/reviews/form', id]);
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
        this.productReviewService.deleteProductReview(id).subscribe((res) => {
          if (res) {
            Swal.fire('Eliminado', 'La reseña ha sido eliminada correctamente.', 'success')
              .then(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/admin/reviews']);
                });
              });
          }
        });
      }
    });
  }
}
