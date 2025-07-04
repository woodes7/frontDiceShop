import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../service/product.service';
import { ProductDto } from '../../../../model/ProductDto';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { ShoppingCartItemService } from '../../../../service/shopping-cart-item.service';
import { ShoppingcartDto } from '../../../../model/ShoppingcartDto';
import { ShoppingcartitemDto } from '../../../../model/ShoppingcartitemDto';
import { UserDto } from '../../../../model/UserDto';
import Swal from 'sweetalert2';
import { ProductreviewDto } from '../../../../model/ProductreviewDto';
import { ProductReviewService } from '../../../../service/product-review.service';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: ProductDto;
  user: UserDto;
  quantity: number = 1;
  reviews: ProductreviewDto[] = [];
  newReview: ProductreviewDto = new ProductreviewDto();
  isLoggedIn: boolean = false;
  hasReviewed: boolean = false;
  isEditing: boolean = false;
  existingReview: ProductreviewDto;
  noReviws: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private shoppingCartItemService: ShoppingCartItemService,
    private router: Router,
    private productReviewService: ProductReviewService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.getReviewsByProductOfUser();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
      console.log(product)
      this.loadReviews();
      console.log(this.noReviws);
    });
  }

  getReviewsByProductOfUser() {
    this.authService.currentUser$.subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
          this.isLoggedIn = true;
          this.productId = Number(this.route.snapshot.paramMap.get('id'));

          this.productReviewService.getReviewsByProductIdOfUser(this.productId, response.id).subscribe({
            next: (review) => {
              if (review) {
                this.hasReviewed = true;
                this.existingReview = review;
                this.newReview = { ...review }; // prellenamos el formulario
              }
            }
          });
        }
      }
    });
  }
  getDiscountedPrice(): number {
    if (!this.product?.discount || !this.product.discount.active) {
      return this.product.price ?? 0;
    }

    const { discountType, amount } = this.product.discount;

    if (discountType === 'PERCENTAGE') {
      return (this.product.price ?? 0) * (1 - (amount ?? 0) / 100);
    }

    if (discountType === 'FIXED') {
      return Math.max((this.product.price ?? 0) - (amount ?? 0), 0);
    }

    return this.product.price ?? 0;
  }

  onAddToCart(): void {
    this.authService.currentUser$.subscribe(
      {
        next: (user) => {
          if (user == null)
            this.router.navigate(['/pages/login'])
          else
            this.shoppingCartService.getShoppingCartByUserId(user.id).subscribe({
              next: (response) => {
                if (response) {
                  let item = this.createCartItem(response.id);
                  this.addItem(item);
                } else {
                  let cart = this.createCart(user.id);
                  this.addCart(cart);
                }
              }
            });
        }
      }
    );

  }

  loadReviews() {
    this.productReviewService.getReviewsByProductId(this.productId).subscribe({
      next: (res) => {

        if (res.length != 0)
          this.reviews = res;
        else
          this.noReviws = true;
      }
    });
  }

  createCart(userId: number): ShoppingcartDto {
    let cart = new ShoppingcartDto();
    cart.userId = userId;
    return cart;
  }

  createCartItem(cartId: number): ShoppingcartitemDto {
    let item = new ShoppingcartitemDto();

    item.productId = this.product.id;
    item.quantity = this.quantity;
    item.shoppingCartId = cartId;
    
  // Aplicar descuento si existe y está activo
  if (this.product.discount && this.product.discount.active) {
     item.unitPrice = this.getDiscountedPrice(); 
    return item;
  }
    item.unitPrice = this.product.price!;
    item.active = true;

    return item;
  }


  addCart(cart: ShoppingcartDto) {
    this.shoppingCartService.addShoppingCart(cart).subscribe(
      {
        next: (isAdded) => {
          if (isAdded) {
            this.shoppingCartService.getShoppingCartByUserId(cart.userId).subscribe(
              {
                next: (response) => {
                  if (response) {
                    let item = this.createCartItem(response.id);
                    this.addItem(item);
                  }
                }
              }
            )
          }
        }
      }
    );
  }


  addItem(item: ShoppingcartitemDto) {
    this.shoppingCartItemService.addItem(item).subscribe(
      {
        next: (response) => {
          if (response)
            this.confirmationMessage();
        }
      }
    );
  }

  confirmationMessage() {
    Swal.fire('Creado', 'Añadido', 'success');
  }

  returnStore() {
    this.router.navigate(['']);
  }
  onAddReview() {
    this.newReview.userId = this.user.id;
    this.newReview.productId = this.productId;
    this.newReview.reviewDate = new Date();
    if (this.isEditing) {
      this.newReview.id = this.existingReview.id;
      if (this.existingReview) {
        this.productReviewService.updateProductReview(this.newReview).subscribe(success => {
          if (success) {
            Swal.fire('¡Actualizado!', 'Tu reseña ha sido modificada.', 'success');
            this.newReview = new ProductreviewDto();
            this.isEditing = false;
            this.hasReviewed = true;
            this.loadReviews();
          }
        });
      }
    } else {
      this.productReviewService.addProductReview(this.newReview).subscribe(success => {
        if (success) {
          Swal.fire('¡Gracias!', 'Tu reseña ha sido añadida.', 'success');
          this.newReview = new ProductreviewDto();
          this.hasReviewed = true;
          this.loadReviews();
        }
      });
    }
  }
  startEdit(review: ProductreviewDto) {
    this.newReview = { ...review };
    this.existingReview = review;
    this.isEditing = true;
  }

  onCancelEdit() {
    this.isEditing = false;
  }

}
