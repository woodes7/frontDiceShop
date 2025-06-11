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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private shoppingCartItemService: ShoppingCartItemService,
    private router: Router,
    private productReviewService: ProductReviewService,
    private authService: AuthService
  ) { }

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


  ngOnInit(): void {
    console.log(this.isEditing)
    this.getReviewsByProductOfUser();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
console.log(this.isEditing)
      this.loadReviews();
    });
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
    this.productReviewService.getReviewsByProductId(this.productId).subscribe(res => {
      this.reviews = res;
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
          console.log(success)
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

  onCancelEdit(){
    this.isEditing = false;
  }

}
