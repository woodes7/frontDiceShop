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

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: ProductDto;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private shoppingCartItemService: ShoppingCartItemService,
    private router: Router
  ) { }
  getUserId(): number {
    let user = sessionStorage.getItem('user');
    console.log(user)
    let userDto: UserDto = JSON.parse(user!);
    console.log(user)
    return userDto != null ? userDto.id : 0;
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
      console.log(product);
    });
  }

  onAddToCart(): void {
    let userId: number = this.getUserId();
    console.log(userId)
    if(userId == 0)
      this.router.navigate(['/pages/login'])
    else
      this.shoppingCartService.getShoppingCartByUserId(userId).subscribe({
        next: (response) => {
          if (response) {
            let item = this.createCartItem(response.id);
            this.addItem(item);
          } else {
            let cart = this.createCart(userId);
            this.addCart(cart);
          }
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
    item.unitPrice = this.product.price!;
    item.active = true;

    return item;
  }

  addCart(cart: ShoppingcartDto){
    this.shoppingCartService.addShoppingCart(cart).subscribe(
      {
        next:(isAdded) => {
          if(isAdded){
            this.shoppingCartService.getShoppingCartByUserId(cart.userId).subscribe(
              {
                next:(response) => {
                  if(response){
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
          if(response)
            this.confirmationMessage();
        }
      }
    );
  }

  confirmationMessage() {
    Swal.fire('Creado', 'Añadido', 'success');
  }

    returnStore(){
    this.router.navigate(['']);
  }


}
