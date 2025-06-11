import { Component, OnInit } from '@angular/core';
import { ShoppingcartitemDto } from '../../../../model/ShoppingcartitemDto';
import { ShoppingCartItemService } from '../../../../service/shopping-cart-item.service';
import { ShoppingcartDto } from '../../../../model/ShoppingcartDto';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { BillingAddressService } from '../../../../service/billing-address.service';
import { BillingaddressDto } from '../../../../model/BillingaddressDto';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { OrderRequest } from '../../../../model/OrderRequest';
import { PaymentService } from '../../../../service/payment.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  items: ShoppingcartitemDto[] = [];
  total = 0;
  cart: ShoppingcartDto | null = null;
  billingAddress: BillingaddressDto;
  stripePromise = loadStripe('pk_test_51RXPGLPr8nqIGbNFarmiiFmDNorXsBlbIRARgpHEXkNL6dfjeDLOwr3P7JH0jK3srvRCINbVaudSbZ5bZ8FWyrfl00VE20ENTb');

  constructor(
    private shoppingCartService: ShoppingCartService,
    private shoppingCartItemService: ShoppingCartItemService,
    private billingAddressService: BillingAddressService,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : 0;
    this.getCart(userId);
    this.getAddress(userId);


  }

  getCart(userId: number) {
    this.shoppingCartService.getShoppingCarts().subscribe(carts => {
      this.cart = carts.find(c => c.userId === userId) || null;

      if (this.cart) {
        this.shoppingCartItemService.getItemsByCartId(this.cart.id, true).subscribe(items => {
          this.items = items;
          this.calculateTotal();
        });
      }
    });
  }

  pay(): void {
    if (this.items.length === 0) {
      console.warn("⚠️ No hay productos para pagar.");
      return;
    }

    if (!this.billingAddress) {
      console.warn("⚠️ No hay dirección de facturación.");
      alert("Debes añadir una dirección de facturación antes de pagar.");
      return;
    }

    const orderRequest: OrderRequest = {
      items: this.items.map(item => ({
        name: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),

      totalAmount: this.total,
      billingAddress: this.billingAddress
    };
    this.paymentService.pay(orderRequest).subscribe(res => {
      window.location.href = res.url;
    });
  }

  getAddress(userId: number) {
    this.billingAddressService.getPrimaryBillingAddressByUser(userId).subscribe(
      {
        next: (respnse) => {
          if (respnse)
            this.billingAddress = respnse
        }
      }
    );
  }

  returnCart() {
    this.router.navigate(['/views/cart']);
  }

  calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }


  editBillingAddress(): void {
    if (this.billingAddress?.id) {
      this.router.navigate(['/views/billingAddress', this.billingAddress.id]);
    }
  }
}
