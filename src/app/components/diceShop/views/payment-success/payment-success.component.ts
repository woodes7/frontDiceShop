import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { UserDto } from '../../../../model/UserDto';
import { ShoppingcartDto } from '../../../../model/ShoppingcartDto';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {

  load: boolean;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.load = false;
  }

  ngOnInit(): void {
    let user = this.authService.currentUser$;
  }

  getUser() {
    this.authService.currentUser$.subscribe(
      {
        next: (response) => {
          let user: UserDto = new UserDto();
          if (response) {
            user = response;
          }
        }
      });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
