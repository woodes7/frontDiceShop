import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductreviewDto } from '../../../../model/ProductreviewDto';
import { ProductReviewService } from '../../../../service/product-review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-review-form',
  standalone: false,
  templateUrl: './productreview-form.component.html'
})
export class ProductreviewFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productReviewService: ProductReviewService,
    private router: Router
  ) {
    this.loadForm(new ProductreviewDto());
  }

  loadForm(review: ProductreviewDto): void {
    this.form = this.fb.group({
      productId: [review.productId, Validators.required],
      userId: [review.userId, Validators.required],
      rating: [review.rating, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [review.comment, Validators.required],
      reviewDate: [review.reviewDate]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;

    if (this.isEdit) {
      this.getReview(this.id!);
    } else {
      this.loadForm(new ProductreviewDto());
    }
  }

  getReview(id: number): void {
    this.productReviewService.getProductReview(id).subscribe({
      next: (response) => this.loadForm(response)
    });
  }

  getReviewForm(): ProductreviewDto {
    const review = new ProductreviewDto();
    review.productId = this.form.controls['productId'].value;
    review.userId = this.form.controls['userId'].value;
    review.rating = this.form.controls['rating'].value;
    review.comment = this.form.controls['comment'].value;
    review.reviewDate = this.form.controls['reviewDate'].value;
    return review;
  }

  onSubmit(): void {
    const review = this.getReviewForm();
    if (this.form.valid) {
      if (this.isEdit) {
        review.id = this.id!;
        this.update(review);
      } else {
        this.add(review);
      }
    }
  }

  add(review: ProductreviewDto): void {
    this.productReviewService.addProductReview(review).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Creado', 'La reseña se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/reviews']));
        }
      }
    });
  }

  update(review: ProductreviewDto): void {
    this.productReviewService.updateProductReview(review).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire('Actualizado', 'La reseña se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/reviews']));
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/admin/reviews']);
  }
}
