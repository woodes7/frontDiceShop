import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { UserDto } from '../../../../model/UserDto';
import { ShoppingcartDto } from '../../../../model/ShoppingcartDto';
import { PaymentService } from '../../../../service/payment.service';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {

  load: boolean;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private authService: AuthService
  ) {
    this.load = false;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.currentUser$.subscribe(
      {
        next: (response) => {
          if (response) {
            console.log(response);
            this.paymentService.postPurchase(response.id).subscribe();
          }
        }
      });
  }


  goHome(): void {
    this.router.navigate(['/']);
  }
}
